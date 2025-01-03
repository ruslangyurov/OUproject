import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import { palette } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';



const style = {
  
  width: '150%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  justifyContent: 'center',
  mx: 'auto',
  my: 25,
  color: 'primary.main',
  bgcolor: '#fafafa',
  typography: 'h4',
  fontWeight:400,
  fontFamily: 'monospace',
  

  
};



export default function ListDividers() {

  const navigate = useNavigate()

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {setSelectedIndex(index)};
  
    return (
      <List sx={style} component = 'nav' aria-label="mailbox folders">
        <ListItemButton
          
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          component={Link} to= '/Inbound'>
          <ListItemText disableTypography primary="Inbound" sx={{textAlign:'center'}} />
        </ListItemButton>
        <Divider component="li"/>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          component={Link} to= '/Outbound'>
          <ListItemText disableTypography primary="Outbound" sx={{textAlign: 'center'}} />
        </ListItemButton>
        <Divider component="li" />
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          component={Link} to= '/Parking'>
          <ListItemText disableTypography primary="Parking" sx={{textAlign: 'center'}} />
        </ListItemButton>
      </List>
    );
 
  }
 

