const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importe o modelo de Usuário
const Ticket = require('../models/Ticket'); // Importe o modelo de Ticket

// Rota para criar um novo usuário
router.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para criar um novo ticket
router.post('/tickets', async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Outras rotas podem ser definidas aqui
module.exports = router;
