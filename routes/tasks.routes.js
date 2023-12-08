import { Router } from 'express';
import { crearTarea, todasLasTareas, obtenerTareaPorId, eliminarTareaPorId, actualizarTarea } from '../controller/tasks.controller.js';
import authRequired from '../middlewares/validateToken.js';
import { validateSchema } from "../middlewares/validaror.middleware.js"
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema.js';
const tasksRouter = Router();

tasksRouter.get("/tareas", authRequired, todasLasTareas)
tasksRouter.post("/tareas", authRequired, validateSchema(createTaskSchema), crearTarea)
tasksRouter.put("/tareas/:id", authRequired, validateSchema(updateTaskSchema), actualizarTarea)
tasksRouter.get("/tareas/:id", authRequired, obtenerTareaPorId)
tasksRouter.delete("/tareas/:id", authRequired, eliminarTareaPorId)
export default tasksRouter;
