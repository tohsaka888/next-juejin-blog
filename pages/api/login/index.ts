// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { LoginResponse } from "config/type";
import connectDB from "lib/connectDB";
import { ObjectId } from "mongodb";

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
    if (body.t === 2) {
      const authcode = await collection.findOne<any>({ phone: body.phone })
      const user = await userCollection.findOne<any>({ phone: body.phone })
      if (authcode.code === body.code) {
        let result = null
        if (!user) {
          result = await userCollection.insertOne({ phone: body.phone, token: '' })
        }
        const token = jwt.sign({ username: user.username ? user.username : body.phone, userId: result?.insertedId || user._id }, 'shhhhh');
        await userCollection.updateOne({ phone: body.phone }, { $set: { token: token } })
        res.send({ success: true, token: token, needRegister: !user.username, username: !user.username ? '' : user.username, userId: result?.insertedId.toString() || '' });
      } else {
        res.send({ success: false, msg: '验证码错误', token: '', username: '', userId: '' });
      }

      setTimeout(() => {
        collection.deleteOne({ email: body.email })
      }, 5 * 60 * 1000)
    } else if (body.t === 0 || !body.t) {
      const emailLogin = await userCollection.findOne({ email: body.username, password: body.password })
      const userLogin = await userCollection.findOne({ username: body.username, password: body.password })

      let token = ''
      if (emailLogin || userLogin) {
        let username = ''
        let userId: string | ObjectId = ''
        if (emailLogin) {
          username = emailLogin.username
          userId = emailLogin._id
          token = jwt.sign({ username: emailLogin.username, userId: userId }, 'shhhhh');
          userCollection.updateOne({ _id: new ObjectId(userId) }, { $set: { token: token } })
        }
        if (userLogin) {
          username = userLogin.username
          userId = userLogin._id
          token = jwt.sign({ username: userLogin.username, userId: userId }, 'shhhhh');
          userCollection.updateOne({ _id: new ObjectId(userId) }, { $set: { token: token } })
        }
        res.status(200).json({ success: true, token: token, username: username, userId: userId.toString() });
      } else {
        res.status(200).json({ success: false, msg: '账号或密码错误', token: '', username: '', userId: '' });
      }
    } else {

      const authcode = await collection.findOne<any>({ email: body.email })
      const user = await userCollection.findOne<any>({ email: body.email })

      if (authcode.code === body.code) {
        let result = null
        if (!user) {
          result = await userCollection.insertOne({ email: body.email, token: '' })
        }
        const token = jwt.sign({ username: user.username ? user.username : body.email, userId: result?.insertedId || user._id }, 'shhhhh');
        await userCollection.updateOne({ email: body.email }, { $set: { token: token } })
        res.send({ success: true, token: token, needRegister: !user.username, username: !user.username ? '' : user.username, userId: result?.insertedId.toString() || '' });
      } else {
        res.send({ success: false, msg: '验证码错误', token: '', username: '', userId: '' });
      }

      setTimeout(() => {
        collection.deleteOne({ email: body.email })
      }, 5 * 60 * 1000)
    }
  } catch (error: any) {
    res.status(500).send({
      success: false, msg: error.message, token: '',
      username: "",
      userId: ""
    })
  }
}
