import Paddle from '../../../models/Paddle';
import db from '../../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  const product = await Paddle.findById(req.query.id);
  await db.disconnect();
  res.send(paddle);
};

export default handler;
