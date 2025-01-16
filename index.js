const { parsed: { PORT } } = require('dotenv').config();
const express = require('express');
const route = express.Router()
const app = express();
const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/user', (req, res) => {
    res.send('Hellso Worlds user!')
})

// Define GraphQL schema
const typeDefs = gql`
  type Post {
    userId: Int
    id: Int
    title: String
    body: String
  }

  type Query {
    posts: [Post]
    post(id: Int!): Post
  }
`;


// Define resolvers
const resolvers = {
    Query: {
      posts: async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data;
      },
      post: async (_, { id }) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return response.data;
      },
    },
  };

  // Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the server
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });

// app.listen(PORT, () => console.log('server started on port http://localhost:' + PORT))