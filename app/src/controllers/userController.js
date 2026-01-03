const User = require("../models/User");

// Create/update perfil del usuario autenticado
exports.syncUser = async (req, res) => {
  try {
    const { name, age, address, avatar } = req.body;
    let user = await User.findOne({ clerkId: req.userId });
    if (!user) {
      user = new User({
        clerkId: req.userId,
        email: req.userEmail,
        name,
        age,
        address,
        avatar,
      });
    } else {
      user.name = name || user.name;
      user.age = age || user.age;
      user.address = address || user.address;
      user.avatar = avatar || user.avatar;
    }

    await user.save();
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Perfil no encontrado",
      });
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
