import Member from "../../models/Member.js";
import Community from "../../models/Community.js";

export const getAllCommunityMembers = async (req, res) => {
  try {
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;

    const totalMembers = await Member.countDocuments({ community: id });
    const totalPages = Math.ceil(totalMembers / perPage);

    const communityMembers = await Member.find({ community: id })
      .populate([
        {
          path: "user",
          select: "id name", // Only expand "id" and "name" fields of the user
        },
        { path: "role", select: "id name" },
      ])
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      status: true,
      content: {
        meta: {
          total: totalMembers,
          pages: totalPages,
          page: page,
        },
        data: communityMembers.map((member) => ({
          id: member._id,
          community: member.community,
          user: {
            id: member.user._id,
            name: member.user.name,
          },
          role: {
            id: member.role._id,
            name: member.role.name,
          },
          created_at: member.createdAt,
        })),
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
