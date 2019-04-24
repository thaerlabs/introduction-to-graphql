const { GraphQLServer } = require('graphql-yoga')
const find = require('lodash/find');
const movies = require('./data/movies');

const typeDefs = `
type Movie {
  id: String
  name: String
  releaseDate: String
}

type Query {
  movies: [Movie]
  movie(id: Int): Movie
}
`
const resolvers = {
  Query: {
    movies: () => movies,
    movie: (_, args) => find(movies, {
      id: args.id
    })
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
