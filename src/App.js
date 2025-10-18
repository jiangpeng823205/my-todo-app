import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from 'react-modal'; // 导入 react-modal
import axios from 'axios'; // 导入 Axios

Modal.setAppElement('#root'); // 设置 Modal 的 root 元素

function App() {
  const [projects, setProjects] = useState([]); // 初始为空项目列表
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); // 用来追踪编辑哪个项目

  // 获取所有项目
  useEffect(() => {
    axios.get('http://localhost:5001/projects')
      .then(response => {
        setProjects(response.data); // 从后端获取数据
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
      });
  }, []);

  // 打开模态框
  const openModal = (index = null) => {
    setIsModalOpen(true);
    if (index !== null) {
      const project = projects[index];
      setProjectName(project.name);
      setProjectDescription(project.description);
      setProjectLink(project.link);
      setEditingIndex(index); // 记录正在编辑的项目
    } else {
      setProjectName('');
      setProjectDescription('');
      setProjectLink('');
      setEditingIndex(null); // 如果是新添加项目，清空编辑状态
    }
  };

  // 关闭模态框
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 添加或更新项目
  const handleAddOrUpdateProject = () => {
  if (projectName && projectDescription && projectLink) {
    const newProject = { name: projectName, description: projectDescription, link: projectLink };

    if (editingIndex === null) {
      // 添加新项目
      axios.post('http://localhost:5001/projects', newProject)
        .then(response => {
          console.log('Project added:', response.data); // 检查返回的数据
          setProjects([...projects, response.data]); // 更新项目列表
        })
        .catch(err => {
          console.error('Error adding project:', err);
        });
    } else {
      // 更新现有项目
      const projectId = projects[editingIndex]._id;
      const updatedProject = { ...projects[editingIndex], ...newProject };

      axios.put(`http://localhost:5001/projects/${projectId}`, updatedProject)
        .then(response => {
          const updatedProjects = [...projects];
          updatedProjects[editingIndex] = response.data;
          setProjects(updatedProjects);
        })
        .catch(err => {
          console.error('Error updating project:', err);
        });
    }

    setProjectName('');
    setProjectDescription('');
    setProjectLink('');
    closeModal();
  }
};


  // 删除项目
  const handleDeleteProject = (index) => {
    const projectId = projects[index]._id;

    axios.delete(`http://localhost:5001/projects/${projectId}`)
      .then(() => {
        setProjects(projects.filter((_, i) => i !== index)); // 删除项目
      })
      .catch(err => {
        console.error('Error deleting project:', err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React Project</h1>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
          </ul>
        </nav>
      </header>

      {/* Home Section */}
      <section id="home">
        <h2>Home</h2>
        <p>This is my React project, where I showcase my skills and projects.</p>
      </section>

      {/* About Section */}
      <section id="about">
        <h2>About Me</h2>
        <p>I'm a passionate web developer, focusing on React, JavaScript, and web design.</p>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="projects-header">
          <h2>My Projects</h2>
          <button className="add-project-btn" onClick={() => openModal()}>
            Add Project
          </button>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <div className="project-tile" key={index}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
              <div>
                <button className="edit-project-btn" onClick={() => openModal(index)}>Edit</button>
                <button className="delete-project-btn" onClick={() => handleDeleteProject(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 My React Portfolio</p>
      </footer>

      {/* Modal 弹出框 */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Project"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>{editingIndex !== null ? 'Edit Project' : 'Add New Project'}</h2>
        <div>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
          />
        </div>
        <div>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Project Description"
          ></textarea>
        </div>
        <div>
          <input
            type="text"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
            placeholder="Project Link"
          />
        </div>
        <button onClick={handleAddOrUpdateProject}>
          {editingIndex !== null ? 'Update Project' : 'Add Project'}
        </button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
}

export default App;
