// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { LoginResponse, MailResponse } from "config/type";
import mailconfig from "lib/mailconfig";
import connectDB from "lib/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MailResponse>
) {
  const body = JSON.parse(req.body || {})
  const db = await connectDB();
  const collection = db.collection("AuthCode")

  const code = String(Math.floor(Math.random() * 1000000)).padEnd(6, '0') //生成6位随机验证码
  const mailAddress = body.email
  const mail = {
    from: `"tohsaka888"<tohsaka888@qq.com>`,// 发件人
    subject: '掘金登录验证码',//邮箱主题
    to: mailAddress,//收件人，这里由post请求传递过来
    // 邮件内容，用html格式编写
    html: `
          <p>您好！</p>
          <p>您的验证码是：<strong style="color:orangered;">${code}</strong></p>
          <p>如果不是您本人操作，请无视此邮件</p>
      `
  };
  const isExist = await collection.findOne({ email: mailAddress })
  if (isExist) {
    await collection.updateOne({ email: mailAddress }, { $set: { code: code } })
  } else {
    await collection.insertOne({ email: mailAddress, code: code })
  }
  await mailconfig.sendMail(mail)
  res.status(200).send({ success: true })
}
