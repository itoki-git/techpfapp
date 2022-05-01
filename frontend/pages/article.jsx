import React, { useState } from 'react';
import CardList from '../components/organisms/CardList';
import Layout from '../components/templates/Layout';
import { getPageCount, getPostList } from './api/articleAPI';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import styles from '../styles/organisms/CardList.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import settingStyle from '../styles/organisms/UserSetting.module.scss';
import Container from '@mui/material/Container';
import useSWR from 'swr';

const ArticlePage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const query = 'article?page=';
  const { data, error } = useSWR(`api/public/${query}${pageIndex}`, getPostList);

  const handlePageChange = (e, v) => {
    e.preventDefault();
    setPageIndex(v);
  };
  console.log(data);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout title="article">
      <Container>
        <div className={styles.cardlist}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <h1>Articles</h1>
            <span className={styles.contentSpacing} />
            {data.PostCount === 0 ? (
              <div>
                <div className={styles.contentEmpty}>記事が見つかりませでした</div>
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
                          href={`/articles/${item.page === 0 ? '' : `?page=${item.page}`}`}
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
export default ArticlePage;
