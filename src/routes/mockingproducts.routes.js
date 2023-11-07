import { Router } from "express";
import { modelUser } from "../faker.js";
import {passportError, authorization } from "../utils/messageErrors.js";

const mockingRouter = Router();

mockingRouter.get('/', passportError('jwt'), authorization('user'), modelUser);

export default mockingRouter;