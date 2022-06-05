import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useRecoilState } from 'recoil';

import styles from '../../styles/atoms/CardWithIcon.module.scss';
import { dialogState } from '../state/createStore';

export const CardwithIcon = (props) => {
  return (
    <div className={styles.boxMain}>
      <div className={styles.left}>
        <div className={styles.icon}>{props.skill.icon}</div>
        <div className={styles.iconName}>
          <h6 className={styles.softwareName}>{props.skill.iconName}</h6>
          <small className={styles.softcategory}>{props.skill.softcategory}</small>
        </div>
      </div>
    </div>
  );
};
export const CardwithIconArticle = (props) => {
  return (
    <Link href="/topics/[props.skill.iconName]" as={`/topics/${props.skill.iconName}`}>
      <div className={styles.boxMain}>
        <div className={styles.left}>
          <div className={styles.icon}>{props.skill.icon}</div>
          <div className={styles.iconName}>
            <h6 className={styles.softwareName}>{props.skill.iconName}</h6>
          </div>
        </div>
      </div>
    </Link>
  );
};
export const CardwithIconEdit = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={styles.boxMain}>
      <div className={styles.left}>
        <div className={styles.icon}>{props.skill.icon}</div>
        <div className={styles.iconName}>
          <h6 className={styles.softwareName}>{props.skill.iconName}</h6>
          <small className={styles.softcategory}>{props.skill.softcategory}</small>
        </div>
      </div>
      <div>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          elevation={1}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose} style={{ cursor: 'pointer' }}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose} style={{ cursor: 'pointer' }}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
export const CardWithAddIcon = (props) => {
  const [isOpen, setisOpen] = useRecoilState(dialogState(props.id));
  return (
    <Grid item className={styles.box}>
      <div className={styles.boxMain}>
        <div className={styles.left}>
          <div className={styles.addicon}>
            <IconButton aria-label="add" onClick={() => setisOpen(!isOpen)} style={{ cursor: 'pointer' }}>
              <AddIcon fontSize="small" />
            </IconButton>
          </div>
          <div className={styles.iconName}>
            <h6 className={styles.softwareName}>{props.title}</h6>
            <small className={styles.softcategory}>{props.description}</small>
          </div>
        </div>
      </div>
    </Grid>
  );
};
