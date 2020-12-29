const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')



let dexterity = document.querySelector("#dexterity");
let charisma = document.querySelector("#charisma");
let perception = document.querySelector("#perception");
let bouton = document.querySelector("button[type=button]");
let health = document.getElementById("health");

let state = { ring: true, hp: 10, dex: 0, cha: 0, per: 0 };

bouton.addEventListener("click", function () {
  state.dex = parseInt(dexterity.value);
  state.per = parseInt(perception.value);
  state.cha = parseInt(charisma.value);
  if((state.dex + state.per + state.cha)== 6 ){
    
    startGame()
    document.querySelector("#creation").style.display = "none";
    document.querySelector(".hidden").style.display = "block";
  }else{
    document.querySelector("#creation").style.display = "none";
    document.querySelector(".hidden").style.display = "block";
    textElement.innerText="Mauvaise combinaison de stats"
  }
});



function startGame() {
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
      console.log(state);
    }
  })
}

function showOption(option) {
  return option.required == null || option.required(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0  ) {
     return startGame()
   
   
  }
  state = Object.assign(state, option.setState)
  if (option.setHp) { state.hp = state.hp + option.setHp }
  showTextNode(nextTextNodeId)
  health.innerText = "Hit Points: " + state.hp;
}

const textNodes = [
  {
    id: 1,
    text: "You wake up on an empty creepy beach at night. It is cold and you are surrended by fog. You still have some money and you find a weird ring with a skull and tentacles. You can see a lighthouse far away. Several ways to go are in front of you: ",
    options: [
      {
        text: "Go on the left path",
        setState: { ring: true },
        nextText: 2
      },
      {
        text: "Go on the right path",
        setState: { ring: true },
        nextText: 3
      },
      {
        text: "You manage to see a hidden path in the middle",
        required: (current) => current.per >= 2,
        setState: { ring: true},
        nextText: 4
      }
    ]
  },
  {
    id: 2,
    text: "You see someone who looks ready to sell some goods. He refuses to answer questions and when you show him your money, he answers he does not accept this currency. ",
    options: [
      {
        text: "Buy sword in exchange for some of your blood",
        required: (current) => !current.sword,
        setState: { sword: true },
        setHp: - 2,
        nextText: 2
      },
      {
        text: "Buy lantern in exchange for some of your blood",
        required: (current) => !current.lantern,
        setHp: - 2,
        setState: { lantern: true },
        nextText: 2
      },
      {
        text: "You manage to convince him to buy your ring",
        required: (current) => { return current.cha >= 2 && current.ring },
        setHp: +4,
        setState: { ring: false },
        nextText: 2
      },
      {
        text: "You decide to continue your way",
        nextText: 5
      }
    ]
  },
  {
    id: 3,
    text: "You see a weird statuette, that look like nothing you know.  It seems valuable, but a strange hostile shape appears in the fog. ",
    options: [
      {
        text: "Run Away",
        nextText: 5
      },
      {
        text: "Grab the statuette by running straight forward ",
        setHp: - 4,
        setState: { statuette: true },
        nextText: 5
      },
      {
        text: "Be stealthy and grab the statuette",
        required: (current) => current.dex >= 2,
        setState: { statuette: true },
        nextText: 5
      }
    ]
  },
  {
    id: 4,
    text: "A light appears in the fog, it asks if you are the champion that will defeat darkness",
    options: [
      {
        text: "You are not",
        nextText: 5
      },
      {
        text: "You are, and a tatoo appears on your hand",
        setState: { tatoo: true },
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: "You are in front of a gloomy village. There is a mine with a sea like smell on the right and an old church on the left. ",
    options: [
      {
        text: "Go in the church",
        nextText: 8
      },
      {
        text: "Go in the village ",
        nextText: 6
      },
      {
        text: "Go in the mine",
        nextText: 7
      }
    ]
  },
  {
    id: 6,
    text: "The village is now filled with the former citizens. They look like zombies that spent too much time in salt water. ",
    options: [
      {
        text: "Try to escape and go back",
        setHp: - 3,
        nextText: 5
      },
      {
        text: " Run across the zombies to go on the other side",
        setHp: - 6,
        nextText: 9
      },
      {
        text: "Use your sword and fight!",
        required: (current) => current.sword,
        nextText: 9
      }
    ]
  },
  {
    id: 7,
    text: "You advance in the mine but you can't see anything in the darkness",
    options: [
      {
        text: "Try to blindly go back",
        setHp: - 3,
        nextText: 5
      },
      {
        text: "Advance further in the dark tunnel with sharp rocks",
        setHp: - 6,
        nextText: 10
      },
      {
        text: "Use your lantern to defeat the darkness",
        required: (current) => current.lantern,
        nextText: 10
      }
    ]
  },
  {
    id: 8,
    text: "You enter in a church. Two priests with crazy eyes are now blocking the door but let you advance further. You see a mechanism on the altar ",
    options: [
      {
        text: "Try to escape the priests and go back",
        setHp: - 3,
        nextText: 5
      },
      {
        text: "Play with the mechanism that is trapped but clearly open a passage",
        setHp: - 6,
        nextText: 11
      },
      {
        text: "The statuette fits perfectly on the altar and opens a passage",
        required: (current) => current.statuette,
        nextText: 11
      }
    ]
  },
  {
    id: 9,
    text: "A way or an other you managed to go on the other side and find the lighthouse. Down the cliff you can see an old temple with boats. Probably your way out",
    options: [
      {
        text: "Climb down....aouch...",
        setHp: - 6,
        required: (current) => current.hp >0,
       
        nextText: 12
      },
      {
        text: "You are so dextrous, this climb is not a problem for you.",
        required: (current) =>{ return current.dex == 3 && current.hp >0 },
        nextText: 12
      },
      {
        text: "You are dead...",
        
        required: (current) => current.hp <=0,
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: "You are about to get out of the mine further  you can see an old temple with boats. Probably your way out",
    options: [
      {
        text: "Unfortunatly you don't see the rocks falling on you on your way out. Painfull",
        setHp: - 6,
        required: (current) => current.hp >0,
        nextText: 12
      },
      {
        text: "You are pretty perceptive and manage to dodge the rocks.",
        required: (current) =>{ return current.per == 3 && current.hp >0 } ,
        nextText: 12
      },
      {
        text: "You are dead...",
        
        required: (current) => current.hp <=0,
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: "You are out of the church. An old priest with an arm looking like a tentacle is between you and an old temple with boats. Probably your way out ",
    options: [
      {
        text: "You try to talk with him but he attacks.",
        setHp: - 6,
        required: (current) => current.hp >0,
        nextText: 12
      },
      {
        text: "You are so eloquent even that abomination let you go.",
        required: (current) =>{ return current.cha == 3 && current.hp >0 },
        nextText: 12
      },
      {
        text: "You are dead...",
        
        required: (current) => current.hp <=0,
        nextText: -1
      }
    ]
  },
  {
    id: 12,
    text: "You are inside the temple. A few priests look at you and ask for a sacrifice. ",
    options: [
      {
        text: "When they see your ring, they offer to accept you as one of them.",
        required: (current) => { return current.ring && current.hp >0 },
        nextText: 14
      },
      {
        text: "You decide to fight!",
        setHp: - 11,
        required: (current) => current.hp >0,
        nextText: 13
      },
      {
        text: "You accept to give your blood",
        setHp: - 11,
        required: (current) => current.hp >0,
        nextText: 14
      },
      {
        text: "The tatoo on your hand shines. As a true champion of light you smite the priests.",
        required: (current) =>{ return current.tatoo && current.hp >0 },
        nextText: 13
      },
      {
        text: "You are dead...",
        
        required: (current) => current.hp <=0,
        nextText: -1
      }
    ]
  },
  {
    id: 14,
    text: "",
    options: [
      {
        text: "You are like the many before you, an eternal resident of the island and a member of the cult. But well done, you are still alive.",
        required: (current) => current.hp >0,
        nextText: -1
      },
      {
        text: "You are dead...",
        
        required: (current) => current.hp <=0,
        nextText: -1
      }

    ]
  },
  {
    id: 13,
    text: "",
    options: [
      {
        text: "You are the first one in ages that manages to defeat the cult and escape!",
        required: (current) => current.hp >0,
        nextText: -1
      },
      {
        text: "You are dead...",
        
        required: (current) => current.hp <=0,
        nextText: -1
      }

    ]
  }]