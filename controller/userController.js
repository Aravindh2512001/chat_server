const User = require("../models/User");

const getUsers = async (req, res) => {
  const search = req.query.search || "";

  try {
    // Check if the search query is empty
    if (!search.trim()) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Find users whose usernames contain the search string, case-insensitively
    const users = await User.find(
      { username: { $regex: search, $options: "i" } }
    ).select("-password");

    // If no users match the search
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    // Return the matched users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Update user profile
const profileUpdate = async (req, res) => {
  const id = req.user._id;
  const { image, username } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields only if provided
    if (username) user.username = username;
    if (image) user.avatar = image;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, profileUpdate };
