import React, { useRef } from 'react';
import Stack from '@mui/material/Stack';
import ImageIcon from '@mui/icons-material/Image';
import AddLinkIcon from '@mui/icons-material/AddLink';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Fab from '@mui/material/Fab';
import { Input } from '@mui/material';
import { useRecoilState } from 'recoil';
import { textStateFamily } from '../state/createStore';

const fabColorStyle = {
  color: 'common.black',
  bgcolor: '#fff',
  '&:hover': {
    bgcolor: '#fff',
  },
};
const fabs = [
  {
    color: 'inherit',
    sx: { ...fabColorStyle },
    icon: <AddLinkIcon />,
    label: 'Expand',
    text: '[title](url)',
  },
  {
    color: 'inherit',
    sx: { ...fabColorStyle },
    icon: <QuestionMarkIcon />,
    label: 'Expand',
  },
];

export const SideButton = (props) => {
  const [text, setText] = useRecoilState(textStateFamily(props.id));

  const insertInButton = (inner) => {
    console.log(inner);
    const editorEl = document.getElementById('editEl');
    const sentence = editorEl.value;
    const index = editorEl.selectionStart;
    editorEl.value = sentence.substring(0, index) + inner + sentence.substring(index, sentence.length);
    editorEl.focus();
    const newString = index + inner.length;
    editorEl.setSelectionRange(newString, newString);
    setText(editorEl.value);
  };
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
      <label htmlFor="icon-button-file">
        <Fab sx={fabColorStyle} aria-label="Expand" color="inherit" component="span">
          <Input accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }} />
          <ImageIcon />
        </Fab>
      </label>
      {fabs.map((fab, index) => (
        <Fab sx={fab.sx} aria-label={fab.label} color={fab.color} onClick={() => insertInButton(fab.text)}>
          {fab.icon}
        </Fab>
      ))}
    </Stack>
  );
};
