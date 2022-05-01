import { Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Layout from '../../components/templates/Layout';
import CardList from '../../components/organisms/CardList';
import { useRouter } from 'next/router';
import { getPageCount, getPostList } from '../api/articleAPI';
import useSWR from 'swr';
import { TopicTitle } from '../../components/atoms/TopicCard';
import { skillsItems } from '../api/icon';
import topicStyles from '../../styles/atoms/TopicCard.module.scss';
import contentStyles from '../../styles/organisms/CardList.module.scss';

const Topic = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const router = useRouter();

  // Grab our ID parameter
  const { topic } = router.query;
  const { data, error } = useSWR(`/api/public/topics/${topic}?page=${pageIndex}`, getPostList);

  const topics = skillsItems.find((item) => item.iconName === topic);

  const handlePageChange = (e, v) => {
    e.preventDefault();
    setPageIndex(v);
  };
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data);

  return (
    <Layout title="article">
      <Container>
        <div>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <div className={topicStyles.topicArticle}>
              <TopicTitle item={topics} />
            </div>
            <span className={contentStyles.contentSpacing} />
            {data.PostCount === 0 ? (
              <div>
                <div className={contentStyles.contentEmpty}>{topic}の記事は見つかりませんでした</div>
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
export default Topic;
