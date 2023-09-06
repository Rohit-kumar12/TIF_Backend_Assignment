import Community from "../../models/Community.js";
import Member from "../../models/Member.js";
import Role from "../../models/Role.js";
import User from "../../models/User.js";

export const CreateMember = async (req, res) => {
  try {
    const { community, user, role } = req.body;
    //validations
    if (!community || !user || !role) {
      return res.status(300).json({
        message: "community and user and role must be required ",
      });
    }
    //getting all user and role and community object
    const roleObject = await Role.findById(role);
    const userObject = await User.findById(user);
    const communityObject = await Community.findById(community);
    // const objectId = communityObject.owner;
    // const id = objectId.toString();
    // console.log(id);
    //checking if role is exists or not
    if (!roleObject) {
      return res.status(404).json({
        message: "Role doesnot exists",
      });
    }
    //checking if user is exists or not
    if (!userObject) {
      return res.status(404).json({
        message: "User doesnot exists",
      });
    }
    //checking if community is exists or not
    if (!communityObject) {
      return res.status(404).json({
        message: "Community doesnot exists",
      });
    }
    const objectId = communityObject.owner;
    const id = objectId.toString();
    //verify if the user is community admin or not
    if (id !== req.user.userId) {
      return res.status(405).json({
        message: "NOT_ALLOWED_ACCESS ",
      });
    }

    //creating new member
    const member = new Member({
      community,
      user,
      role,
    });
    //saving new member
    const newMember = await member.save();

    res.status(200).json({
      status: true,
      content: {
        data: {
          id: newMember._id,
          community: newMember.community,
          user: newMember.user,
          role: newMember.role,
          created_at: newMember.createdAt,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error in creating Member",
      error,
    });
  }
};
