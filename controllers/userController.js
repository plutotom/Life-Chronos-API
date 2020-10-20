const UserModel = require("../models/usersModel");
const {
  newUserValidation,
  loginValidation,
} = require("../validation/userValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//==============================POST New User=========================================
// should not be used only here for testing and learning
exports.postRegister = async (req, res, next) => {
  //validation useing Joi
  const err = newUserValidation(req.body);
  if (err.error) {
    return res.status(400).send(err.error.details[0].message);
  }

  // see if user already has account
  const emailExist = await UserModel.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (emailExist) {
    return res.status(400).send(`${req.body.email} already used`);
  }

  // Hashing password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // const hashedPassword = await bcrypt.hash(req.body.password);

  //   createing user
  const tempUser = {
    email: req.body.email.toLowerCase(),
    password: req.body.password,
  };

  try {
    // touching database
    const newUser = await UserModel.create(tempUser);
    userWithoutPassword = {
      email: newUser.email.toLowerCase(),
      _id: newUser._id,
      date: newUser.date,
    };
    res.status(201).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (err) {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: messages,
    });
  }
};

//==============================POST Login=========================================

exports.postLogin = async (req, res, next) => {
  //validation useing Joi
  const err = loginValidation(req.body);
  if (err.error) {
    return res.status(404).json({
      success: false,
      message: err.error.details[0].message,
    });
  }

  // finds account in database
  const user = await UserModel.findOne({ email: req.body.email.toLowerCase() });
  // seeing if account does not exist
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: `${req.body.email} does not exist` });
  }

  const validPass = await bcrypt.compareSync(req.body.password, user.password);
  console.log(validPass, req.body.password, user.password);
  if (validPass) {
    const token = await jwt.sign(
      {
        email: user.email,
        _id: user._id,
        date: user.date,
      },
      process.env.JWT_SECRET || "IAMSCRIECTfsdafsdafsdafsd"
      // {
      //   expiresIn: "24h",
      // }
    );
    res.header("Authorization", token);
    return res.status(200).json({
      success: true,
      data: {
        email: user.email,
        _id: user._id,
        date: user.date,
        settings: user.settings,
        token: token,
      },
    });
  } else {
    res.status(401).json({
      message:
        "The account email or password that you have entered is incorrect.",
      success: false,
    });
  }
};

//==================================GET user route=====================================================
exports.GETUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      _id: req.params.id,
    });

    res.json({
      user,
      message: "Found User",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "could not find that user",
    });
  }
};

//==================================GETall user route=====================================================

exports.GETAllUsers = async (req, res) => {
  const users = await UserModel.find();
  res.json({
    users,
    message: "All users",
    success: true,
  });
};
//==================================test proected route=====================================================
exports.getUserinfo = async (req, res, next) => {
  res
    .status(200)
    .send("this is user info, you have used your token the right way :)");
};
