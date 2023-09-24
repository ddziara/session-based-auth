// dao = Data Access Object
// this is an interface between database and the rest of code
// when database is replaced, it is the only think to replace

const bcrypt = require("bcrypt");

const users = {
  "user1@productioncoder.com": {
    pwHash: bcrypt.hashSync("user1pw", 10),
    roles: ["ADMIN"],
    id: "0c11d418-98a9-4bf8-934d-490d6e99b6fc",
  },
  "user2@productioncoder.com": {
    pwHash: bcrypt.hashSync("user2pw", 10),
    roles: ["ACCOUNT_MANAGER"],
    id: "9e8a695b-9e09-47e4-aaef-ec7eb00e7c6f",
  },
};

// his call would be async and would return a promise
// if we were to use a real database
async function findUserByEmail(email) {
  const user = users[email];

  return user ? user : Promise.reject("user not found");
}

module.exports = { findUserByEmail };
