const { gql } = require('apollo-server')

module.exports = gql`
    type Task{
        id: ID!
        title: String!
        body: String!
        username: String!
        createdAt: String!
    }
    type User{
        id: ID!
        username: String!
        token: String!
        createdAt: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
    }
    type Query{
        getTasks: [Task]
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!)
    }
`