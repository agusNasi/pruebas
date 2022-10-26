import React, { useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useCartContext } from "../context/CartContext";
import { NavLink } from "react-router-dom";

const CartWidget = () => {

	const { totalProducts, cart} = useCartContext();



	return (
		<>
		    <NavLink to="/cart" className="btn btn-outline-dark ms-2"><i className="bi bi-cart3"></i> Carrito <span>({cart.length === 0 ? "0" : totalProducts()})</span></NavLink>
		</>
	);
};

export default CartWidget;

