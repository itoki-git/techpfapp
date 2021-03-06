import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import gfm from 'remark-gfm';
import 'zenn-content-css';
import useSWR from 'swr';

import { getArticle, getArticleLike, handleLikeButton } from '../../pages/api/articleAPI';
import { skillsItems } from '../../pages/api/icon';
import { userState } from '../../pages/api/userAPI';
import { url } from '../../pages/api/utility';
import skillStyle from '../../styles/atoms/CardWithIcon.module.scss';
import cardStyle from '../../styles/molecules/Card.module.scss';
import articleStyle from '../../styles/organisms/ArticlePage.module.scss';
import styles from '../../styles/organisms/Preview.module.scss';
import settingStyle from '../../styles/organisms/UserSetting.module.scss';
import ProfileStyle from '../../styles/organisms/UserSetting/Profile.module.scss';
import { CardwithIconArticle } from '../atoms/CardWithIcon';
import { LikeButton } from '../atoms/LikeButton';
import { LinearLoad } from '../atoms/Loading';
import Layout from './Layout';

const SlugTemplate = () => {
  const isLogin = useRecoilValue(userState);
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
      revalidateOnFocus: false,
      refreshInterval: refreshIntervalArticle,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // 再試行は3回までしかできません。
        if (retryCount >= 3) return;

        // 1秒後に再試行します。
        setTimeout(() => revalidate({ retryCount }), 1000);
      },
    }
  );

  // 未ログインの場合、リクエストはしない
  const { data: like, error: likeError } = useSWR(
    article && isLogin ? `/api/private/posts/${slug}` : false,
    getArticleLike,
    {
      revalidateOnFocus: false,
    }
  );

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

  if ((articleError || likeError) && !article) {
    router.replace(url.notpage);
  }
  if (!article) return <LinearLoad />;
  const topic = skillsItems.filter((item) => {
    if (list && list.includes(item.id)) {
      return item;
    }
  });
  const date = article.timestamp.substr(0, article.timestamp.indexOf('T'));

  const handleClick = async (e) => {
    e.preventDefault();
    await handleLikeButton(slug);
    setisLike(!isLike);
  };

  return (
    <Layout>
      <Container>
        <Grid container direction="row" justifyContent="center" alignItems="flex-start">
          <div className={articleStyle.container}>
            <header className={articleStyle.header}>
              <h1 className={articleStyle.title}>{article.title}</h1>
              <div className={articleStyle.meta}>
                <span>{date}に公開</span>
              </div>
            </header>
            <div>
              {list !== null ? (
                <Box className={settingStyle.paper}>
                  <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
                    {topic.map((skill, i) => (
                      <Grid item className={skillStyle.box} key={i}>
                        <CardwithIconArticle skill={skill} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : (
                ''
              )}

              <div className={articleStyle.contentMargin} />
            </div>

            <div>
              <div className={styles.preview}>
                <ReactMarkdown className="znc" plugins={[gfm]} unwrapDisallowed={false}>
                  {article.markdown}
                </ReactMarkdown>

                <Divider variant="middle" className={settingStyle.divider} />
                <div className={ProfileStyle.displayInfo}>
                  <div className={ProfileStyle.left}>
                    <Avatar alt="Remy Sharp" src={article.user.image} sx={{ width: 100, height: 100 }} />
                    <Link href="/[profile.username]" as={`/${article.user.username}`}>
                      <a style={{ marginLeft: '1rem' }}>
                        <h3 className={cardStyle.titlelink}>{article.user.nickname}</h3>
                        <small className={ProfileStyle.jobName}>{article.user.jobname}</small>
                      </a>
                    </Link>
                  </div>
                  <div>{isLogin ? <LikeButton isChecked={isLike} handleLikeButton={handleClick} /> : null}</div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Container>
    </Layout>
  );
};
export default SlugTemplate;
