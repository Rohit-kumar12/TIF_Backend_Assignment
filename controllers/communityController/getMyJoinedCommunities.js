import Member from "../../models/Member.js";

export const getMyJoinedCommunities = async (req, res) => {
  try {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;

    const myCommunities = await Member.find({ user: userId })
      .select("-_id community")
      .populate({
        path: "community",
        select: "id name slug owner created_at updated_at",
        populate: {
          path: "owner",
          select: "id name",
        },
      })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalCommunities = await Member.countDocuments({ user: userId });
    const totalPages = Math.ceil(totalCommunities / perPage);

    res.status(200).json({
      status: true,
      content: {
        meta: {
          total: totalCommunities,
          pages: totalPages,
          page: page,
        },
        data: myCommunities.map((member) => ({
          id: member.community._id,
          name: member.community.name,
          slug: member.community.slug,
          owner: {
            id: member.community.owner._id,
            name: member.community.owner.name,
          },
          created_at: member.community.created_at,
          updated_at: member.community.updated_at,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};
