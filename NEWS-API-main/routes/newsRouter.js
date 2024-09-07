const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");
// Import controller functions
const newsController = require("../controllers/newsController");

// Define routes using .route() and controller functions

router.post("/login", authController.login); // Login route to authenticate users

router.post("/sendEmail", newsController.sendEmail); // Login route to authenticate users
// Public route
router.route("/search/:search").get(newsController.getSearchItems);
router.route("/categoriesNews").get(newsController.getFormatedCategories);
router.route("/ALLcategories").get(newsController.getAllCategories);
// Protected routes
router
  .route("/")
  .get(newsController.getAllItems)
  .post(authenticateToken, newsController.uploadMedia, newsController.postItem);
router
  .route("/:id")
  .get(newsController.getItemById)
  .patch(
    authenticateToken,
    newsController.uploadMedia,
    newsController.updateItemById
  )
  .delete(authenticateToken, newsController.deleteItemById);

module.exports = router;
