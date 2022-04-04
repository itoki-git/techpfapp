import React, { useState } from 'react';
import CardList from '../components/organisms/CardList';
import Layout from '../components/templates/Layout';
import { getPageCount, getPostList } from './api/articleAPI';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Container from '@mui/material/Container';
import styles from '../styles/organisms/CardList.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
      <div className={styles.cardlist}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
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
    </Layout>
  );
};
export default ArticlePage;

/*
export const getStaticProps = async () => {
  const data = await axios
    .get(api.getArticles + '1')
    .then((res) => res.data)
    .catch(() => null);
  return {
    props: {
      data: data,
    },
  };
};
*/
/*
export const getServerSideProps = async ({ query: { page = 1 } }) => {
  const start = +page === 1 ? 1 : (+page - 1) * 2;
  console.log('strt' + start);
  const data = await axios
    .get(api.getArticles + start)
    .then((res) => res.data)
    .catch(() => null);
  console.log(data);
  return {
    props: {
      data: data,
      page: +page,
      numberOfMovies: 10,
    },
  };
};
*/
