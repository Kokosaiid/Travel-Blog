import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public")); // serve public folder
app.set("view engine", "ejs");

// In-memory posts
let posts = [
  {
    id: Date.now(),
    title: "Exploring Paris",
    content:
      "The Eiffel Tower at sunset is breathtaking, and wandering through Montmartre feels like stepping into a painting.",
  },
  {
    id: Date.now() + 1,
    title: "Backpacking in Japan",
    content:
      "From the bustling streets of Tokyo to the peaceful temples of Kyoto, Japan is a perfect blend of tradition and innovation.",
  },
];

// Routes
app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  posts.unshift({ id: Date.now(), title, content });
  res.redirect("/");
});

app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  res.render("edit", { post });
});

app.put("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect("/");
});

app.delete("/posts/:id", (req, res) => {
  posts = posts.filter((p) => p.id != req.params.id);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`🌍 Travel Blog running at http://localhost:${PORT}`);
});
