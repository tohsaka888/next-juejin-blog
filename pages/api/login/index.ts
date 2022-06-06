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
    const db = await connectDB();
    const collection = db.collection("AuthCode")
    const userCollection = db.collection("user")
    if (body.t === 0 || !body.t) {
      const emailLogin = await userCollection.findOne({ email: body.username, password: body.password })
      const userLogin = await userCollection.findOne({ username: body.username, password: body.password })
      if (emailLogin || userLogin) {
        const token = jwt.sign(body, 'shhhhh');
        let username = ''
        if (emailLogin) {
          username = emailLogin.username
        }
        if (userLogin) {
          username = userLogin.username
        }
        res.status(200).json({ success: true, token: token, username: username });
      } else {
        res.status(200).json({ success: false, msg: '账号或密码错误', token: '', username: '' });
      }
    } else {

      const authcode = await collection.findOne({ email: body.email })
      const user = await userCollection.findOne({ email: body.email })

      if (authcode.code === body.code) {
        const token = jwt.sign({ email: body.email }, 'shhhhh');
        if (!user) {
          await userCollection.insertOne({ email: body.email, token: token })
        }
        res.send({ success: true, token: token, needRegister: !user, username: !user ? '' : user.username });
      } else {
        res.send({ success: false, msg: '验证码错误', token: '', username: '' })
      }

      setTimeout(() => {
        collection.deleteOne({ email: body.email })
      }, 5 * 60 * 1000)
    }
  } catch (error: any) {
    res.status(404).send({
      success: false, msg: error.message, token: '',
      username: ""
    })
  }
}
