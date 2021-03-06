import bcrypt from "bcryptjs";

const users = [
  {
    displayName: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    displayName: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    displayName: "Jessica Doe",
    email: "Jessica@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    displayName: "Dundie Doe",
    email: "Dundie@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
