import mongoose from 'mongoose';
import { userModel } from '../../models/user.model';
// import { User } from '@/app/models/User.js';

export async function POST(req) {
	const body = await req.json();
	mongoose.connect(process.env.MONGO_URL);
	const createdUser = await userModel.create(body);
	console.log(createdUser);
	return Response.json(createdUser);
}
