import { getServerSession } from "next-auth"
// import { authOptions } from './../../api/auth/[...nextauth]/route';
import { authOptions } from "../../api/authOptions";
import { userModel } from "../../models/user.model";

export async function isAdmin() {
   const session = await getServerSession(authOptions)
   const userEmail = session?.user?.email
   if (!userEmail) {
      return false
   }
   const userInfo = await userModel.findOne({ email: userEmail })
   if (!userInfo) {
      return false
   }
   return userInfo.admin
}