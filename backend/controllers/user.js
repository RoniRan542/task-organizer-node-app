const User = require('../models/user');

exports.getUsers =  (req, res) => {
    const users = User.find().select("_id firstName lastName description")
    .then((users) => {
        res.json({users});
    })
    .catch(err => console.log(err));
};

exports.createUser = (req, res) => {
    const user = new User(req.body);
    user.save().then((result) => {
        res.json({user:result});
    })
}

exports.deleteUser = (req, res) => {
    const {id} = req.params;
    User.findOneAndRemove({_id:id})
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