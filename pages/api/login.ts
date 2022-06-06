// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { LoginResponse } from "config/type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  const body = JSON.parse(req.body || {})
  const token = jwt.sign(body, 'shhhhh');
  res.status(200).json({ success: true, token: token });
}
