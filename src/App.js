import React, { useState } from 'react';
import './App.css';
import Modal from 'react-modal'; // 导入 react-modal

Modal.setAppElement('#root'); // 设置 Modal 的 root 元素

function App() {
  const [projects, setProjects] = useState([
    { name: "Project 1", description: "A brief description of the project.", link: "https://github.com/your-github-profile/project1" },
    { name: "Project 2", description: "A brief description of the project.", link: "https://github.com/your-github-profile/project2" },
    { name: "Project 3", description: "A brief description of the project.", link: "https://github.com/your-github-profile/project3" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProject = () => {
    if (projectName && projectDescription && projectLink) {
      setProjects([...projects, { name: projectName, description: projectDescription, link: projectLink }]);
      setProjectName('');
      setProjectDescription('');
      setProjectLink('');
      closeModal();
    }
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
          <button className="add-project-btn" onClick={openModal}>
            Add Project
          </button>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <div className="project-tile" key={index}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
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
        <h2>Add New Project</h2>
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
        <button onClick={handleAddProject}>Add Project</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
}

export default App;
