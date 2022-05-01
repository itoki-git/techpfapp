import React from 'react';
import Cards from '../molecules/Card';
import Grid from '@mui/material/Grid';
import styles from '../../styles/organisms/CardList.module.scss';

// カードリスト
const CardList = ({ data }) => {
  const articles = data ? [].concat(data) : [];
  return (
    <Grid container spacing={3} className={styles.cardgrid}>
      {articles.map((item, i) => (
        <Grid xs={12} sm={6} md={6} lg={4} xl={4} className={styles.carditem} key={item.id}>
          <Cards item={item} />
        </Grid>
      ))}
    </Grid>
  );
};
export default CardList;
