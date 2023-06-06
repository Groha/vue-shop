const bcrypt = require('bcryptjs');

export const logins = [
  {
    username: 'admin',
    passwordHash: bcrypt.hashSync('pass', 10),
  }
];