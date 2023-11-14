import { Router } from "express"
import { sendMail} from "../controllers/nodemailer.controller.js";
const mailerRouter = Router();

mailerRouter.get('/',sendMail);
 

export default mailerRouter;