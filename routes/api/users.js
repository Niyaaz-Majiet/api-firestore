const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var firebase = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://test-50191.firebaseio.com"
});

//@route POST api/users
//@desc Register User to firebase
//@access public

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //if their are errors
        return res.status(400).json({ errors: errors.array() });
      }
      console.log(req.body);
      //Encrypt the password
      const salt = await bcrypt.genSalt(10);
      const passwordEnc = await bcrypt.hash(req.body.password, salt); //creates a hash

      let data = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        password: passwordEnc,
        avatarUrl:
          "//www.gravatar.com/avatar/7c3757fa42aae688de7244aadfdf5110?s=200&r=pg&d=mm"
      };

      let doc = await firebase
        .firestore()
        .collection("users")
        .doc(req.body.uid)
        .set(data);
      data.uid = req.body.uid;
      res.status(200).json(data);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
