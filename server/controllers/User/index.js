const { user } = require("../../Models");

const newUser = async (req, res) => {
  try {
    const { fullname, userName, email, password, spaceId, userId } = req.body;

    const createNewUser = await user.create({
      fullname: fullname,
      userName: userName,
      email: email,
      password: password,
      spaceIds: [spaceId],
      userId: userId, 
    });

    createNewUser.spaceIds.push(spaceId);
    createNewUser.save();

    console.log(createNewUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  newUser,
};
