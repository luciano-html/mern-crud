
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UsuarioModel",
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    });

const Task = mongoose.model('Task', taskSchema);

export default Task;
