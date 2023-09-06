import Member from "../../models/Member.js";

export const getMyJoinedCommunities = async (req, res) => {
  try {
    const myCommunities = await Member.find({
      user: req.user.userId,
    })
      .select("-_id community")
      .populate({
        path: "community",
        populate: { path: "owner", select: "name" },
      });

    res
      .status(200)
      .json({
        status: true,
        content: { data: myCommunities.map((x) => x.community) },
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};
