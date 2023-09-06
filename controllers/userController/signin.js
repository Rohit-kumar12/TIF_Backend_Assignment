import { comparePassword } from "../../helpers/authhelper.js";
import JWT from "jsonwebtoken";
import User from "../../models/User.js";

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(204).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email not registered",
      });
    }

    //compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //create token
    const token = await JWT.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).send({
      status: true,
      content: {
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          created_at: user.createdAt,
        },
        meta: {
          access_token: token,
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
