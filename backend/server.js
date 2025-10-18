// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// 允许跨域请求 - 改进配置
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 明确允许的方法
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 解析 JSON 请求
app.use(express.json());

// MongoDB 连接
mongoose.connect('mongodb://localhost:27017/projectDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// 项目数据的 Mongoose 模型
const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  link: String
});
const Project = mongoose.model('Project', projectSchema);

// 获取所有项目
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send('Error fetching projects');
  }
});

// 添加新项目
app.post('/projects', async (req, res) => {
  try {
    const { name, description, link } = req.body;
    console.log('Received POST request at /projects');
    console.log('Received data:', { name, description, link });

    const newProject = new Project({ name, description, link });
    await newProject.save();

    console.log('Project added successfully:', newProject);
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error adding project:', err);
    res.status(500).send('Error adding project');
  }
});

// 添加这个缺失的 PUT 路由 - 更新项目
app.put('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, link } = req.body;
    
    console.log('Received PUT request at /projects/' + id);
    console.log('Update data:', { name, description, link });

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, description, link },
      { new: true } // 返回更新后的文档
    );

    if (!updatedProject) {
      return res.status(404).send('Project not found');
    }

    console.log('Project updated successfully:', updatedProject);
    res.json(updatedProject);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).send('Error updating project');
  }
});

// 删除项目
app.delete('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).send('Project deleted');
  } catch (err) {
    res.status(500).send('Error deleting project');
  }
});

// 启动服务器
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});