import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { ItemCart } from "./ItemCart";
import '../assets/css/Cart.css'
import { FormBuy } from './FormBuy';

export const Cart = () => {
	const { cart, totalPrice, emptyCart } = useCartContext();
	const [estadoPadre, setEstadoPadre] = useState();

	const levantarEstado = (estadoHijo) => {
		setEstadoPadre(estadoHijo)
	}

	const EstadoPadreTrue = () => {

		const SiItems = () => {
			return (
				<>
					<h2 className="cart-title">Carrito</h2>
					{cart.map((product) => (
						<ItemCart key={product.id} product={product} />
					))}
					<p className='totalPriceCart'>total: ${totalPrice()}</p>
					<hr className='hr' />
					<FormBuy levantarEstado={levantarEstado} />
				</>
			);
		}

		const NoItems = () => {
			return (
				<>
					<div className="container__noItems">
						<h2 className="title__noItems">No hay elementos en el carrito</h2>
						<Link to="/productos" className="btn btn-dark">Ir a la tienda</Link>
					</div>
				</>
			);
		}



		return (
			<>
				{cart.length === 0 ? <NoItems /> : <SiItems />}

			</>
		);
	}

	const Comprado = () => {


		emptyCart();
		return (
			<>
				<div className="container__comprado">
					<h2 className="title__comprado">Gracias por su compra!</h2>
					<Link to="/" className="btn btn-dark">Volver al inicio</Link>
				</div>
			</>
		);
	}


	return (
		<>
			{estadoPadre ? <Comprado /> : <EstadoPadreTrue />}

		</>
	);
};