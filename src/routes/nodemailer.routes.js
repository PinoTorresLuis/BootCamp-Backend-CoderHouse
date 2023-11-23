import { Router } from "express";
import {sendMail} from "../controllers/nodemailer.controller.js";

const nodeMailer = Router();

nodeMailer.get('/',sendMail);

export default nodeMailer;


