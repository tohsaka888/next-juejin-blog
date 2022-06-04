// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ArticleInfo, InfoResponse } from "../../../config/type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InfoResponse>
) {
  const { id } = req.query;
  const content =
    "## TCP 和 UDP 的区别\n\nTCP 是一个面向连接的、可靠的、基于字节流的传输层协议。\n\n而 UDP 是一个面向无连接的传输层协议。(就这么简单，其它 TCP 的特性也就没有了)。\n\n具体来分析，和 UDP 相比，TCP 有三大核心特性:\n\n1. 面向连接 - 所谓的连接，指的是客户端和服务器的连接，在双方互相通信之前，TCP 需要三次握手建立连接，而 UDP 没有相应建立连接的过程。\n1. 可靠性 - TCP 花了非常多的功夫保证连接的可靠，这个可靠性体现在哪些方面呢？一个是有状态，另一个是可控制。\n\n> TCP 会精准记录哪些数据发送了，哪些数据被对方接收了，哪些没有被接收到，而且保证数据包按序到达，不允许半点差错。这是有状态。\n\n> 当意识到丢包了或者网络环境不佳，TCP 会根据具体情况调整自己的行为，控制自己的发送速度或者重发。这是可控制。\n\n1. 面向字节流。UDP 的数据传输是基于数据报的，这是因为仅仅只是继承了 IP 层的特性，而 TCP 为了维护状态，将一个个 IP 包变成了字节流。\n\n## TCP 三次握手的过程\n\nTCP 的三次握手，需要确认双方(服务端和客户端)的两样能力: 发送的能力和接收的能力。于是便会有下面的三次握手的过程:\n\n![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/23/170723de9b8aa08b~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)\n\n从最开始双方都处于 CLOSED 状态。然后服务端开始监听某个端口，进入了 LISTEN 状态。\n\n然后客户端主动发起连接，发送 SYN(建立连接) , 自己变成了 SYN-SENT 状态。\n\n服务端接收到，返回 SYN 和 ACK(对应客户端发来的 SYN, 确认)，自己变成了 SYN-REVD。\n\n之后客户端再发送 ACK 给服务端，自己变成了 ESTABLISHED 状态；服务端收到 ACK 之后，也变成了 ESTABLISHED 状态。\n\n另外需要提醒你注意的是，从图中可以看出，SYN 是需要消耗一个序列号的，下次发送对应的 ACK 序列号要加1，为什么呢？只需要记住一个规则:\n\n> 凡是需要对端确认的，一定消耗TCP报文的序列号。\n\nSYN 需要对端的确认， 而 ACK 并不需要，因此 SYN 消耗一个序列号而 ACK 不需要。\n\n:::info\n理论上只要能确定双方的接收和发送能力,就可以满足tcp连接的要求。3次只是最少需要的次数,实际上发送100次都可以。只是没必要。\n:::\n\n### 三次握手过程中可以携带数据么？\n\n第三次握手的时候，可以携带。前两次握手不能携带数据。\n如果前两次握手能够携带数据，那么一旦有人想攻击服务器，那么他只需要在第一次握手中的 SYN 报文中放大量数据，那么服务器势必会消耗更多的时间和内存空间去处理这些数据，增大了服务器被攻击的风险。\n第三次握手的时候，客户端已经处于ESTABLISHED状态，并且已经能够确认服务器的接收、发送能力正常，这个时候相对安全了，可以携带数据。\n\n## TCP 四次挥手的过程\n\n![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/23/170723e5c0e05829~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)\n\n刚开始双方处于ESTABLISHED状态。\n\n客户端要断开了，向服务器发送 FIN 报文，在 TCP 报文中的位置如下图:\n\n![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/23/170723e922fbc127~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)\n\n发送后客户端变成了FIN-WAIT-1状态。注意, 这时候客户端同时也变成了half-close(半关闭)状态，即无法向服务端发送报文，只能接收。\n服务端接收后向客户端确认，变成了CLOSED-WAIT状态。\n客户端接收到了服务端的确认，变成了FIN-WAIT2状态。\n随后，服务端向客户端发送FIN，自己进入LAST-ACK状态，\n客户端收到服务端发来的FIN后，自己变成了TIME-WAIT状态，然后发送 ACK 给服务端。\n注意了，这个时候，客户端需要等待足够长的时间，具体来说，是 2 个 MSL(Maximum Segment Lifetime，报文最大生存时间), 在这段时间内如果客户端没有收到服务端的重发请求，那么表示 ACK 成功到达，挥手结束，否则客户端重发 ACK。\n```js\n{\n  stateNode: new ClickCounter,\n  type: ClickCounter,\n  alternate: null,\n  key: null,\n  updateQueue: null,\n  memoizedState: {count: 0},\n  pendingProps: {},\n  memoizedProps: {},\n  tag:1 ,\n  effectTag: 0,\n  nextEffect: null,\n}\n```";
  const articleInfo: ArticleInfo = {
    id: +id,
    title: `持续创作，加速成长，6月更文活动来啦！｜ 掘金·日新计划`,
    tags: ["React", "Next.js"],
    coverImage:
      "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92273c48d6e04babadae9969efa6d4b9~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?",
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
