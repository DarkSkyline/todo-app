const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

const Task = require('./models/Tasks')
const { MONGODB } = require('./config.js')

const typeDefs = gql`
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

const resolvers = {
    Query: {
        async getTasks(){
            try{
                const posts = await Task.find();
                return posts;
            } catch(err) {
                throw new Error(err)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGODB, { useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB connected')
        return server.listen({ port: 5000})
    })
    .then(res => {
        console.log(`Server running at ${res.url}` )
    })