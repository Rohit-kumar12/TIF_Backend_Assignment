import Community from "../../models/Community.js";
import User from "../../models/User.js";

export const GetAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  try {
    const totalCommunities = await Community.countDocuments();
    const totalPages = Math.ceil(totalCommunities / perPage);
    const communities = await Community.find()
      .populate([{ path: "owner", select: "name" }])
      .skip((page - 1) * perPage)
      .limit(perPage);
    // res.send(communities);

    // const owner_name = await User.findOne()
    // const formattedCommunities = communities.map((community) => ({
    //   id: community._id,
    //   name: community.name,
    //   slug: community.slug,
    //   owner: {
    //     id: community.owner,
    //     name: User.findOne({ id: community.owner }),
    //   },
    //   created_at: community.createdAt,
    //   updated_at: community.updatedAt,
    // }));

    res.status(200).json({
      status: true,
      content: {
        meta: {
          total: totalCommunities,
          pages: totalPages,
          page: page,
        },
        data: communities,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error in getting All Communities",
    });
  }
};
