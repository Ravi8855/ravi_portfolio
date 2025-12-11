// server/controllers/project.controller.js
const Project = require("../models/Project"); // path depends on your structure
const cloudinary = require("../cloudinary");

async function uploadBufferToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });
}

exports.getAll = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json({ projects });
};

exports.getOne = async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json({ project });
};

exports.create = async (req, res) => {
  try {
    const { title, description, stack, url, repo } = req.body;
    const project = new Project({
      title,
      description,
      stack: stack ? stack.toString().split(",").map(s => s.trim()) : [],
      url,
      repo,
    });

    if (req.file && req.file.buffer) {
      const result = await uploadBufferToCloudinary(req.file.buffer, process.env.CLOUDINARY_FOLDER || "portfolio");
      project.image = result.secure_url;
    }
    await project.save();
    res.status(201).json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create failed" });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, description, stack, url, repo } = req.body;
    const update = {
      title, description,
      stack: stack ? stack.toString().split(",").map(s => s.trim()) : [],
      url, repo
    };

    if (req.file && req.file.buffer) {
      const result = await uploadBufferToCloudinary(req.file.buffer, process.env.CLOUDINARY_FOLDER || "portfolio");
      update.image = result.secure_url;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};

exports.remove = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
