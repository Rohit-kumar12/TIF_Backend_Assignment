import Role from "../../models/Role.js";

export const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    //validation
    if (!name) {
      return res.status(204).json({
        message: "Role name is required",
      });
    }
    if (name.length < 2) {
      return res.status(400).json({
        mesaage: "Role name must be more than 2 characters",
      });
    }

    //check if existing Role is exist or not
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(300).json({
        message: "Role is already exist ",
      });
    }

    //create new Role
    const role = new Role({
      name,
    });

    //save role
    const newRole = await role.save();
    res.status(201).json({
      status: true,
      content: {
        data: {
          id: newRole._id,
          name: newRole.name,
          created_at: newRole.createdAt,
          updated_at: newRole.updatedAt,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error in creating role",
      error,
    });
  }
};
