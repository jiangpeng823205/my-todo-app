import React from 'react';
import './App.css'; // 确保你已经有一个自定义样式文件

function App() {
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
        <h2>My Projects</h2>
        <ul>
          <li>Project 1: Todo App</li>
          <li>Project 2: Portfolio Website</li>
          <li>Project 3: E-commerce Site</li>
        </ul>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 My React Portfolio</p>
      </footer>
    </div>
  );
}

export default App;
