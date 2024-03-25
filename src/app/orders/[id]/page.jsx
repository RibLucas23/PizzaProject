"use client"
import { useContext, useEffect, useState } from "react";
import SectionHeaders from './../../components/layout/SectionHeaders';
import { CartContext, cartProductPrice } from '../../components/AppContext';
import { useParams } from "next/navigation";
import CartProduct from './../../components/menu/CartProduct';
import AddressForm from "../../components/layout/AddressForm";

export default function OrdersPageById() {
   const [order, setOrder] = useState();
   const [loadingOrder, setLoadingOrder] = useState(true);
   const { id } = useParams();
   const { clearCart } = useContext(CartContext)
   useEffect(() => {
      if (typeof window.console !== "undefined") {
         if (window.location.href.includes('clear-cart=1')) {
            clearCart();
         }
      }
      if (id) {
         setLoadingOrder(true);
         fetch('/api/orders?_id=' + id).then(res => {
            res.json().then(orderData => {
               setOrder(orderData);
               setLoadingOrder(false);
            });
         })
      }
   }, []);
   let subtotal = 0;
   if (order?.cartProducts) {
      for (const product of order?.cartProducts) {
         subtotal += cartProductPrice(product);
      }
   }

   return (
      <section className=' max-w-2xl mx-auto text-center mt-8'>
         <SectionHeaders mainHeader={'Your order'} />
         <div className=' my-4'>
            <p>Thanks for your order!</p>
            <p>We will call you when the order will be on the way.</p>
         </div>
         {loadingOrder && (
            <div>Loading order...</div>
         )}
         {order && (
            <div className="grid md:grid-cols-2 md:gap-16">
               <div>
                  {order.cartProducts.map(product => (
                     <CartProduct key={order.cartProducts.indexOf(product)} product={product} />
                  ))}
                  <div className="text-right py-2 text-gray-500">
                     Subtotal:
                     <span className="text-black font-bold inline-block w-8">${subtotal}</span>
                     <br />
                     Delivery:
                     <span className="text-black font-bold inline-block w-8">$5</span>
                     <br />
                     Total:
                     <span className="text-black font-bold inline-block w-8">
                        ${subtotal + 5}
                     </span>
                  </div>
               </div>
               <div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                     <AddressForm
                        disabled={true}
                        addressProp={order}
                     />
                  </div>
               </div>
            </div>
         )}
      </section>
   )
}
