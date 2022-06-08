// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "lib/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ListResponse } from "../../../config/type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListResponse>
) {
  const body = JSON.parse(req.body || {});
  const tags = req.query.tag;
  const page: number = body.page - 1;
  const limit: number = body.limit;
  const db = await connectDB();
  const listCollection = await db.collection("list");
  const list = await listCollection.find(tags === '首页' ? {} : { tags }).sort({ date: -1 }).skip(page * limit).limit(limit).toArray();
  res.status(200).json({ success: true, list: list });
}
