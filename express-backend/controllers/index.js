import { Router } from "express";
import { router as productsRouter } from "./api/products";
import { router as usersRouter } from "./api/users";

export const router = Router();

router.use('/products', productsRouter);
router.use('/users', usersRouter);