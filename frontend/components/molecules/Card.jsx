import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';

import styles from '../../styles/molecules/Card.module.scss';

// カード
const Cards = (props) => {
  const { articleID, title, like, timestamp } = props.item;
  const [isBookmark, setisBookmark] = useState(false);
  console.log(props.item);
  return (
    <Paper className={styles.cardroot}>
      <Card className={styles.cardContent}>
        <CardContent>
          <Typography variant="body2" component="span" className={styles.carddate}>
            {timestamp}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" className={styles.cardtitle}>
            <Link href="/article/[articleID]" as={`/article/${articleID}`}>
              <a className={styles.titlelink}> {title}</a>
            </Link>
          </Typography>
          <div className={styles.bottomIcon}>
            <div className={styles.buttonItem}>
              <FavoriteBorderIcon className={styles.nomal} />
              <p className={styles.cardicon}>{like}</p>
            </div>
            <div className={styles.buttonItem}>
              <IconButton onClick={() => setisBookmark(!isBookmark)}>
                <BookmarkAddOutlinedIcon className={`${styles[isBookmark ? 'mark' : 'nomal']}`} />
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </Paper>
  );
};
export default Cards;
