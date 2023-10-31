import { Router } from "express";
import { createTicket } from "../controllers/ticket.controller.js";

const routerTicket = Router();

routerTicket.get('/createTicket',createTicket);

export default routerTicket;