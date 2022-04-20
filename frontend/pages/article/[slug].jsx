import { Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'zenn-content-css';
import styles from '../../styles/organisms/Preview.module.scss';
import articleStyle from '../../styles/organisms/ArticlePage.module.scss';
import settingStyle from '../../styles/organisms/UserSetting.module.scss';
import skillStyle from '../../styles/atoms/CardWithIcon.module.scss';
import ProfileStyle from '../../styles/organisms/UserSetting/Profile.module.scss';
import cardListStyle from '../../styles/molecules/TopicCardList.module.scss';
import { getArticle, getArticleLike, handleLikeButton } from '../api/articleAPI';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { CardwithIconArticle } from '../../components/atoms/CardWithIcon';
import { skillsItems } from '../api/icon';
import { getUserProfile } from '../api/userAPI';
import Layout from '../../components/templates/Layout';
import { LikeButton } from '../../components/atoms/LikeButton';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Page = () => {
  const [refreshIntervalArticle, setRefreshIntervalArticle] = useState(1000);
  const [isLike, setisLike] = useState(false);
  let list = null;
  const router = useRouter();

  // Grab our ID parameter
  const { slug } = router.query;
  const { data: article, error: articleError } = useSWR(
    slug != undefined ? `/api/public/posts/${slug}` : null,
    getArticle,
    {
      refreshInterval: refreshIntervalArticle,
    }
  );
  const { data: profile, error: profileError } = useSWR(
    article ? `/api/public/users/${article.authorID}` : '',
    getUserProfile
  );
  const { data: like, error: likeError } = useSWR(article ? `/api/private/posts/${slug}` : false, getArticleLike);

  useEffect(() => {
    if (article) {
      setRefreshIntervalArticle(0);
    }
    if (like) {
      setisLike(like);
    }
  }, [article, like]);

  if (article && article.topic) {
    list = article.topic.map((item) => item.id);
  }

  if (articleError || profileError || likeError) return <div>failed to load</div>;
  if (!article || !profile) return <div>loading...</div>;
  const topic = skillsItems.filter((item) => {
    if (list && list.includes(item.id)) {
      return item;
    }
  });
  const date = article.timestamp.substr(0, article.timestamp.indexOf('T'));

  const handleClick = async (e) => {
    await handleLikeButton(slug);
    setisLike(!isLike);
  };

  console.log(like);
  return (
    <Layout>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start">
        <div className={articleStyle.container}>
          <header className={articleStyle.header}>
            <h1 className={articleStyle.title}>{article.title}</h1>
            <div className={articleStyle.meta}>
              <span>{date}に公開</span>
            </div>
          </header>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
              <div className={styles.preview}>
                <ReactMarkdown className="znc" plugins={[gfm]} unwrapDisallowed={false}>
                  {article.markdown}
                </ReactMarkdown>

                <Divider variant="middle" className={settingStyle.divider} />
                <div className={ProfileStyle.displayInfo}>
                  <div className={ProfileStyle.left}>
                    <Avatar alt="Remy Sharp" src="/DSC_9314.JPG" sx={{ width: 100, height: 100 }} />
                    <div style={{ marginLeft: '1rem' }}>
                      <h5>{profile.nickname}</h5>
                      <small className={ProfileStyle.jobName}>{profile.jobname}</small>
                    </div>
                  </div>
                  <div>
                    <LikeButton isChecked={isLike} handleLikeButton={handleClick} />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              {list !== null ? (
                <Paper elevation={1} className={settingStyle.paper}>
                  <h5 className={settingStyle.pageTitle}>Topic</h5>
                  <Grid container className={cardListStyle.cardList}>
                    {topic.map((skill, i) => (
                      <Grid item className={skillStyle.box} key={i}>
                        <CardwithIconArticle skill={skill} />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              ) : (
                ''
              )}

              <div className={articleStyle.contentMargin} />
              <Paper elevation={1} className={settingStyle.paper}>
                <div className={ProfileStyle.displayInfo}>
                  <div className={ProfileStyle.left}>
                    <Avatar alt="Remy Sharp" src="/DSC_9314.JPG" sx={{ width: 80, height: 80 }} />
                    <Link href="/user/[profile.username]" as={`/user/${profile.username}`}>
                      <a style={{ marginLeft: '1rem' }}>
                        <h5>{profile.nickname}</h5>
                        <small className={ProfileStyle.jobName}>{profile.jobname}</small>
                      </a>
                    </Link>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Layout>
  );
};
export default Page;
