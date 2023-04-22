const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: false
    },
    status: {
        type: String,
        default: false
    },
    due_date: {
        type: String,
        default: Date.now()
    },
    user_name: {
        type: String,
        default: false
    }
});

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;