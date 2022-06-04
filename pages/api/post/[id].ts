// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ArticleInfo, InfoResponse } from "../../../config/type";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InfoResponse>
) {
  const { id } = req.query;
  const content = await fs.readFileSync("test.mdx", {
    encoding: "utf-8",
  }) || ''
  console.log(content);
  const articleInfo: ArticleInfo = {
    id: +id,
    title: `文章标题${id}--React`,
    tags: ["React", "Next.js"],
    coverImage:
      "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d9b07ecbf6747e38c36318fff6bc843~tplv-k3u1fbpfcp-no-mark:720:720:720:480.awebp?",
    views: +id * 100,
    like: +id * 100,
    comments: +id * 100,
    date: "2020-01-01",
    author: "tohsaka888",
    intro: "123456",
    avatarUrl: "https://avatars.githubusercontent.com/u/58759688?v=4",
    content: content,
  };
  res.send({ success: true, info: articleInfo });
}
