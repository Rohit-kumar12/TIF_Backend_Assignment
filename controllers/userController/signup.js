import { hashpassword } from "../../helpers/authhelper.js";
import JWT from "jsonwebtoken";
import User from "../../models/User.js";

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validations
    if (!name || !email || !password) {
      return res.status(204).json({
        message: "Name and Email and password is required",
      });
    }
    if (name.length < 2) {
      return res.status(400).json({
        mesaage: "name must be more than 2 characters",
      });
    }
    if (password.length < 7) {
      return res.status(400).json({
        mesaage: "password must be more than 6 characters",
      });
    }

    //check user
    const existingUser = await User.findOne({ email });

    //check existinguser
    if (existingUser) {
      return res.status(300).json({
        success: false,
        message: "Alredy Register Please signIn",
      });
    }

    //register user
    const hashedpassword = await hashpassword(password);

    //create new user
    const user = new User({
      name,
      email,
      password: hashedpassword,
    });

    //save new user
    const newUser = await user.save();
    res.status(201).json({
      status: true,
      content: {
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          created_at: newUser.createdAt,
        },
        meta: {
          access_token: JWT.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          ),
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in signup",
      error: error.message,
    });
  }
};
