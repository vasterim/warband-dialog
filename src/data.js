
export const kingdoms = {
  Krallık1: {
    name: "Krallık1",
    members: ["Kral", "Lord1"],
  },
  Krallık2: {
    name: "Krallık2",
    members: ["Lord2"],
  },
};

export const characters = {
  Kahraman: {
    name: "vaster",
    money: 5000,
    inventory: [],
    troopCount: 150,
    rank: "",
    kingdom: "",
    relations: {
      Kral: 100,
      Lord1: 5,
      Lord2: 3,
    },
  },
  Kral: {
    name: "Kral",
    money: 500,
    inventory: ["Taç"],
    troopCount: 151,
    rank: "Kral",
    kingdom: "Krallık1",
    relations: {
      Kahraman: 100,
      Lord1: 7,
      Lord2: 5,
    },
  },
  Lord1: {
    name: "Lord1",
    money: 200,
    inventory: ["Kılıç"],
    troopCount: 20,
    rank: "Lord",
    kingdom: "Krallık1",
    relations: {
      Kahraman: 5,
      Kral: 7,
      Lord2: 4,
    },
  },
  Lord2: {
    name: "Lord2",
    money: 150,
    inventory: ["Kalkan"],
    troopCount: 18,
    rank: "Lord",
    kingdom: "Krallık2",
    relations: {
      Kahraman: 3,
      Kral: 5,
      Lord1: 4,
    },
  },
};

export const dialogs = [
  {
    id: 1,
    owner: "Kral",
    text: "Evet, ne vardı?",
    choices: [
      { text: `Merhaba efendim! Ben ${characters.Kahraman.name}`, next: 2},
      { text: "Hayır, özür dilerim.", next: 3 },
      { text: "Efendim, ben sizin lordunuz olmak istiyorum.", next: 7},
      { text: "Birliğimle sana saldırırım!", next: 4, condition: (char) => char.troopCount >= 20 },
    ],
  },
  {
    id: 2,
    owner: "Kral",
    text: `Memnun oldum ${characters.Kahraman.name}, senin için ne yapabilirim?`,
    choices: [],
  },
  {
    id: 3,
    owner: "Kral",
    text: "Üzgünüm, belki başka bir zaman.",
    choices: [],
  },
  {
    id: 4,
    owner: "Kral",
    text: "Birliğin güçlü gözüküyor. Bana saldırmayı göze alıyorsun.",
    choices: [
      { text: "Evet, saldırıyorum!", next: 5, task: "Kral Saldırısı", onChoice: handleBattle },
      { text: "Hayır, vazgeçtim.", next: 6 },
    ],
  },
  {
    id: 5,
    owner: "Kral",
    text: "Cesaretin takdire şayan, fakat bu savaş kanlı olacak.",
    choices: [],
  },
  {
    id: 6,
    owner: "Kral",
    text: "Akıllıca bir karar, kahraman. Beni kızdırma.",
    choices: [],
  },
  {
    id: 7,
    owner: "Kral",
    text: "Senin gibi cesur bir savaşçıyı lord olarak kabul etmek isterim. Yemin eder misin?",
    choices: [
      { text: "Evet, yemin ederim!", next: 8, onChoice: handleOath },
      { text: "Hayır, istemiyorum.", next: 9 },
    ],
  },
  {
    id: 8,
    owner: "Kral",
    text: "Harika! Artık bir lordsun.",
    choices: [],
  },
  {
    id: 9,
    owner: "Kral",
    text: "Üzgünüm, belki başka bir zaman.",
    choices: [],
  },
];

function handleBattle(char, target) {
  const charTroopCount = char.troopCount;
  const targetTroopCount = target.troopCount;
  
  char.troopCount -= targetTroopCount;
  target.troopCount -= charTroopCount;

  if (char.troopCount > 0 && target.troopCount <= 0) {
    char.money += target.money;
    target.money = 0;
    target.relations[char.name] = -1;
  } else if (target.troopCount > 0 && char.troopCount <= 0) {
    target.money += char.money;
    char.money = 0;
    char.relations[target.name] = -1;
  } else {
    // İki taraf da yok olursa
    char.troopCount = 0;
    target.troopCount = 0;
  }
}

function handleOath(char, target) {
  char.rank = "Lord";
  char.kingdom = target.kingdom;
  if (!kingdoms[target.kingdom].members.includes(char.name)) {
    kingdoms[target.kingdom].members.push(char.name);
  }
}
