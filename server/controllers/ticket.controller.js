import Ticket from "../models/ticket.model.js";

// @desc    Create new ticket
export const createTicket = async (req, res) => {
    try {
        const ticket = await Ticket.create(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// @desc    Get all tickets
export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc update ticket by id
export const updateTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        ticket.set(req.body);
        await ticket.save();
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc delete ticket by id
export const deleteTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}