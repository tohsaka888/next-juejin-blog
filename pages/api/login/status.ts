// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "lib/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import { LoginStatusResponse } from "../../../config/type";
import jwt from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginStatusResponse>
) {
  const body = JSON.parse(req.body || {});
  const data = jwt.verify(body.token, 'shhhhh')
  res.status(200).json({ success: true, msg: '登录成功', data: data });
}
