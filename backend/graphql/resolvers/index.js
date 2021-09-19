const postsResolvers = require('./tasks')
const usersResolvers = require('./users')

module.exports = {
    Query: {
        ...postsResolvers.Query
    }
}