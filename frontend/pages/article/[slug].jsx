import { Grid, Paper } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'zenn-content-css';
import styles from '../../styles/organisms/Preview.module.scss';
import articleStyle from '../../styles/organisms/ArticlePage.module.scss';
import settingStyle from '../../styles/organisms/UserSetting.module.scss';
import skillStyle from '../../styles/atoms/CardWithIcon.module.scss';
import ProfileStyle from '../../styles/organisms/UserSetting/Profile.module.scss';
import cardListStyle from '../../styles/molecules/TopicCardList.module.scss';
import { getArticle, getArticleList } from '../api/utility';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import PrivateLayout from '../../components/templates/PrivateLayout';
import { CardwithIconArticle } from '../../components/atoms/CardWithIcon';
import { skillsItems } from '../api/icon';
import Layout from '../../components/templates/Layout';
import useUser, { getServerUser, getUser, getUserProfile, useRequireLogin } from '../api/userAPI';

const Page = ({ post, profile }) => {
  const topic = skillsItems.filter((item) => {
    if (post.topic && post.topic.includes(item.id)) {
      return item;
    }
  });
  return (
    <Layout title="article">
      <Grid container direction="row" justifyContent="center" alignItems="flex-start">
        <div className={articleStyle.container}>
          <header className={articleStyle.header}>
            <h1 className={articleStyle.title}>{post.title}</h1>
            <div className={articleStyle.meta}>
              <span>{post.timestamp}に公開</span>
            </div>
          </header>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
              <div className={styles.preview}>
                <ReactMarkdown className="znc" plugins={[gfm]} unwrapDisallowed={false}>
                  {post.markdown}
                </ReactMarkdown>
                <Divider variant="middle" className={settingStyle.divider} />
                <div className={ProfileStyle.displayInfo}>
                  <div className={ProfileStyle.left}>
                    <Avatar alt="Remy Sharp" src="/DSC_9314.JPG" sx={{ width: 100, height: 100 }} />
                    <div style={{ marginLeft: '1rem' }}>
                      <h5>{profile.nickname}</h5>
                      <small className={ProfileStyle.jobName}>{profile.jobName}</small>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
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
              <div className={articleStyle.contentMargin} />
              <Paper elevation={1} className={settingStyle.paper}>
                <div className={ProfileStyle.displayInfo}>
                  <div className={ProfileStyle.left}>
                    <Avatar alt="Remy Sharp" src="/DSC_9314.JPG" sx={{ width: 80, height: 80 }} />
                    <div style={{ marginLeft: '1rem' }}>
                      <h5>{profile.nickname}</h5>
                      <small className={ProfileStyle.jobName}>{profile.jobName}</small>
                    </div>
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

/*
export const getStaticPaths = async () => {
  const article = await getArticleList(1);
  //const paths = article.map((item) => item.articleID);
  const paths = article.map((item) => ({
    params: {
      slug: item.articleID,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  console.log(`Building slug: ${slug}`);
  const post = await getArticle(slug);
  return {
    props: {
      post,
    },
  };
};
*/

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  const post = await getArticle(slug);
  console.log('AAAA');
  const profile = await getUserProfile(post.authorID);

  return {
    props: {
      post,
      profile,
    },
  };
};
