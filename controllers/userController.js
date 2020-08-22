// const UserModel = require("../models/usersModel");
// const {
//   newUserValidation,
//   loginValidation,
// } = require("../validation/userValidation");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// //==============================POST New User=========================================
// // should not be used only here for testing and learning
// exports.postRegister = async (req, res, next) => {
//   //validation useing Joi
//   const err = newUserValidation(req.body);
//   if (err.error) {
//     return res.status(400).send(err.error.details[0].message);
//   }

//   // see if user already has account
//   const emailExist = await UserModel.findOne({ email: req.body.email });
//   if (emailExist) {
//     return res.status(400).send(`${req.body.email} already used`);
//   }

//   // Hashing password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(req.body.password, salt);

//   //   createing user
//   const tempUser = {
//     email: req.body.email,
//     password: hashedPassword,
//   };

//   try {
//     const newUser = await UserModel.create(tempUser);
//     userWithoutPassword = {
//       email: newUser.email,
//       _id: newUser._id,
//       date: newUser.date,
//     };
//     res.status(201).json({
//       success: true,
//       data: userWithoutPassword,
//     });
//   } catch (err) {
//     //   const messages = Object.values(err.errors).map((val) => val.message);
//     return res.status(400).json({
//       success: false,
//       error: err,
//     });
//   }
// };

// //==============================POST Login=========================================
// // should not be used only here for testing and learning
// exports.postLogin = async (req, res, next) => {
//   //validation useing Joi
//   const err = loginValidation(req.body);
//   if (err.error) {
//     return res.status(400).send(err.error.details[0].message);
//   }

//   // finds account in database
//   const user = await UserModel.findOne({ email: req.body.email });
//   // seeing if account does not exist
//   if (!user) {
//     return res.status(400).send(`${req.body.email} does not exist`);
//   }

//   const validPass = await bcrypt.compare(req.body.password, user.password);
//   if (validPass) {
//     const token = await jwt.sign(
//       {
//         email: user.email,
//         _id: user._id,
//         date: user.date,
//       },
//       "IAMSCRIECTfsdafsdafsdafsd"
//     );

//     res.header("Authorization", token);
//     return res
//       .status(200)
//       .json({ email: user.email, _id: user._id, date: user.date });
//   } else {
//     res.status(200).send("wrong password or email");
//   }
// };
// //==================================test proected route=====================================================
// exports.getUserinfo = async (req, res, next) => {
//   res
//     .status(200)
//     .send("this is user info, you have used your token the right way :)");
// };
