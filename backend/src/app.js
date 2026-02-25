const express = require("express");
const multer = require("multer");
const uploadImage = require("../src/Services/Storage.service");
const postModel = require("../src/models/Post.model");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
});

// ================= CREATE POST =================
app.post("/CreatePost", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const result = await uploadImage(req.file.buffer);

    const post = await postModel.create({
      Image: result.url,
      Caption: req.body.caption || "",
      Likes: 0,
      Liked: false,
    });

    return res.status(201).json({
      message: "Post Created",
      post: post
    });
  } catch (err) {
    console.log("CreatePost Error:", err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// ================= GET POSTS =================
app.get("/GetPosts", async (req, res) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Posts Fetched",
      posts: posts,
    });
  } catch (err) {
    console.log("GetPosts Error:", err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// ================= LIKE POST =================
app.put("/LikePost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { liked } = req.body;

    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Toggle Like Logic
    if (liked) {
      if (!post.Liked) {
        post.Likes += 1;
        post.Liked = true;
      }
    } else {
      if (post.Liked) {
        post.Likes = Math.max(0, post.Likes - 1);
        post.Liked = false;
      }
    }

    await post.save();

    return res.status(200).json({
      message: "Post Updated",
      post: post,
    });
  } catch (err) {
    console.log("LikePost Error:", err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = app;
