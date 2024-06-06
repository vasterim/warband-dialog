

import React from 'react';

const Character = ({ character }) => {
  return (
    <div>
      <h3>Karakter Bilgileri</h3>
      <p>Adı: {character.name}</p>
      <p>Parası: {character.money}</p>
      <p>Envanter: {character.inventory.join(', ') || "Boş"}</p>
      <p>Birim Sayısı: {character.troopCount}</p>
      <p>Rütbesi: {character.rank}</p>
      <p>Krallık: {character.kingdom}</p>
      <p>İlişkiler:</p>
      <ul>
        {Object.entries(character.relations).map(([name, relation], index) => (
          <li key={index}>{name}: {relation}</li>
        ))}
      </ul>
    </div>
  );
};

export default Character;
