import Link from 'next/link';
import Card from '../molecules/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useRecoilValue } from 'recoil';

import styles from '../../styles/organisms/CardList.module.scss';
import { loginState } from '../state/currentUser';

// カードリスト
const CardList = (props) => {
  const items = [
    {
      title: '# 空の抜けがまったく違う滋賀で楽しむ極上アウトドア',
      to: '#',
    },
    { title: '日本の暑い夏は...　暑さをずらして涼しく楽しむズラ！', to: '#' },
    { title: '# なぜ日本人は「ずらし旅」が苦手なのか', to: '#' },
    {
      title: '# 神社×温泉・サウナでデトックスずらし旅ひなんちゅ流 ずらし旅のつくり方',
      to: '#',
    },
  ];
  const isLogin = useRecoilValue(loginState);
  console.log('article:' + isLogin);
  return (
    <div className={styles.cardlist}>
      <Container>
        <Grid container spacing={3} className={styles.cardgrid}>
          {items.map((item, i) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4} className={styles.carditem} key={item.id}>
              <Link href={`/article/${item.to}`}>
                <a>
                  <Card title={item.title} />
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
export default CardList;
