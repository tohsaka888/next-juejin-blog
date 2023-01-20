import { AddResponse } from 'config/type';
import connectDB from 'lib/connectDB';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler
  (req: NextApiRequest, res: NextApiResponse<AddResponse>) {
  try {
    const body = JSON.parse(req.body || {});
    const coverImage = body.coverImage;
    const title = body.title;
    const content = body.content;
    const tags = body.tags;
    const author = body.author;
    const avatarUrl = "https://pic3.zhimg.com/80/v2-e987c60f8776df32c010265d2b81526e_720w.jpg";
    const date = new Date().getTime();
    const intro = body.intro;
    const views = 0;
    const like = 0;
    const comments = 0;
    const authorId = body.authorId;

    const db = await connectDB();
    const articleCollection = db.collection('articles');
    const result = await articleCollection.insertOne({
      coverImage,
      title,
      content,
      tags,
      author,
      avatarUrl,
      date,
      intro,
      views,
      like,
      comments,
      authorId
    });

    const listCollection = await db.collection('list');
    await listCollection.insertOne({
      coverImage,
      title,
      id: result.insertedId,
      author,
      avatarUrl,
      date,
      intro,
      views,
      like,
      comments,
      tags,
      authorId
    });
    res.status(200).json({
      success: true,
      id: result.insertedId.toString()
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }

}