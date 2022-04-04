import { Grid, Paper } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'zenn-content-css';
import styles from '../../styles/organisms/Preview.module.scss';
import articleStyle from '../../styles/organisms/ArticlePage.module.scss';
import settingStyle from '../../styles/organisms/UserSetting.module.scss';
import skillStyle from '../../styles/atoms/CardWithIcon.module.scss';
import cardListStyle from '../../styles/molecules/TopicCardList.module.scss';
import { getArticle } from '../api/articleAPI';
import { CardwithIconArticle } from '../../components/atoms/CardWithIcon';
import { skillsItems } from '../api/icon';
import Layout from '../../components/templates/Layout';

const User = ({ post }) => {
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
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Layout>
  );
};
export default User;

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
  return {
    props: {
      post,
    },
  };
};
