import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'


const style = {
  
  width: '150%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  justifyContent: 'center',
  mx: 'auto',
  my: 30

  
};

export default function ListDividers() {

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {setSelectedIndex(index)};
  return (
    <List sx={style} component = 'nav' aria-label="mailbox folders">
      <ListItemButton
        
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
        component={Link} to= '/Inbound'>
        <ListItemText primary="Inbound" />
      </ListItemButton>
      
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Drafts" />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Trash" />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>
  );
}
