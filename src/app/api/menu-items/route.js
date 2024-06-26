import mongoose from "mongoose"
import { MenuItem } from "../../models/MenuItems.model"
import { isAdmin } from "../../components/hooks/IsAdmin"

export async function POST(req) {
   mongoose.connect(process.env.MONGO_URL)
   const data = await req.json()
   if (await isAdmin()) {
      const MenuItemDoc = await MenuItem.create(data)
      return Response.json(MenuItemDoc)
   } else {
      return Response.json([])
   }
}
export async function GET() {
   mongoose.connect(process.env.MONGO_URL)
   return Response.json(
      await MenuItem.find().lean()
   )
}

export async function PUT(req) {
   mongoose.connect(process.env.MONGO_URL)
   if (await isAdmin()) {
      const { _id, ...data } = await req.json()
      const MenuItemDoc = await MenuItem.findByIdAndUpdate(_id, data)
   }
   return Response.json(true)
}
export async function DELETE(req) {
   mongoose.connect(process.env.MONGO_URL)
   console.log("url")
   const url = new URL(req.url)
   const _id = url.searchParams.get('_id')
   if (await isAdmin()) {
      await MenuItem.deleteOne({ _id })
      return Response.json(true)
   }
}