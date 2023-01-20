// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { ArticleBriefInfo, ListResponse } from "../../config/type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListResponse>
) {
  const body = JSON.parse(req.body || {});
  const page: number = body.page - 1;
  const limit: number = body.limit;
  const db = await connectDB();
  const listCollection = await db.collection<ArticleBriefInfo>("list");
  const list = await listCollection.find({}).sort({ date: -1 }).skip(page * limit).limit(limit).toArray();
  res.status(200).json({ success: true, list: list });
}
