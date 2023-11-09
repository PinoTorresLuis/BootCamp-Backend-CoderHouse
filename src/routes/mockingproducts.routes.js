import { Router } from "express";
import { generateMockProducts } from "../controllers/mockProducts.controller.js";
import {passportError, authorization } from "../utils/messageErrors.js";

const mockingRouter = Router();

mockingRouter.get('/', passportError('jwt'), authorization('user'), generateMockProducts);

export default mockingRouter;