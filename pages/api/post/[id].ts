// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { ArticleInfo, InfoResponse } from "../../../config/type";
import { ObjectId } from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InfoResponse>
) {
  const { id } = req.query;
  const db = await connectDB();
  const articleCollection = await db.collection<ArticleInfo>("articles");
  const info = await articleCollection.findOne({ _id: new ObjectId(id as string) }) as ArticleInfo;
  res.status(200).json({
    success: true, info
  });
}
