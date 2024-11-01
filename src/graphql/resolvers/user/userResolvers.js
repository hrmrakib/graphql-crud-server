import { userCollection } from "../../../config/db.js";

const userResolvers = {
  Query: {
    users: async () => {
      const users = await userCollection.find().toArray();
      return users;
    },
  },

  Mutation: {
    createUser: async (_, { name, email }) => {
      try {
        const userExist = await userCollection.findOne({ email });
        if (userExist) {
          return { success: true, message: email + "User already exist" };
        }

        const user = await userCollection.insertOne({ name, email });
        if (user.insertedId) return { name, email, id: user.insertedId };

        return { message: "User not created" };
      } catch (error) {
        return {
          message: "An error occurred while creating the user" + error.message,
        };
      }
    },
  },
};

export default userResolvers;
