const Comment = require("../model/comment.model");
const connect = require("../config/dbConfig");
const mongoose = require("mongoose");

const comments = [
  {
    user: "Batman",
    comment: "Great post!",
  },
  {
    user: "Robin",
    comment: "Interesting ideas...",
  },
  {
    user: "Joker",
    comment: "Thanks, Batman!",
  },
  {
    user: "Bruce Wayne",
    comment: "I agree with Batman",
  },
];

async function seedDatabase() {
  try {
    // Connect to the database
    await connect();

    // Loop over new comments and create them
    for (const commentData of comments) {
      const comment = new Comment(commentData);
      await comment.save();
    }

    console.log("Database Seeded");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

seedDatabase();
