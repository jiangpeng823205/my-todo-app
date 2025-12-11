import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from 'react-modal';
import axios from 'axios';

// 确保图标库等已安装，或者这里我们尽量用纯文字/Emoji代替以减少依赖
// 建议安装: npm install react-icons (可选，这里先用纯CSS)

Modal.setAppElement('#root');

function App() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Admin states
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const isProduction = window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1';

  useEffect(() => {
    // 简历中的亮点项目数据
    // 注意：我们将 BioBERT 和 Knowledge Graph 也作为项目展示，这在新加坡找 AI/Data 工作很重要
    const resumeProjects = [
      {
        _id: 'p1',
        name: 'Biomedical Knowledge Graph System',
        description: 'Built a scalable pipeline processing 50,000+ medical records using Neo4j. Developed data cleaning and annotation workflows for clinical literature.',
        link: 'https://github.com/jiangpeng823205', // 建议链接到具体 repo
        tags: ['Neo4j', 'Python', 'Data Engineering']
      },
      {
        _id: 'p2',
        name: 'BioBERT Relation Extraction Model',
        description: 'Fine-tuned BioBERT models achieving an F1 score of 85%. Applied model distillation for lightweight deployment and improved baseline performance by 15%.',
        link: 'https://github.com/jiangpeng823205',
        tags: ['PyTorch', 'NLP', 'Transformers']
      },
      {
        _id: 'p3',
        name: 'Full-Stack MERN Portfolio',
        description: 'A responsive web application featuring RESTful APIs and CRUD operations. \nFrontend: React (Hooks), Axios.\nBackend: Node.js, Express, MongoDB.',
        link: 'https://jiangpeng823205.netlify.app/',
        tags: ['React', 'Node.js', 'MongoDB']
      }
    ];

    if (isProduction) {
      setProjects(resumeProjects);
    } else {
      axios.get('http://localhost:5001/projects')
        .then(response => {
          // 如果数据库是空的，或者为了测试方便，也可以合并显示
          if(response.data.length === 0) {
             setProjects(resumeProjects);
          } else {
             setProjects(response.data);
          }
        })
        .catch(err => {
          console.error('API failed, using resume projects:', err);
          setProjects(resumeProjects);
        });
    }
  }, [isProduction]);

  // ... (保留 openModal, closeModal, handleAddOrUpdateProject, handleDeleteProject 逻辑不变)
  // 为了节省篇幅，这里假设你保留了原有的 Admin 函数逻辑
  const openModal = (index = null) => { setIsModalOpen(true); /* ...你的逻辑 */ };
  const closeModal = () => { setIsModalOpen(false); };
  const handleAddOrUpdateProject = () => { /* ...你的逻辑 */ closeModal(); };
  const handleDeleteProject = (index) => { /* ...你的逻辑 */ };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>PENG JIANG</h1>
          <p className="subtitle">AI & NLP Engineer | Full-Stack Developer</p>
          <div className="contact-info">
            <a href="mailto:jpyy823205@gmail.com">Email</a> | 
            <a href="https://linkedin.com/in/jp823205" target="_blank" rel="noreferrer">LinkedIn</a> | 
            <a href="https://github.com/jiangpeng823205" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </header>

      <nav className="sticky-nav">
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
        </ul>
      </nav>

      <div className="container">
        <section id="about">
          <h2>About Me</h2>
          <div className="content-card">
            <p>
              Biomedical Information Engineering graduate with strong software engineering fundamentals. 
              Proven track record of building scalable data pipelines processing <strong>50,000+ medical records</strong> and fine-tuning <strong>BioBERT models</strong> (F1 score 85%). 
              Experienced in developing production-ready full-stack web applications using the <strong>MERN stack</strong>.
            </p>
          </div>
        </section>

        <section id="skills">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>AI / NLP</h3>
              <p>PyTorch, Transformers, BioBERT, Knowledge Distillation</p>
            </div>
            <div className="skill-category">
              <h3>Full Stack</h3>
              <p>React (Hooks), Node.js, Express, MongoDB, MySQL</p>
            </div>
            <div className="skill-category">
              <h3>Tools</h3>
              <p>Git, Docker, Linux, Neo4j, Netlify CI/CD</p>
            </div>
          </div>
        </section>

        <section id="experience">
           <h2>Experience</h2>
           <div className="timeline">
              <div className="timeline-item">
                <h3>Research Assistant</h3>
                <span className="date">Anhui Medical University | Jul 2025 – Present</span>
                <ul>
                  <li>Built biomedical knowledge graphs using Neo4j.</li>
                  <li>Developed cleaning pipelines for 50,000+ medical records.</li>
                  <li>Explored LLM-based healthcare use cases.</li>
                </ul>
              </div>
              <div className="timeline-item">
                <h3>Research Intern (NLP)</h3>
                <span className="date">AHMU | Sep 2024 – Jun 2025</span>
                <ul>
                  <li>Improved BioBERT baseline by 15% via relation extraction models.</li>
                  <li>Built preprocessing pipelines with Pandas/NumPy.</li>
                </ul>
              </div>
           </div>
        </section>

        <section id="projects">
          <div className="projects-header">
            <h2>Featured Projects</h2>
            {!isProduction && (
              <button className="add-project-btn" onClick={() => openModal()}>+ Add (Dev Only)</button>
            )}
          </div>

          <div className="projects-list">
            {projects.map((project, index) => (
              <div className="project-tile" key={project._id || index}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                {project.tags && (
                  <div className="tags">
                    {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                )}
                <div className="project-links">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-btn">
                    View Project / Code
                  </a>
                  {!isProduction && (
                    <div className="admin-controls">
                       {/* 你的编辑/删除按钮逻辑 */}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer>
        <p>&copy; 2025 Peng Jiang. Built with React & Node.js.</p>
      </footer>
      
      {/* Modal 逻辑保持不变 */}
      {!isProduction && (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal-content" overlayClassName="modal-overlay">
           {/* ...你的 Modal 内容 ... */}
           <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
}

export default App;