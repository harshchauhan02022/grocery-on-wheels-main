const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

const UserController = {
  registerUser: (req, res) => {
    const { username, firstName, lastName, mobile, email, role, password } = req.body;
    if (!username || !firstName || !lastName || !mobile || !email || !role || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    UserModel.findUserByUsername(username, (err, existingUser) => {
      if (err) {
        console.error('Error checking for existing user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      UserModel.findUserByEmail(email, (err, existingEmailUser) => {
        if (err) {
          console.error('Error checking for existing email:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        if (existingEmailUser) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }
          const userData = { username, firstName, lastName, mobile, email, role, password: hashedPassword };
          UserModel.registerUser(userData, (err, result) => {
            if (err) {
              console.error('Error registering user:', err);
              return res.status(500).json({ error: 'Internal server error' });
            }
            return res.status(201).json({ message: 'User registered successfully' });
          });
        });
      });
    });
  },

  loginUser: (req, res) => {
    console.log('Login request body:', req.body); // Debug log
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: "Identifier (username or email) and password are required" });
    }

    const findUser = usernameOrEmail.includes('@') ?
      UserModel.findUserByEmail :
      UserModel.findUserByUsername;

    findUser(usernameOrEmail, (err, user) => {
      if (err) {
        console.error('Error finding user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        if (!isMatch) {
          return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Login successful
        return res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email, role: user.role_name } });
      });
    });
  },

  getAllUsers: (req, res) => {
    UserModel.getAllUsers((err, users) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.status(200).json(users);
    });
  },

  deleteUser: (req, res) => {
    const userId = req.params.id;  // Get the ID from the URL parameters

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    UserModel.deleteUser(userId, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ message: 'User deleted successfully' });
    });
  },

  editUser: (req, res) => {
    const { username, firstName, lastName, mobile, email, role } = req.body;

    if (!username || !firstName || !lastName || !email || !role) {
      return res.status(400).json({ error: "All fields must be provided" });
    }

    UserModel.updateUser({ username, firstName, lastName, mobile, email, role }, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ message: 'User updated successfully' });
    });
  },
};

module.exports = UserController;
