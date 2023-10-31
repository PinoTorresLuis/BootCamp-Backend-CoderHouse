import { ticketModel } from "../models/ticket.model.js";
import { v4 as uuidv4 } from "uuid";

export const getTicket = async(req,res)=>{
    try {
        const ticket = await ticketModel.find();
        res.status(200).send({mensaje:"Todos los ticket cargados correctamente", ticket});
    } catch (error) {
        res.status(400).send({mensaje:'No se encontraron tickets', error})
    }
}

export const createTicket = async(req,res)=>{
    const {amount, email} = req.query;

    try {
            const ticket = {
                code: uuidv4(),
                amount:amount,
                purcharser: email
            };
    await ticketModel.create(ticket);
    const ticketGenerate = await ticketModel.findOne({code:ticket.code});
    res.status(201).send({mensaje:'Ticket generado exitosamente',ticketGenerate}); 
    } catch (error) {
        res.status(500).send({mensaje:"No se pudo generar el ticket", error});
    }
}