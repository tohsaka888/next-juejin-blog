// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { baseUrl } from "config/baseUrl";
import connectDB from "lib/connectDB";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ArticleBriefInfo, AuthorArticleResponse } from "../../../config/type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthorArticleResponse>
) {
  try {
    const query = req.query;
    const authorId = query.authorId;
    const db = await connectDB();
    const listCollection = await db.collection("list");
    const userCollection = await db.collection("user");
    const list = await listCollection.find<ArticleBriefInfo>({ authorId: authorId }).sort({ date: -1 }).toArray();
    const user = await userCollection.findOne<{username: string}>({ _id: new ObjectId(authorId as string) });
    res.status(200).json({ success: true, list: list, author: user?.username || '' });
  } catch (error: any) {
    res.status(500).json({
      success: false, msg: error.message,
      list: [],
      author: ""
    });
  }
}