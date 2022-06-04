import React from 'react';
import { Input } from '../atoms/Input';
import Container from '@mui/material/Container';
import inputStyle from '../../styles/organisms/UserSetting/Profile.module.scss';

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
