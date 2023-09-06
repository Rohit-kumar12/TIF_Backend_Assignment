import slugify from "slugify";
import Community from "../../models/Community.js";

export const Create = async (req, res) => {
  try {
    const { name } = req.body;
    //validations
    if (!name) {
      return res.status(300).json({
        message: "Community name is required",
      });
    }
    if (name.length < 2) {
      return res.status(400).json({
        message: "Community name should be minimum 2 characters",
      });
    }
    const community = new Community({
      name,
      slug: slugify(name),
      owner: req.user.userId,
    });
    const newCommunity = await community.save();
    res.status(200).json({
      status: true,
      content: {
        data: {
          id: newCommunity._id,
          name: newCommunity.name,
          slug: newCommunity.slug,
          owner: newCommunity.owner,
          created_at: newCommunity.createdAt,
          updated_at: newCommunity.updatedAt,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error in creating community",
      error,
    });
  }
};
