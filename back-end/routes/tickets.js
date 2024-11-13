const { Router } = require('express');
const Ticket = require('../models/ticket');
const isAuth = require('../middleware/isAuth');
const Counter = require('../models/counter');
const router = Router();

router.get('/', isAuth, async (req, res) => {
    const tickets = await Ticket.find().populate('questions').lean();

    res.render('tickets', {
        title: 'Билеты',
        isTickets: true,
        tickets,
    });
});

router.get('/create-ticket', isAuth, async (req, res) => {
    res.render('create-ticket', {
        title: 'Создать билет',
        isCreateTicket: true,
    });
});

router.post('/create-ticket', isAuth, async (req, res) => {
    try {
        let counter = await Counter.findOne({name: 'ticketCounter'});

        if (!counter) {
            counter = new Counter({name: 'ticketCounter', count: 1});
        } else {
            counter.count++;
        }

        await counter.save();

        const ticket = new Ticket({
            ticketNumber: counter.count,
            questions: req.body.questions,
        });

        await ticket.save();

        res.status(200).json({message: 'The ticket was successfully saved'});
    } catch (error) {
        res.status(500).json({message: 'Error saving the ticket', error: error});
        console.error(error);
    }
});

module.exports = router;

