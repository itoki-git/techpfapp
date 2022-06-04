import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';

import styles from '../../styles/molecules/Card.module.scss';
import profileStyle from '../../styles/organisms/UserSetting/Profile.module.scss';

// カード
export const Cards = (props) => {
  const { articleID, title, like, timestamp, user } = props.item;
  const date = timestamp.substr(0, timestamp.indexOf('T'));
  return (
    <Paper elevation={0} className={styles.cardroot}>
      <Card className={styles.cardContent}>
        <CardContent>
          <Typography variant="body2" component="span" className={styles.carddate}>
            {date}に公開
          </Typography>
          <Typography gutterBottom variant="h5" component="div" className={styles.cardtitle}>
            <Link href="/article/[articleID]" as={`/article/${articleID}`}>
              <a className={styles.titlelink}> {title}</a>
            </Link>
          </Typography>
          <div className={styles.bottomIcon}>
            <Link className={profileStyle.left} href="/[user.username]" as={`/${user.username}`}>
              <a className={styles.buttonItem}>
                <Avatar alt="Remy Sharp" src={user.image} sx={{ width: 30, height: 30 }} />
                <p className={styles.cardname}>{user.nickname}</p>
              </a>
            </Link>

            <div className={styles.buttonItem}>
              <FavoriteBorderIcon className={styles.nomal} />
              <p className={styles.cardicon}>{like}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Paper>
  );
};

export const EditCards = (props) => {
  const { articleID, title, like, timestamp, user } = props.item;
  const date = timestamp.substr(0, timestamp.indexOf('T'));
  return (
    <Paper elevation={0} className={styles.cardroot}>
      <Card className={styles.cardContent}>
        <CardContent>
          <Typography variant="body2" component="span" className={styles.carddate}>
            {date}に公開
          </Typography>
          <Typography gutterBottom variant="h5" component="div" className={styles.cardtitle}>
            <Link href="/article/[articleID]" as={`/article/${articleID}`}>
              <a className={styles.titlelink}> {title}</a>
            </Link>
          </Typography>
          <div className={styles.bottomIcon}>
            <Link className={profileStyle.left} href="/[user.username]" as={`/${user.username}`}>
              <a className={styles.buttonItem}>
                <Avatar alt="Remy Sharp" src={user.image} sx={{ width: 30, height: 30 }} />
                <p className={styles.cardname}>{user.nickname}</p>
              </a>
            </Link>

            <div className={styles.buttonItem}>
              <FavoriteBorderIcon className={styles.nomal} />
              <p className={styles.cardicon}>{like}</p>
              <IconButton onClick={() => props.onClickDelete(articleID)}>
                <DeleteIcon sx={{ color: red[600] }} />
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </Paper>
  );
};
