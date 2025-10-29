import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function App() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // 修复：添加 isProduction 定义
  const isProduction = window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1';

  

  // 获取所有项目
  useEffect(() => {
    console.log('Current environment:', isProduction ? 'Production' : 'Development');
    
    // 硬编码的示例项目
  const exampleProjects = [
    {
      _id: '1',
      name: 'JP_LinkedIn',
      description: 'This is my LinkedIn account, which contains all my personal information. By clicking on the link, you will come to kown me more.',
      link: 'https://www.linkedin.com/in/jp823205'
    },
    {
      _id: '2', 
      name: 'JP_GitHub',
      description: 'This is my GitHub account, which contains most of my projects. By clicking on the link, you could visit my GitHub.',
      link: 'https://github.com/jiangpeng823205'
    },
    {
      _id: '3',
      name: 'JP_my-todo-app',
      description: `This full-stack project is built with the MERN stack:
- Frontend: React with Hooks, Axios for API calls
- Backend: Node.js, Express, MongoDB with Mongoose
- Features: RESTful APIs, responsive design, CRUD operations
- Deployment: Netlify for frontend, local development setup`,
      link: 'https://jiangpeng823205.netlify.app/'
    }
  ];

    if (isProduction) {
      // 生产环境：直接使用示例项目
      console.log('Setting example projects');
      setProjects(exampleProjects);
    } else {
      // 开发环境：尝试使用 API，失败时使用示例数据
      axios.get('http://localhost:5001/projects')
        .then(response => {
          console.log('API response received:', response.data);
          setProjects(response.data);
        })
        .catch(err => {
          console.error('API failed, using example projects:', err);
          setProjects(exampleProjects);
        });
    }
  }, [isProduction]);

  // 打开模态框
  const openModal = (index = null) => {
    if (isProduction) {
      alert('项目编辑功能需要在本地开发环境中使用。');
      return;
    }
    
    setIsModalOpen(true);
    if (index !== null) {
      const project = projects[index];
      setProjectName(project.name);
      setProjectDescription(project.description);
      setProjectLink(project.link);
      setEditingIndex(index);
    } else {
      setProjectName('');
      setProjectDescription('');
      setProjectLink('');
      setEditingIndex(null);
    }
  };

  // 关闭模态框
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 添加或更新项目
  const handleAddOrUpdateProject = () => {
    if (isProduction) {
      alert('添加项目功能需要在本地开发环境中使用。');
      closeModal();
      return;
    }

    if (projectName && projectDescription && projectLink) {
      const newProject = { name: projectName, description: projectDescription, link: projectLink };

      if (editingIndex === null) {
        axios.post('http://localhost:5001/projects', newProject)
          .then(response => {
            setProjects([...projects, response.data]);
          })
          .catch(err => {
            console.error('Error adding project:', err);
          });
      } else {
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
    if (isProduction) {
      alert('删除项目功能需要在本地开发环境中使用。');
      return;
    }

    const projectId = projects[index]._id;
    axios.delete(`http://localhost:5001/projects/${projectId}`)
      .then(() => {
        setProjects(projects.filter((_, i) => i !== index));
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

      <section id="home">
        <h2>Home</h2>
        <p>This is my React project, where I showcase my skills and projects.</p>
      </section>

      <section id="about">
        <h2>About Me</h2>
        <p>I'm a passionate web developer, focusing on React, JavaScript, and web design.</p>
      </section>

      <section id="projects">
        <div className="projects-header">
          <h2>My Projects</h2>
          {!isProduction && (
            <button className="add-project-btn" onClick={() => openModal()}>
              Add Project
            </button>
          )}
        </div>

        <div className="projects-list">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div className="project-tile" key={project._id || index}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
                {!isProduction && (
                  <div>
                    <button className="edit-project-btn" onClick={() => openModal(index)}>
                      Edit
                    </button>
                    <button className="delete-project-btn" onClick={() => handleDeleteProject(index)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No projects to display</p>
          )}
        </div>
      </section>

      <footer>
        <p>&copy; 2025 My React Portfolio</p>
      </footer>

      {!isProduction && (
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
      )}
    </div>
  );
}

export default App;