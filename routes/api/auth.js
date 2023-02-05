const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
