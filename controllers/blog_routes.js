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
    title: req.body.title,
    text: req.body.text,
    userId: req.session.user_id,
  });

  res.redirect("/dashboard");
});

router.put('/edit/:id', async (req, res) => {
  // update a blog by its `id` value
  const blogId = req.params.id
  const {title, text} = req.body
  const updatedBlog = await Blog.update({title, text},{
    where: {
      id: blogId
    }
  })
  res.send(updatedBlog)
});

module.exports = router;

