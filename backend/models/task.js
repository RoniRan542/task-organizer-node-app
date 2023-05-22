const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: 'string',
        required: true
    },
    body: {
        type: 'string',
        required: true
    },
    styles: {
        style1 : {
            type: 'string',
            required: false 
        },
        style2 : {
            type: 'string',
            required: false
        }
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Task",taskSchema);