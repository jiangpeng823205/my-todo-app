import React from 'react';
import './App.css'; // 确保你已经有一个自定义样式文件

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Jiang Peng's React Project</h1>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            {/* 添加 GitHub 链接 */}
            <li><a href="https://www.github.com/jiangpeng823205" target="_blank" rel="noopener noreferrer">GitHub</a></li>
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
        <h2>My Projects</h2>
        <div className="project-tile">
          <h3>Project 1</h3>
          <p>A brief description of the project.</p>
          <a href="https://github.com/your-github-profile/project1" target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
        <div className="project-tile">
          <h3>Project 2</h3>
          <p>A brief description of the project.</p>
          <a href="https://github.com/your-github-profile/project2" target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
        <div className="project-tile">
          <h3>Project 3</h3>
          <p>A brief description of the project.</p>
          <a href="https://github.com/your-github-profile/project3" target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 My React Portfolio</p>
      </footer>
    </div>
  );
}

export default App;
