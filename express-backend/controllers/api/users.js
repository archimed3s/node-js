import { Router } from "express";
import { users } from '../../models/user';

export const router = Router();

router.get('/', (req, res) => {
  res.send(users);
});