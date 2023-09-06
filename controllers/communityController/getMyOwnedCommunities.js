import Community from "../../models/Community.js";

export const getMyOwnedCommunities = async (req, res) => {
  try {
    const ownedCommunities = await Community.find({ owner: req.user.userId });
    res.status(200).json({
      status: true,
      content: {
        data: ownedCommunities,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};
