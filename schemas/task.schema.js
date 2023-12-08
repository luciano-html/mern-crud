import { z } from "zod"

export const createTaskSchema = z.object({
    title: z.string({
        required_error: "Title is required"
    }).min(1).max(255),
    description: z.string({
        required_error: "Description must be a string"
    }).min(1).max(255),
    date: z.string().datetime().optional()
})

export const updateTaskSchema = z.object({
    title: z.string({
        required_error: "Title is required"
    }).min(1).max(255).optional(),
    description: z.string({
        required_error: "Description must be a string"
    }).min(1).max(255).optional(),
    date: z.string().datetime().optional()
})

