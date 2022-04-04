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
import { getArticle } from '../api/articleAPI';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { CardwithIconArticle } from '../../components/atoms/CardWithIcon';
import { skillsItems } from '../api/icon';
import { getUserProfile } from '../api/userAPI';
import Layout from '../../components/templates/Layout';

const Page = ({ article, profile, cookies }) => {
  const list = article.topic.map((item) => item.id);
  const data = article.timestamp.substr(0, article.timestamp.indexOf('T'));
  const topic = skillsItems.filter((item) => {
    if (list && list.includes(item.id)) {
      return item;
    }
  });

  return (
    <Layout>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start">
        <div className={articleStyle.container}>
          <header className={articleStyle.header}>
            <h1 className={articleStyle.title}>{article.title}</h1>
            <div className={articleStyle.meta}>
              <span>{data}に公開</span>
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
export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const { slug } = context.query;
  const article = await getArticle(slug);
  const profile = await getUserProfile(article.authorID);

  return {
    props: {
      article,
      profile,
      cookies,
    },
  };
};
*/

export const getStaticProps = async ({ params }) => {
  const slug = params.slug;
  const article = await getArticle(slug);
  const profile = await getUserProfile(article.authorID);

  return {
    props: {
      slug,
      article,
      profile,
    },
    revalidate: 3,
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
