

import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div>
      <h3>Görevler</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
