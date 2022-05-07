import React, { useEffect, useState } from 'react';
import { SearchField } from '../molecules/Search';
import Layout from './Layout';
import { TopicListButton } from '../molecules/TopicCardList';
import { skillsItems } from '../../pages/api/icon';
import Container from '@mui/material/Container';
import inputStyle from '../../styles/organisms/UserSetting/Profile.module.scss';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { textStateFamily } from '../state/createStore';
import CardList from '../organisms/CardList';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import contentStyles from '../../styles/organisms/CardList.module.scss';
import { getPageCount, getSearchList } from '../../pages/api/articleAPI';
import useSWR from 'swr';
import { LinearLoad } from '../atoms/Loading';
import { useRecoilValue } from 'recoil';

const SearchResult = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const router = useRouter();
  const { data, error } = useSWR(`api/public/search?q=${router.query.q}&page=${pageIndex}`, getSearchList);

  const handlePageChange = (e, v) => {
    e.preventDefault();
    setPageIndex(v);
  };
  if (error) return <div>failed to load</div>;
  if (!data) return <LinearLoad />;

  return (
    <div>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <span className={contentStyles.contentSpacing} />
        {data.PostCount === 0 ? (
          <div>
            <div className={contentStyles.contentEmpty}>{router.query.q}の記事は見つかりませんでした</div>
          </div>
        ) : (
          <>
            <CardList data={data.PostList} />
            <Stack direction="row" spacing={2}>
              <Container maxWidth="lg">
                <Pagination
                  page={pageIndex}
                  count={getPageCount(data.PostCount)}
                  color="primary"
                  size="large"
                  onChange={handlePageChange}
                  renderItem={(item) => (
                    <PaginationItem
                      page={item.page}
                      components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                      naked
                      {...item}
                    />
                  )}
                />
              </Container>
            </Stack>
          </>
        )}
      </Stack>
    </div>
  );
};

export const SearchTemplate = () => {
  const value = useRecoilValue(textStateFamily('searh'));
  const [isSearchResult, setIsSearchResult] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router.query.q) {
      setIsSearchResult(true);
    }
  }, [router.query.q]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const href = `?q=${value}`;
    setIsSearchResult(true);
    router.push(`/search${href}`, undefined, { shallow: true });
  };
  return (
    <Layout title="search">
      <Container>
        <SearchField handleSubmit={handleSubmit} />
        {isSearchResult ? (
          <SearchResult query={value} />
        ) : (
          <Container maxWidth="md">
            <div className={inputStyle.infoarea}>
              <div className={inputStyle.inputarea}>
                <TopicListButton listItems={skillsItems} />
              </div>
            </div>
          </Container>
        )}
      </Container>
    </Layout>
  );
};
export default SearchTemplate;
