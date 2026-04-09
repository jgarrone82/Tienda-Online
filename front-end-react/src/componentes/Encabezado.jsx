import React from 'react';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Badge } from '@mui/material';

const Encabezado = (props) => (
  <div className="navbar">
    <div>
      <h1>La Bodega</h1>
    </div>
    <div>
      <span className="espaciado1">
        <MenuIcon className="icon" />
      </span>
      <Link to="/main/carrito" className="espaciado1">
        <Badge badgeContent={props.carrito} color="secondary">
          <ShoppingCartIcon className="icon" />
        </Badge>
      </Link>
      <span className="espaciado1">
        <ShareIcon className="icon" />
      </span>
      <span className="espaciado1">
        <FavoriteBorderIcon className="icon" />
      </span>
      <span className="espaciado1" onClick={() => props.salir()}>
        <ExitToAppIcon className="icon" />
      </span>
    </div>
  </div>
);
export default Encabezado;
