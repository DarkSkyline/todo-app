const Task = require('../../models/Tasks')

module.exports = {
    Query: {
        async getTasks(){
            try{
                const tasks = await Task.find();
                return tasks;
            } catch(err) {
                throw new Error(err)
            }
        }
    }
}