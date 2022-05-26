import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Layout from './Layout';
import CardList from '../organisms/CardList';
import { useRouter } from 'next/router';
import { getPageCount, getPostList } from '../../pages/api/articleAPI';
import useSWR from 'swr';
import { TopicTitle } from '../atoms/TopicCard';
import { skillsItems } from '../../pages/api/icon';
import topicStyles from '../../styles/atoms/TopicCard.module.scss';
import contentStyles from '../../styles/organisms/CardList.module.scss';
import { LinearLoad } from '../atoms/Loading';
import { url } from '../../pages/api/utility';

const TopicTemplate = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const router = useRouter();

  // Grab our ID parameter
  const { topic } = router.query;
  const { data, error } = useSWR(`/api/public/topics/${topic}?page=${pageIndex}`, getPostList, {
    revalidateOnFocus: false,
  });

  const topics = skillsItems.find((item) => item.iconName === topic);

  const handlePageChange = (e, v) => {
    e.preventDefault();
    setPageIndex(v);
  };
  if (error) {
    router.replace(url.notpage);
  }
  if (!data) return <LinearLoad />;

  return (
    <Layout title="article">
      <Container>
        <div>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <div className={topicStyles.topicArticle}>
              <TopicTitle item={topics} />
            </div>
            <span className={contentStyles.contentSpacing} />
            {data.PostList.length === 0 ? (
              <div>
                <div className={contentStyles.contentEmpty}>{topic}の記事は見つかりませんでした</div>
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
      </Container>
    </Layout>
  );
};
export default TopicTemplate;
