import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import UserProfileMenu from './UserProfileMenu';
import {useNavigate, useLocation, Link } from "react-router-dom"
import {useState} from 'react'
import { useAuth } from '../Config/AuthContext';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

let pages;


export default function SearchAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate()
  const location = useLocation()
  const {isAuth} = useAuth()

  switch(location.pathname) {
    case "/": 
      if (!isAuth) {
        pages = ["Login"]
      } else {
        pages = ["Logout"]
      }
      break
    case "/Login":
      pages = [""]
      break
    case "/Empty-Trailers":
      pages = ["Logout", "Full-Trailers"]
      break;
    case "/Inbound":
      pages = ["Logout", "Empty-Trailers", "Full-Trailers"]
      break;
    case "/Full-Trailers":
      pages = ["Logout", "Empty-Trailers"]
      break;
    default:
      pages = [""]

  }
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchValue.trim()) {
      navigate('/Search', { state: searchValue, replace: true });
    }
  };
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{display:"flex", justifyContent:"space-between" }}>
           <IconButton 
            size = "large"
            color = "inherit"
            aria-label='home'
            onClick = {()=> navigate('/') }>
             <HomeIcon/> 
            </IconButton>
           <Box sx={{  display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <MenuItem key={page} component = {Link} to = {`/${page}`}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Box>

           <Box sx={{  display: { xs: 'flex', md: 'none' } }}>
            
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box component="form" onSubmit={handleSearch} sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mr: { xs: 2, sm: 0 } }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Search>
          </Box>
           <Box>
             <UserProfileMenu/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}