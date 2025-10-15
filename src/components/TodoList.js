import React, { useState } from 'react';

function TodoList({ onAddProject }) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');

  const handleAddProject = () => {
    if (projectName && projectDescription && projectLink) {
      onAddProject({ name: projectName, description: projectDescription, link: projectLink });
      setProjectName('');
      setProjectDescription('');
      setProjectLink('');
    }
  };

  return (
    <div className="todo-list">
      <h3>Add New Project</h3>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Project Name"
      />
      <textarea
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        placeholder="Project Description"
      ></textarea>
      <input
        type="text"
        value={projectLink}
        onChange={(e) => setProjectLink(e.target.value)}
        placeholder="Project Link"
      />
      <button onClick={handleAddProject}>Add Project</button>
    </div>
  );
}

export default TodoList;
