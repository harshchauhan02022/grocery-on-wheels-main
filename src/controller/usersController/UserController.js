const UserModel = require('../../models/userModels/UserModel');
const bcrypt = require('bcrypt');

const UserController = {
  registerUser: (req, res) => {
    const { username, firstName, lastName, mobile, email, role, password, photo, gender, dob, country, state, city } = req.body;

    // Validate all required fields
    if (!username || !firstName || !lastName || !mobile || !email || !role || !password || !gender || !dob || !country || !state || !city) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if username already exists
    UserModel.findUserByUsername(username, (err, existingUser) => {
      if (err) {
        console.error('Error checking for existing user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Check if email already exists
      UserModel.findUserByEmail(email, (err, existingEmailUser) => {
        if (err) {
          console.error('Error checking for existing email:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (existingEmailUser) {
          return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }

          // Prepare user data
          const userData = {
            username,
            firstName,
            lastName,
            mobile,
            email,
            role,
            password: hashedPassword,
            photo,
            gender,
            dob,
            country,
            state,
            city,
          };

          // Register the user
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
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: "Username or email and password are required" });
    }

    const findUser = usernameOrEmail.includes('@') ? UserModel.findUserByEmail : UserModel.findUserByUsername;

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

        return res.status(200).json({
          message: 'Login successful',
          user: { username: user.username, email: user.email, role: user.role_name }
        });
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
    const userId = req.params.id;

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
