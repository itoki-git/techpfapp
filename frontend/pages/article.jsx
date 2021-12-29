import React from 'react';
import CardList from '../components/organisms/CardList';
import PrivateLayout from '../components/templates/PrivateLayout';

const ArticlePage = () => {
  return (
    <PrivateLayout title="article">
      <CardList />
    </PrivateLayout>
  );
};
export default ArticlePage;
