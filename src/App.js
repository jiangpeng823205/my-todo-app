import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

// 移除了 Modal 和未使用的 Admin 变量，保持代码整洁
// 如果需要图标，可以安装 react-icons，这里暂时只用纯文字

function App() {
  const [projects, setProjects] = useState([]);
  
  // 生产环境判断
  const isProduction = window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1';

  useEffect(() => {
    // 简历中的亮点项目数据 (Hardcoded for Production)
    const resumeProjects = [
      {
        _id: 'p1',
        name: 'Biomedical Knowledge Graph System',
        description: 'Built a scalable pipeline processing 50,000+ medical records using Neo4j. Developed data cleaning and annotation workflows for clinical literature.',
        link: 'https://github.com/jiangpeng823205', 
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

    // 在生产环境直接使用静态数据，保证速度和稳定性
    if (isProduction) {
      setProjects(resumeProjects);
    } else {
      // 在本地开发环境尝试连接后端
      axios.get('http://localhost:5001/projects')
        .then(response => {
          if(response.data.length === 0) {
             setProjects(resumeProjects);
          } else {
             setProjects(response.data);
          }
        })
        .catch(err => {
          console.log('Backend not connected, using static data.');
          setProjects(resumeProjects);
        });
    }
  }, [isProduction]);

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
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer>
        <p>&copy; 2025 Peng Jiang. Built with React & Node.js.</p>
      </footer>
    </div>
  );
}

export default App;