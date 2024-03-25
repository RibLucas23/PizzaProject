import mongoose from "mongoose";
import { userModel } from "../../models/user.model";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET() {
   mongoose.connect(process.env.MONGO_URL)
   if (await isAdmin()) {
      const user = await userModel.find()
      return Response.json(user)
   } else {
      return Response.json([])
   }
}