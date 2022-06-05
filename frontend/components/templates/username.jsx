import React, { useState } from 'react';

import 'zenn-content-css';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { getArticle } from '../../pages/api/articleAPI';
import { skillsItems } from '../../pages/api/icon';
import { getUserProfile } from '../../pages/api/userAPI';
import { url } from '../../pages/api/utility';
import styles from '../../styles/organisms/CardList.module.scss';
import settingStyle from '../../styles/organisms/UserSetting.module.scss';
import style from '../../styles/organisms/UserSetting/Profile.module.scss';
import { LinearLoad } from '../atoms/Loading';
import { TopicCardList } from '../molecules/TopicCardList';
import { CardList } from '../organisms/CardList';
import Layout from './Layout';

const UserNameTemplate = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { username } = router.query;

  const { data: profile, error: err } = useSWR(
    username != undefined ? `/api/public/users/${username}` : '',
    getUserProfile,
    {
      revalidateOnFocus: false,
    }
  );

  const { data: article, error: articleError } = useSWR(
    profile != undefined ? `/api/public/users/posts/${profile.userID}` : null,
    getArticle,
    {
      revalidateOnFocus: false,
    }
  );

  if (err || articleError) {
    router.replace(url.notpage);
  }
  if (!profile) return <LinearLoad />;

  const topic = skillsItems.filter((item) => {
    if (profile.skill && profile.skill.includes(item.id)) {
      return item;
    }
  });

  const changeTab = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <div>
            <h5 className={settingStyle.pageTitle}>Skills</h5>
            {topic.length === 0 ? (
              <div className={styles.contentEmpty}>スキルが登録されていません</div>
            ) : (
              <TopicCardList listItems={topic} />
            )}
          </div>
        );
      case 1:
        return (
          <div className={styles.cardlist}>
            <h5 className={settingStyle.pageTitle}>Articles</h5>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <div></div>
              {article.PostList.length === 0 ? (
                <div className={styles.contentEmpty}>記事を作成していません</div>
              ) : (
                <CardList data={article.PostList} />
              )}
            </Stack>
          </div>
        );
    }
  };

  return (
    <Layout title="article">
      <Container maxWidth="md">
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <Avatar
            alt="Remy Sharp"
            src={profile.image}
            sx={{
              width: { xs: 110, sm: 150, md: 150, lg: 150, xl: 150 },
              height: { xs: 110, sm: 150, md: 150, lg: 150, xl: 150 },
            }}
          />
          <h1 className={style.userName}>{profile.nickname}</h1>
          <h3 className={style.jobName}>{profile.jobname}</h3>
          <p>{profile.bio}</p>
        </Stack>
        <Tabs
          style={{ marginTop: '2rem' }}
          value={selectedIndex}
          onChange={(e, value) => setSelectedIndex(value)}
          centered
        >
          <Tab label="Skills" />
          <Tab label="Articles" />
        </Tabs>

        {changeTab()}
      </Container>
    </Layout>
  );
};
export default UserNameTemplate;
