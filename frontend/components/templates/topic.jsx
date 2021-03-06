import React, { useEffect, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { getPageCount, getPostList } from '../../pages/api/articleAPI';
import { skillsItems } from '../../pages/api/icon';
import { url } from '../../pages/api/utility';
import topicStyles from '../../styles/atoms/TopicCard.module.scss';
import contentStyles from '../../styles/organisms/CardList.module.scss';
import { LinearLoad } from '../atoms/Loading';
import { TopicTitle } from '../atoms/TopicCard';
import { CardList } from '../organisms/CardList';
import Layout from './Layout';

const TopicTemplate = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isTopic, setisTopic] = useState(false);
  const { query, isReady } = useRouter();
  const router = useRouter();
  const { topic } = query;

  useEffect(() => {
    if (isReady) {
      setLoading(true);
      setisTopic(skillsItems.some((item) => item.iconName === topic));
    }
  }, [isReady, topic]);

  // Grab our ID parameter

  const { data, error } = useSWR(`/api/public/topics/${topic}?page=${pageIndex}`, getPostList, {
    revalidateOnFocus: false,
  });

  const topics = skillsItems.find((item) => item.iconName === topic);

  const handlePageChange = (e, v) => {
    e.preventDefault();
    setPageIndex(v);
  };
  if (!data || !loading) return <LinearLoad />;
  if (error || !isTopic) {
    router.replace(url.notpage);
  }

  return (
    <Layout title="article">
      <Container>
        <div>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <div className={topicStyles.topicArticle}>
              <TopicTitle item={topics} />
            </div>
            <span className={contentStyles.contentSpacing} />
            {data.PostList.length === 0 ? (
              <div>
                <div className={contentStyles.contentEmpty}>{topic}??????????????????????????????????????????</div>
              </div>
            ) : (
              <>
                <CardList data={data.PostList} />
                <Stack direction="row" spacing={2}>
                  <Container maxWidth="lg">
                    <Pagination
                      page={pageIndex}
                      count={getPageCount(data.PostCount)}
                      color="primary"
                      size="large"
                      onChange={handlePageChange}
                      renderItem={(item) => (
                        <PaginationItem
                          page={item.page}
                          components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                          naked
                          {...item}
                        />
                      )}
                    />
                  </Container>
                </Stack>
              </>
            )}
          </Stack>
        </div>
      </Container>
    </Layout>
  );
};
export default TopicTemplate;
