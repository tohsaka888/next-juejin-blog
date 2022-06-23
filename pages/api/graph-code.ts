
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import svgCaptcha, { CaptchaObj } from "svg-captcha";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CaptchaObj>
) {
  let result: CaptchaObj = null!
  if (Math.random() > 0.5) {
    result = svgCaptcha.create({
      size: 4,
      noise: 3,
      color: true,
      background: '#cc9966',
      width: 100,
      height: 38
    })
  } else {
    result = svgCaptcha.createMathExpr({
      noise: 3,
      color: true,
      background: '#cc9966',
      width: 100,
      height: 38
    })
  }

  res.status(200).json({ ...result });
}