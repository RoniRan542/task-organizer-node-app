const express = require('express')
const {getTasks, createTask, updateTask, deleteTask} = require('../controllers/task');
const validator = require('../helpers/validator')


const router = express.Router();

router.get('/', getTasks);
router.post('/add',validator.createTaskValidator, createTask);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);



 module.exports = router;