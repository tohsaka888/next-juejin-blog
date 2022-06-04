// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ArticleBriefInfo, ListResponse } from "../../config/type";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListResponse>
) {
  const list: ArticleBriefInfo[] = [];
  for (let i = 0; i < 100; i++) {
    list.push({
      id: i,
      title: `文章标题${i}--React`,
      tags: ["React", "Next.js"],
      coverImage:
        "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92273c48d6e04babadae9969efa6d4b9~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp??",
      views: i * 100,
      like: i * 100,
      comments: i * 100,
      date: "2020-01-01",
      author: "tohsaka888",
      intro:
        "四处运行，即跨端技术的真谛。android、ios、pc、小程序，甚至智能手表、车载电视等场景下，需要应用到跨端技术实在是太多了。此次我们的主题围绕跨端技术详细展开~",
    });
  }
  res.status(200).json({ success: true, list: list });
}
