// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "lib/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import { AddCommentResponse } from "../../../config/type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AddCommentResponse>
) {
  try {
    const { username, avatarUrl, comment, articleId } = JSON.parse(req.body || {});
    const db = await connectDB();
    const commentCollection = await db.collection("comment");
    const date = new Date().getTime();
    await commentCollection.insertOne({ username, avatarUrl, comment, date, articleId });
    res.status(200).json({ success: true, msg: '评论成功' });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
}
