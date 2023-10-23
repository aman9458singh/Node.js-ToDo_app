import { Task } from "../models/task.js"
import ErrorHandler from "../middlewares/error.js"

export const newTask = async (req, res, next) => {
    try {
        let { title, description } = req.body
        await Task.create({
            title,
            description,
            user: req.user,
        })

        res.status(201).json({
            success: true,
            message: "task created successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const getMyTasks = async (req, res, next) => {

    try {
        const userId = req.user._id;
        const task = await Task.find({ user: userId })
        res.status(201).json({
            success: true,
            task,
        })
    } catch (error) {
        next(error)
    }
}


export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)

        if (!task) return next(new ErrorHandler("Invalid Id", 404))

        task.isCompleted = !task.isCompleted
        await task.save()
        res.status(201).json({
            success: true,
            message: "Task updated successfully",
        })
    } catch (error) {
        next(error)
    }

}

export const deleteTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id)

        if (!task) return next(new ErrorHandler("Task not Found", 404))
        await task.deleteOne()

        res.status(201).json({
            success: true,
            message: "Task deleted successfully",
        })
    } catch (error) {
        next(error)
    }

}

