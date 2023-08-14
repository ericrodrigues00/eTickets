const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importe o modelo que você criou

// Rota para criar um novo item
router.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Outras rotas podem ser definidas aqui
console.log(User);
module.exports = router;
