export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Dish {
    id: ID!
    name: String!
    category: String!
    price: Float!
    isAvailable: Boolean!
    owner: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    me: User
    dishes(category: String): [Dish!]!
    dish(id: ID!): Dish
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createDish(
      name: String!
      category: String!
      price: Float!
      isAvailable: Boolean = true
    ): Dish!
    deleteDish(id: ID!): Boolean!
  }
`;