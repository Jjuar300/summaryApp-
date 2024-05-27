const { user } = require("../../Models");

const newUser = async (req, res) => {
  try {
    const { email, password, spaceId, userId } = req.body;

    const createNewUser = await user.create({
      email: email,
      password: password,
      spaceIds: [spaceId],
      userId: userId,
    });

    // createNewUser.spaceIds.push(spaceId);
    // createNewUser.save();

    console.log('==== New User =====')
    console.log('user was created:',createNewUser);
  } catch (error) {
    console.log(error);
  }
};

// const newUserId = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const createNewUserId = await user.create({
//       userId: userId,
//     });
//     createNewUserId.save();
//     console.log("userId:", userId);
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  newUser,
  // newUserId,
};
