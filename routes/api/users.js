const express = require("express");
const { authenticate } = require("../../middlewares");
const { upload } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers");

const router = express.Router();

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
module.exports = router;
