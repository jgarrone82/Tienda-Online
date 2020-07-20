import React from 'react';
import { Link } from 'react-router-dom'

import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Badge } from '@material-ui/core';


const Encabezado = (props) =>  (
        <div className="navbar">
            <div>
                <h1>La Bodega</h1>
            </div>
            <div>  
                <span className="espaciado1"><MenuIcon className="icon"/></span>      
                <Link to="/main/carrito" className="espaciado1"><Badge badgeContent={props.carrito} color="secondary"><ShoppingCartIcon className="icon"/></Badge></Link>
                <span className="espaciado1"><ShareIcon className="icon"/></span>
                <span className="espaciado1"><FavoriteBorderIcon className="icon"/></span>
                <span className="espaciado1" onClick={() => props.salir()}><ExitToAppIcon className="icon"/></span>
            </div>
        </div>
    )
export default Encabezado;