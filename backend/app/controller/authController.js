
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/users');

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'key', { expiresIn: '10h' });
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.cookie('token', token, { httpOnly: true });

    res.json({
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

