import Visitor from '../models/visitor.js';
import { v4 as uuidv4 } from 'uuid';

export const getVisitorCount = async (req, res) => {
  const visitor = await Visitor.findOne({});
  if (!visitor) {
    res.status(404).json({ message: 'Visitor count not found' });
  } else {
    res.json(visitor);
  }
};

export const incrementVisitorCount = async (req, res) => {
  const visitorId = req.cookies.visitorId;

  if (!visitorId) {
    res.cookie('visitorId', uuidv4(), { httpOnly: true });
    const visitor = await Visitor.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true });
    res.json(visitor);
  } else {
    const visitor = await Visitor.findOne({});
    res.json(visitor);
  }
};
