import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import CardList from '../components/organisms/CardList';
import Layout from '../components/templates/Layout';
import { api, useGetPostArticle } from './api/utility';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import styles from '../styles/organisms/CardList.module.scss';
import PrivateLayout from '../components/templates/PrivateLayout';

const ArticlePage = ({ data, page, numberOfMovies }) => {
  const router = useRouter();
  console.log(numberOfMovies);

  console.log(data);

  const lastPage = Math.ceil(numberOfMovies / 3);

  return (
    <Layout title="article">
      <div className={styles.cardlist}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <CardList data={data} />
          <Stack direction="row" spacing={2}>
            {page === 1 ? (
              ''
            ) : (
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => router.push(`/article?page=${page - 1}`)}
                disabled={page <= 1}
              >
                前のページへ
              </Button>
            )}

            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={() => router.push(`/article?page=${page + 1}`)}
              disabled={page >= lastPage}
            >
              次のページへ
            </Button>
          </Stack>
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

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  const start = +page === 1 ? 1 : (+page - 1) * 2;
  console.log('strt' + start);
  const data = await axios
    .get(api.getArticles + start)
    .then((res) => res.data)
    .catch(() => null);
  return {
    props: {
      data: data,
      page: +page,
      numberOfMovies: 10,
    },
  };
};
