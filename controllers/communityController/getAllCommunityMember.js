import Member from "../../models/Member.js";
import Community from "../../models/Community.js";
export const getAllCommunityMembers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  try {
    console.log(req.params.id)
    const totalCommunities = await Community.countDocuments();
    const totalPages = Math.ceil(totalCommunities / perPage);
    const id = req.params.id;
    const communityMembers = await Member.find({ community: id }).populate([
      { path: "user", select: "name" },
      { path: "role", select: "name" },
    ]);

    res.status(200).json({
      status: true,
      content: {
        data: communityMembers,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error in getting all community members",
      error,
    });
  }
};
