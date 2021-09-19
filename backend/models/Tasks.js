const { model, Schema } = require('mongoose')

const taskSchema = new Schema({
    title: String,
    body: String,
    username: String,
    createdAt: String,
    tags: [
        {
            name: String
        }
    ],
    status: Boolean(false),
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }

})

module.exports = model('Task', taskSchema);