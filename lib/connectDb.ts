import { MongoSessionDaemon } from 'mongo-client-daemon'

// mongoDB连接组件
const connectDB = async () => {
  const db = new MongoSessionDaemon(
    "mongodb://sdd:225522@124.223.196.92:27017/?authMechanism=DEFAULT&authSource=JueJinBlog"
  ); //输入连接数据库的地址
  const getSession = await db.getSession();
  return await getSession.db("JueJinBlog");
};

export default connectDB;