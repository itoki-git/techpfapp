import React, { useState } from 'react';
import { CardList } from '../organisms/CardList';
import Layout from './Layout';
import { getPageCount, getPostList } from '../../pages/api/articleAPI';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import styles from '../../styles/organisms/CardList.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Container from '@mui/material/Container';
import useSWR from 'swr';
import { LinearLoad } from '../atoms/Loading';

const ArticleTemplate = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const query = 'article?page=';
  const { data, error } = useSWR(`api/public/${query}${pageIndex}`, getPostList, {
    revalidateOnFocus: false,
  });

  const handlePageChange = (e, v) => {
    e.preventDefault();
    setPageIndex(v);
  };

  if (error) return <div>failed to load</div>;
  if (!data) {
    return <LinearLoad />;
  }

  return (
    <Layout title="article">
      <Container>
        <div>
          <div className={styles.cardlist}>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <h1>Articles</h1>
              <span className={styles.contentSpacing} />
              {data.PostList.length === 0 ? (
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
        </div>
      </Container>
    </Layout>
  );
};
export default ArticleTemplate;
