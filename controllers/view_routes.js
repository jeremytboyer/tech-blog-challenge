const router = require("express").Router();
const User = require("../models/User");
const Blog = require("../models/Blog");

function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;

  if (!isAuthenticated) return res.redirect("/login");

  next();
}

// Show Homepage
router.get("/", async (req, res) => {
  let blogs = await Blog.findAll({
    include: User,
  });

  blogs = blogs.map((t) => t.get({ plain: true }));

  res.render("index", {
    isHome: true,
    isLoggedIn: req.session.user_id,
    blogs: blogs,
  });
});

// Show Login Page
router.get("/login", (req, res) => {
  if (req.session.user_id) return res.redirect("/dashboard");

  res.render("login", {
    isLogin: true,
  });
});

// Show Register Page
router.get("/register", (req, res) => {
  if (req.session.user_id) return res.redirect("/dashboard");

  res.render("register", {
    isRegister: true,
  });
});

// Show Dashboard Page
router.get("/dashboard", isAuthenticated, async (req, res) => {
  const user = await User.findByPk(req.session.user_id, {
    include: Blog,
  });
  const blogs = user.Blogs.map((t) => t.get({ plain: true }));

  console.log(blogs);
  // The user IS logged in
  res.render("dashboard", {
    id: user.id,
    email: user.email,
    blogs: blogs,
  });
});

//Show login page
router.get("/login", (req, res) => {
  if (req.session.user_id) return res.redirect("/dashboard");

  res.render("login", {
    isLogin: true,
  });
});

// Show edit page
router.get('/edit/:id', isAuthenticated, async (req, res) => {
  const blogId = req.params.id
  const blog = await Blog.findByPk(blogId)

  const blogData = {
    blogId: blogId,
    title: blog.title,
    text: blog.text,
  }

  res.render('edit', {
    blog: blogData
  })
})

module.exports = router;
