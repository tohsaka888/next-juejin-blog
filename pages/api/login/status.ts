// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "lib/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import { LoginStatusResponse } from "../../../config/type";
import jwt from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginStatusResponse>
) {
  req.on("upgrade", (request, socket, head) => {
    console.log(request.url);
    console.log(request.headers);
    console.log(request.method);
    console.log(request.httpVersion);
    console.log(request.httpVersionMajor);
  });
  res.on("upgrade", (request, socket, head) => {
    console.log(request.url);
  });
  const body = JSON.parse(req.body || {});
  const data = jwt.verify(body.token, 'shhhhh')
  res.status(200).json({ success: true, msg: '登录成功', data: data });
}
