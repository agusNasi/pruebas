import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { ItemCart } from "./ItemCart";
import '../assets/css/Cart.css'
import { FormBuy } from './FormBuy';

export const Cart = () => {
	const { cart, totalPrice } = useCartContext();


	if (cart.length === 0) {
		return (
			<>
				<div className="container-cart-vacio">
					<p>No hay elementos en el carrito</p>
					<Link className="btn btn-dark" to="/">Hacer compras</Link>
				</div>
			</>
		);
	}

	return (
		<>
			<h2 className="cart-title">Carrito</h2>
			{cart.map((product) => (
				<ItemCart key={product.id} product={product} />
			))}
			<p className='totalPriceCart'>total: ${totalPrice()}</p>
			<hr className='hr' />
			<div className='container-btnBuy'>
				<FormBuy />
			</div>
		</>
	);
};