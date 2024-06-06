

import React, { useState } from 'react';

const Dialog = ({ dialogs, characters, currentCharacter, setCharacter }) => {
  const [currentDialogId, setCurrentDialogId] = useState(1);

  const handleChoiceClick = (choice) => {
    const targetCharacter = characters[currentDialog.owner];
    if (choice.task) {
      console.log("Görev eklendi: " + choice.task);
    }
    if (choice.onChoice) {
      choice.onChoice(currentCharacter, targetCharacter);
      setCharacter({ ...currentCharacter }); // Karakteri güncelle
    }
    setCurrentDialogId(choice.next);
  };

  const currentDialog = dialogs.find(dialog => dialog.id === currentDialogId);
  const availableChoices = currentDialog.choices.filter(choice => !choice.condition || choice.condition(currentCharacter));

  return (
    <div>
      <h2>{currentDialog.owner}</h2>
      <p>{currentDialog.text}</p>
      <div>
        {availableChoices.map((choice, index) => (
          <button key={index} onClick={() => handleChoiceClick(choice)}>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dialog;
