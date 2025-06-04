const User = require("../models/user");
const bcrypt = require("bcryptjs");

const adminController = {
    showAdmin: (req, res) => {
        res.json({ message: "Welcome to the Admin Panel" });
    },
    showLogin: (req, res) => {
        res.json({ message: "Admin Login Endpoint" });
    },
    
    // Admin Signup (Create an Admin with Hashed Password)
    signup: async (req, res) => {
        try {
            const { username, email, password, phone, dob } = req.body;

            if (!username || !email || !password || !phone || !dob) {
                return res.status(400).json({ error: "All fields are required!" });
            }

            // Check if admin already exists
            let existingAdmin = await User.findOne({ where: { email, roleid: 1 } });
            if (existingAdmin) {
                return res.status(400).json({ error: "Admin already exists!" });
            }

            // Hash password before storing it
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Create new admin
            const admin = await User.create({
                username,
                email,
                password: hashedPassword,
                phone,
                dob,
                roleid: 1 // Ensure 1 represents Admin
            });

            res.status(201).json({ message: "Admin registered successfully!", admin });

        } catch (error) {
            console.error("Signup Error:", error);
            res.status(500).json({ error: "An internal server error occurred." });
        }
    },

    // Admin Login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required!" });
            }

            let user = await User.findOne({ where: { email, roleid: 1 } });
            if (!user) {
                return res.status(404).json({ error: "Admin not found!" });
            }

            // Verify hashed password
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            res.json({ message: "Login successful", user });

        } catch (error) {
            console.error("Login Error:", error);
            res.status(500).json({ error: "An internal server error occurred." });
        }
    },

    logout: (req, res) => {
        res.json({ message: "Logout functionality not needed without sessions." });
    }
};

module.exports = adminController;
