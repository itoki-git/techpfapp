import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Input } from '../atoms/Input';
import Container from '@mui/material/Container';
import { skillsItems } from '../../pages/api/icon';
import inputStyle from '../../styles/organisms/UserSetting/Profile.module.scss';
import { TopicListButton } from './TopicCardList';
import { useRecoilState } from 'recoil';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { textStateFamily } from '../state/createStore';
import CardList from '../organisms/CardList';
import router from 'next/router';
import { getPageCount, getSearchList } from '../../pages/api/utility';
import topicStyles from '../../styles/atoms/TopicCard.module.scss';
import contentStyles from '../../styles/organisms/CardList.module.scss';
import useSWR from 'swr';

export const SearchField = (props) => {
  return (
    <Container maxWidth="md">
      <div className={inputStyle.infoarea}>
        <form className={inputStyle.inputarea} autoComplete="off" onSubmit={props.handleSubmit}>
          <Input
            id="searh"
            stateId="searh"
            component="searchBox"
            type="text"
            placeholder="トピックスを入力..."
            row={1}
          />
        </form>
      </div>
    </Container>
  );
};
