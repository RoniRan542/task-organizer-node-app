const { status } = require('express/lib/response');
const Task = require('../models/task');

exports.getTasks =  (req, res) => {
    const tasks = Task.find().select("_id title body")
    .then((tasks) => {
        res.json({tasks});
    })
    .catch(err => console.log(err));
};

exports.createTask = (req, res) => {
    const task = new Task(req.body);
    task.save()
    .then((result) => {
            res.json({
                task: result
            })
    })
    .catch(err => console.log(err));
};

exports.updateTask = (req, res) => {
    const {id} = req.params;
    Task.findOneAndUpdate({_id:id},{$set: {author:req.body.author}},{new:true})
    .then((result) => {
        if (result) {
            res.json({success: true, message: "record updated"});
        } else {
            res.json({success: true, message: "record not found"});
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

exports.deleteTask = (req, res) => {
    const {id} = req.params;
    Task.findOneAndRemove({_id:id})
    .then((result) => {
        if (result) {
            res.json({success: true, message: "record deleted"});
        } else {
            res.json({success: true, message: "record not found"});
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
