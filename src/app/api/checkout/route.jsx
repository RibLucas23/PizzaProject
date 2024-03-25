import { mongoose } from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from './../auth/[...nextauth]/route';
import { Order } from '../../models/Order.model';
export async function POST(req) {
   mongoose.connect(process.env.MONGO_URL)
   const { cartProducts, address } = await req.json()
   const session = await getServerSession(authOptions)
   const userEmail = session?.user?.email

   const orderDoc = await Order.create({
      userEmail,
      ...address,
      cartProducts,
      paid: false
   })
   const url = `/orders/${orderDoc._id}?clear-cart=1`
   return Response.json(url)
}