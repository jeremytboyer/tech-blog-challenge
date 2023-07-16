const router = require("express").Router();
const User = require("../models/User");
const Blog = require("../models/Blog");

function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;

  if (!isAuthenticated) return res.redirect("/login");

  next();
}

// Add a thought
router.post("/blog", isAuthenticated, async (req, res) => {
  await Blog.create({
    text: req.body.text,
    userId: req.session.user_id,
  });

  res.redirect("/dashboard");
});

module.exports = router;
