import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
// import { authOptions } from '../auth/[...nextauth]/route'
import { authOptions } from '../authOptions';

import { userModel } from '../../models/user.model';

export async function PUT(req) {
	mongoose.connect(process.env.MONGO_URL);
	const data = await req.json();
	const session = await getServerSession(authOptions);
	const { _id } = data;
	let filter = {};
	if (_id) {
		filter = { _id };
	} else {
		const email = session.user.email;
		filter = { email };
	}
	await userModel.updateOne(filter, data);

	return Response.json(true);
}

export async function GET() {
	mongoose.connect(process.env.MONGO_URL);
	const session = await getServerSession(authOptions);
	const email = session?.user?.email;
	if (!email) {
		return Response.json({});
	}
	return Response.json(await userModel.findOne({ email }));
}
