const { AuthenticationError } = require('apollo-server-errors');
const Task = require('../../models/Tasks')
const checkAuth = require('../../utils/check-auth')

module.exports = {
    Query: {
        async getTasks(){
            try{
                const tasks = await Task.find().sort({ createdAt: -1 });
                return tasks;
            } catch(err) {
                throw new Error(err)
            }
        },
        async getTask(_, { taskId }){
            try {
                const task = await Task.findById(taskId)
                if(task){
                    return task
                } else {
                    throw new Error('Task not found')
                }
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createTask(_, { title, body }, context){
            const user = checkAuth(context)
            console.log(user)

            const newTask = new Task({
                title,
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })

            const task = newTask.save()

            return task
        },
        async deleteTask(_, { taskId }, context){
            const user = checkAuth(context)

            try {
                const taskToDelete = await Task.findById(taskId)
                if(user.username === taskToDelete.username) {
                    await taskToDelete.delete()
                    return 'Task deleted successfully'
                } else {
                    throw new AuthenticationError('Action not alllowed')
                }
            } catch(err) {
                throw new Error(err)
            }
        }
    }
}