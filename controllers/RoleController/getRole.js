import Role from "../../models/Role.js";

export const getRoll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  try {
    const totalRoles = await Role.countDocuments();
    const totalPages = Math.ceil(totalRoles / perPage);
    const Roles = await Role.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .select(" ");
    res.status(200).json({
      status: true,
      content: {
        meta: {
          total: totalRoles,
          pages: totalPages,
          page: page,
        },
        data: Roles,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error is getting Roles",
      error,
    });
  }
};
