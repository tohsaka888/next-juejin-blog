// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { RegisterResponse } from "../../config/type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>
) {
  const body = JSON.parse(req.body || {});
  const db = await connectDB();
  const collection = db.collection("user");
  if (body.token) {
    await collection.updateOne({ token: body.token }, { $set: { username: body.username, password: body.password } })
  } else {
    await collection.updateOne({ phone: body.phone }, { $set: { username: body.username, password: body.password } })
  }
  res.status(200).json({ success: true, msg: '注册成功' });
}
