const { gql } = require('apollo-server')

module.exports = gql`
    type Task{
        id: ID!,
        title: String!,
        body: String!,
        username: String!,
        createdAt: String!
    }
    type Query{
        getTasks: [Task]
    }
`