import User from "../../models/User.js";

export const Getme = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId }).select(
      "-password "
    );

    res.status(200).json({
      status: true,
      content: {
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          created_at: user.createdAt,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in get user details",
      error: error.message,
    });
  }
};
