const express = require('express');
const {getUsers, createUser, deleteUser} = require('../controllers/user');
const validator = require('../helpers/validator');


const router = express.Router();

router.get('/', getUsers);
router.post('/add',validator.createUserValidator, createUser);
router.delete('/delete',deleteUser);

module.exports = router;