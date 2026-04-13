import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Badge } from '@mui/material';

const NavbarContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#F5F5F5',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '60px',
  paddingLeft: '30px',
  borderRadius: '0px 0px 10px 10px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto',
    padding: '10px',
    gap: '10px',
  },
}));

const IconsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
  },
}));

const IconWrapper = styled('span')({
  paddingRight: '20px',
  cursor: 'pointer',
  textDecoration: 'none',
});

const Encabezado = (props) => (
  <NavbarContainer>
    <div>
      <h1>La Bodega</h1>
    </div>
    <IconsContainer>
      <IconWrapper>
        <MenuIcon className="icon" />
      </IconWrapper>
      <Link to="/main/carrito" style={{ textDecoration: 'none', color: 'inherit' }}>
        <IconWrapper>
          <Badge badgeContent={props.carrito} color="secondary">
            <ShoppingCartIcon className="icon" />
          </Badge>
        </IconWrapper>
      </Link>
      <IconWrapper>
        <ShareIcon className="icon" />
      </IconWrapper>
      <IconWrapper>
        <FavoriteBorderIcon className="icon" />
      </IconWrapper>
      <IconWrapper onClick={() => props.salir()}>
        <ExitToAppIcon className="icon" />
      </IconWrapper>
    </IconsContainer>
  </NavbarContainer>
);
export default Encabezado;
