// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { CommentList, CommentResponse } from "../../../config/type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentResponse>
) {
  try {
    const { articleId } = JSON.parse(req.body || {});
    const db = await connectDB();
    const commentCollection = await db.collection<CommentList>("comment");
    const list = await commentCollection.find({ articleId }).sort({ date: -1 }).toArray();
    res.status(200).json({ success: true, msg: '评论成功', list });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message, list: [] });
  }
}
