import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
// import { authOptions } from "../auth/[...nextauth]/route";
import { authOptions } from '../authOptions';

import { Order } from '../../models/Order.model';

export async function GET(req) {
	mongoose.connect(process.env.MONGO_URL);

	const session = await getServerSession(authOptions);
	const userEmail = session?.user?.email;

	const url = new URL(req.url);
	const _id = url.searchParams.get('_id');
	if (_id) {
		return Response.json(await Order.findById(_id));
	}

	if (userEmail) {
		return Response.json(await Order.find({ userEmail }));
	}
}
