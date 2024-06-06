// src/App.js

import React, { useState } from 'react';
import Dialog from './components/Dialog';
import Character from './components/Character';
import TaskList from './components/TaskList';
import { characters as initialCharacters, dialogs } from './data';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [characters, setCharacters] = useState(initialCharacters);
  const [currentCharacter, setCurrentCharacter] = useState(initialCharacters["Kahraman"]);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <Character character={currentCharacter} />
      <Dialog dialogs={dialogs} characters={characters} currentCharacter={currentCharacter} setCharacter={setCurrentCharacter} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default App;
