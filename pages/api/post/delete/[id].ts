// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { DeleteResponse } from "../../../../config/type";
import { ObjectId } from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteResponse>
) {
  try {
    const { id } = req.query;
    const db = await connectDB();
    const articleCollection = await db.collection("articles");
    const listCollection = await db.collection("list");
    await articleCollection.deleteOne({ _id: new ObjectId(id as string) });
    await listCollection.deleteOne({ id: new ObjectId(id as string) });
    res.status(200).json({
      success: true,
      msg: "删除成功"
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      msg: error.message
    });
  }
}
