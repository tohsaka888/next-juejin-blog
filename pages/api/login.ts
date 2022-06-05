// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { LoginResponse } from "config/type";
import mailconfig from "lib/mailconfig";

// t=0 密码登录 t=1 验证码登录(数据库无账号自动注册)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  const body = JSON.parse(req.body || {})
  if (body.t === 0 || !body.t) {
    const token = jwt.sign(body, 'shhhhh');
    res.status(200).json({ success: true, token: token });
  } else {
    // const code = String(Math.floor(Math.random() * 1000000)).padEnd(6, '0') //生成6位随机验证码
    // const mailAddress = body.username
    // const mail = {
    //   from: `"tohsaka888"<tohsaka888@qq.com>`,// 发件人
    //   subject: '掘金登录验证码',//邮箱主题
    //   to: mailAddress,//收件人，这里由post请求传递过来
    //   // 邮件内容，用html格式编写
    //   html: `
    //       <p>您好！</p>
    //       <p>您的验证码是：<strong style="color:orangered;">${code}</strong></p>
    //       <p>如果不是您本人操作，请无视此邮件</p>
    //   `
    // };
    // await mailconfig.sendMail(mail)
  }
}
