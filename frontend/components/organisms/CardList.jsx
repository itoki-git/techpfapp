import React from 'react';
import Link from 'next/link';
import Cards from '../molecules/Card';
import Grid from '@mui/material/Grid';
import { useRecoilValue } from 'recoil';

import styles from '../../styles/organisms/CardList.module.scss';
import { loginState } from '../state/currentUser';

// カードリスト
const CardList = (props) => {
  const items = [
    {
      title: '空の抜けがまったく違う滋賀で楽しむ極上アウトドア',
      to: '#',
      createDay: '2021/01/01',
    },
    { title: '日本の暑い夏は...　暑さをずらして涼しく楽しむズラ！', to: '#', createDay: '2021/01/01' },
    { title: 'なぜ日本人は「ずらし旅」が苦手なのか', to: '#', createDay: '2021/01/01' },
    {
      title: '神社×温泉・サウナでデトックスずらし旅ひなんちゅ流 ずらし旅のつくり方',
      to: '#',
      createDay: '2021/01/01',
    },
    {
      title: '神社×温泉・サウナでデトックスずらし旅ひなんちゅ流 ずらし旅のつくり方',
      to: '#',
      createDay: '2021/01/01',
    },
    {
      title: '神社×温泉・サウナでデトックスずらし旅ひなんちゅ流 ずらし旅のつくり方',
      to: '#',
      createDay: '2021/01/01',
    },
    {
      title: '神社×温泉・サウナでデトックスずらし旅ひなんちゅ流 ずらし旅のつくり方',
      to: '#',
      createDay: '2021/01/01',
    },
    {
      title: '神社×温泉・サウナでデトックスずらし旅ひなんちゅ流 ずらし旅のつくり方',
      to: '#',
      createDay: '2021/01/01',
    },
    {
      title: '神社×温泉・サウナでデトックスずらし旅ひなんちゅ流 ずらし旅のつくり方',
      to: '#',
      createDay: '2021/01/01',
    },
    {
      title: '神社×温泉・サウナでデトックスずらし旅ひなんちゅ流 ずらし旅のつくり方',
      to: '#',
      createDay: '2021/01/01',
    },
  ];
  const isLogin = useRecoilValue(loginState);
  console.log('article:' + isLogin);
  return (
    <div className={styles.cardlist}>
      <Grid container spacing={3} className={styles.cardgrid}>
        {items.map((item, i) => (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4} className={styles.carditem} key={item.id}>
            <Link href={`/article/${item.to}`}>
              <Cards item={item} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default CardList;
