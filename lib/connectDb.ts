import { MongoSessionDaemon } from 'mongo-client-daemon'

// mongoDB连接组件
const connectDB = async () => {
  const db = new MongoSessionDaemon(
    `${process.env.MONGODB_CONNECTION}`
  ); //输入连接数据库的地址
  const getSession = await db.getSession();
  return await getSession.db("JueJinBlog");
};

export default connectDB;