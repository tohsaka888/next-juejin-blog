// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "lib/connectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { SignResponse } from "../../../config/type";
import moment from "moment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignResponse>
) {
  const { id } = req.query
  const db = await connectDB()
  const signCollection = await db.collection('sign')
  const currentTime = await moment.utc(new Date()).format('YYYY-MM-DD')
  const result1 = await signCollection.updateOne({ userId: id }, { $setOnInsert: { userId: id, experience: 1, date: currentTime } }, { upsert: true })
  const result2 = await signCollection.updateOne({ userId: id } && { date: { $ne: currentTime } }, { $set: { date: currentTime }, $inc: { experience: 1 } })
  if (result1.matchedCount === 1) {
    if (result2.matchedCount === 1) {
      res.status(200).json({ success: true, msg: '签到成功' })
    } else {
      res.status(200).json({ success: false, msg: '今日已签到' })
    }
  } else {
    res.status(200).json({ success: true, msg: '签到成功' })
  }

}
