import Member from "../../models/Member.js";

export const deleteMember = async (req, res) => {
  try {
    const id = req.params.id;
    //check if member is exist or not
    const foundMember = await Member.findById(id);
    if (!foundMember) {
      return res.status(300).json({
        message: "Community member is not exist",
      });
    }
    //delete member
    await Member.findByIdAndDelete(id).then();
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error in deleting community member",
      error,
    });
  }
};
