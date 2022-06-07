// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "lib/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import { InfoResponse } from "../../../config/type";
import { ObjectId } from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InfoResponse>
) {
  const { id } = req.query;
  const db = await connectDB();
  const articleCollection = await db.collection("articles");
  const info = await articleCollection.findOne({ _id: new ObjectId(id as string) });
  res.status(200).json({
    success: true, info
  });
}
