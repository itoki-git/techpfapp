import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Cards from '../molecules/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '../../styles/organisms/CardList.module.scss';
import { url, useGetPostArticle } from '../../pages/api/utility';

// カードリスト
const CardList = (props) => {
  const { data } = props;

  console.log(data);

  return (
    <Grid container spacing={3} className={styles.cardgrid}>
      {data.map((item, i) => (
        <Grid item xs={12} sm={6} md={6} lg={4} xl={4} className={styles.carditem} key={item.id}>
          <Cards item={item} />
        </Grid>
      ))}
    </Grid>
  );
};
export default CardList;
