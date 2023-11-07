import { Router } from "express";
import {passportError, authorization } from "../utils/messageErrors.js";
import { generateMockProducts } from "../controllers/mockProducts.controller.js";

const mockingRouter = Router();

mockingRouter.get('/', passportError('jwt'), authorization('admin'),generateMockProducts);

export default mockingRouter;