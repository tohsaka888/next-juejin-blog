// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { LoginResponse } from "config/type";
import connectDB from "lib/connectDb";

// t=0 密码登录 t=1 验证码登录(数据库无账号自动注册)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  try {
    const body = JSON.parse(req.body || {})
    if (body.t === 0 || !body.t) {
      const token = jwt.sign(body, 'shhhhh');
      res.status(200).json({ success: true, token: token });
    } else {
      const db = await connectDB();
      const collection = db.collection("AuthCode")
      const userCollection = db.collection("user")
      const authcode = await collection.findOne({ email: body.email })
      const user = await userCollection.findOne({ email: body.email })

      if (authcode.code === body.code) {
        const token = jwt.sign({ email: body.email }, 'shhhhh');
        res.send({ success: true, token: token, needRegister: !user });
      } else {
        res.send({ success: false, msg: '验证码错误', token: '' })
      }

      setTimeout(() => {
        collection.deleteOne({ email: body.email })
      }, 5 * 60 * 1000)
    }
  } catch (error: any) {
    res.status(404).send({ success: false, msg: error.message, token: '' })
  }
}
