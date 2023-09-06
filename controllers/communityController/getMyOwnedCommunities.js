import Community from "../../models/Community.js";

export const getMyOwnedCommunities = async (req, res) => {
  try {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;

    const ownedCommunities = await Community.find({ owner: userId })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalCommunities = await Community.countDocuments({ owner: userId });
    const totalPages = Math.ceil(totalCommunities / perPage);

    res.status(200).json({
      status: true,
      content: {
        meta: {
          total: totalCommunities,
          pages: totalPages,
          page: page,
        },
        data: ownedCommunities.map((community) => ({
          id: community._id,
          name: community.name,
          slug: community.slug,
          owner: community.owner,
          created_at: community.createdAt,
          updated_at: community.updatedAt,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};
