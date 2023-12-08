import Task from "../models/tasks.model.js";

export async function todasLasTareas(req, res) {
    try {
        const tasks = await Task.find({user: req.user.id})

        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function obtenerTareaPorId(req, res) {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send({ message: "Tarea no encontrada" })
        res.status(200).json(task);
    } catch (error) {
        req.status(500).send({ message: "Controller error: obtenerTareaPorId" });
    }
}

export async function crearTarea(req, res) {
    try {
        const { title, description, date } = req.body

        const newTask = new Task({ title, description,date, user: req.user.id })
        console.log(newTask);
        
        const savedTask = await newTask.save()
        res.status(200).json(savedTask)
    } catch (error) {
        console.log(`Error en crearTarea: ${error.message}`)
        res.status(500).send({ message: "Controller error: crearTarea" })
    }
}

export async function actualizarTarea(req, res) {
    try {                                      // ID            New BODY
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(task)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

export async function eliminarTareaPorId(req, res) {
    try {

        const task = await Task.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        req.status(500).send({ message: "Controller error: eliminarTareaPorId" });
    }
}




