const path = require("path");
const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");
const passport = require("../middleware/passport");

router.get("/", homeController.getHomePage);

router.get("/about", homeController.getAboutPage);

router.get("/signup", homeController.getSignUpPage);

router.post("/signup", (req, res, next) => {
    //Реализуйте здесь валидацию данных отправленных с формы.
    next();
}, homeController.signup);


router.get("/login", homeController.getLoginPage);

router.post("/login", (req, res, next) => {
    //Реализуйте здесь валидацию данных отправленных с формы.
    next();
}, passport.authenticate("local"), homeController.login);

module.exports = router;
