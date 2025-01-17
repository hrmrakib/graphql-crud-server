import gql from "graphql-tag";

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: ID!): User
    deleteUser(id: ID!): User
  }
`;

export default userSchema;
