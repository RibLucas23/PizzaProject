'use client';
import { SessionProvider } from 'next-auth/react';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext({});
export function cartProductPrice(cartProduct) {
	let price = cartProduct.basePrice;
	if (cartProduct.size) {
		price += cartProduct.size.price;
	}
	if (cartProduct.extras?.length > 0) {
		for (const extra of cartProduct.extras) {
			price += extra.price;
		}
	}
	return price;
}
export default function AppContext({ children }) {
	const [cartProducts, setCartProducts] = useState([]);
	const ls = typeof window !== 'undefined' ? window.localStorage : null;
	useEffect(() => {
		if (ls && ls.getItem('cart')) {
			setCartProducts(JSON.parse(ls.getItem('cart')));
		}
	}, []);
	function saveCartProductsToLocalStorage(cartProducts) {
		if (ls) {
			ls.setItem('cart', JSON.stringify(cartProducts));
		}
	}
	function clearCart() {
		setCartProducts([]);
		saveCartProductsToLocalStorage([]);
	}
	function removeCartProduct(indexToRemove) {
		setCartProducts((prevCartProducts) => {
			const newCartProducts = prevCartProducts.filter(
				(v, index) => index !== indexToRemove,
			);
			saveCartProductsToLocalStorage(newCartProducts);
			return newCartProducts;
		});
		toast.success('Product removed!');
	}
	function addToCart(product, size = null, extras = []) {
		setCartProducts((prevProducts) => {
			const cartProduct = { ...product, size, extras };
			const newProducts = [...prevProducts, cartProduct];
			saveCartProductsToLocalStorage(newProducts);
			return newProducts;
		});
	}
	return (
		<SessionProvider>
			<CartContext.Provider
				value={{
					cartProducts,
					setCartProducts,
					addToCart,
					removeCartProduct,
					clearCart,
					cartProductPrice,
				}}
			>
				{children}
			</CartContext.Provider>
		</SessionProvider>
	);
}
