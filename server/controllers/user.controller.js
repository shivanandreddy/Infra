import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @desc    Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Hide passwords
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login
export const login = async (req, res) => {

  try {
    const { email, password } = req.body;

    // 1. Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 2. Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3. Generate token
    const token = jwt.sign(
      { id: user.empid, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4. Time info
    const decoded = jwt.decode(token); // OK only for display
    const loginTime = new Date().toLocaleString();
    const loginExpireTime = new Date(decoded.exp * 1000).toLocaleString();

    // 5. Response
    res.status(200).json({
      message: "Login successful",
      token,
      loginTime,
      loginExpireTime,
      user: {
        id: user._id,
        empid: user.empid,
        name: user.name,
        email: user.email,
        role: user.role,
        workgroup: user.workgroup
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// @desc    Get single user by empid
export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ empid: req.params.empid }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new user
export const createUser = async (req, res) => {
    try {
        const { empid, name, email, password, role, workgroup } = req.body;
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            empid, name, email, password: hashedPassword, role, workgroup
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update user
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { empid: req.params.empid },
            req.body,
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ empid: req.params.empid });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add link to user (Example of a custom action)
export const addLink = async (req, res) => {
    try {
        const user = await User.findOne({ empid: req.params.empid });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const { name, url } = req.body;
        user.links.push({ name, url });
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get links of a user
export const getLinks = async (req, res) => {
    try {
        const user = await User.findOne({ empid: req.params.empid });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user.links);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 

//@desc get link by link id
export const getLinkById = async (req, res) => {
    try {
        const user = await User.findOne({ empid: req.params.empid });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const link = user.links.id(req.params.linkid);
        if (!link) return res.status(404).json({ message: 'Link not found' });
        res.status(200).json(link);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//@desc update link by link id
export const updateLinkById = async (req, res) => {
    try {
        const user = await User.findOne({ empid: req.params.empid });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const link = user.links.id(req.params.linkid);
        if (!link) return res.status(404).json({ message: 'Link not found' });
        link.set(req.body);
        await user.save();
        res.status(200).json(link);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//@desc delete link by link id
export const deleteLinkById = async (req, res) => {
    try {
        const user = await User.findOne({ empid: req.params.empid });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const link = user.links.id(req.params.linkid);
        if (!link) return res.status(404).json({ message: 'Link not found' });
        user.links.pull({ _id: req.params.linkid });
        await user.save();
        res.status(200).json({ message: 'Link deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}