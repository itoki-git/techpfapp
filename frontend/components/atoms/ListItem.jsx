import Button from '@mui/material/Button';

const ListItem = (props) => {
  return (
    <li>
      <Button displayName={props.displayName} />
    </li>
  );
};
export default ListItem;
