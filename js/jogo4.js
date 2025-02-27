const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'AnjosLamentadores',
  'AssassinodoRelógio',
  'Cassandra',
  'Cybermen',
  'Daleks',
  'DoutoreRose',
  'Doutor',
  'EnfermeiraGato',
  'ReinoÁrvore',
  'Slitheen',
  '42',
  'TheImpossiblePlanet',
  'TheLazarusExperiment',
  'SraFoster',
  'DalekEvolution',
  'Doutor2',
  'MarthaJones',
  'Adipose',
  'Donna',
  'Love&Monsters',
  'K9',
  'ManequimVivo',
  'Bruxas',
  'Doomsday',
  'ACriançaVazia',
  'Mickey',
  'NovaTerra',
  'Ood',
  'PeteTyler',
  'VanGogh',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = ''; //tudo verdade
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 60) {
    clearInterval(this.loop);
    setTimeout(() => {
    alert('Parabéns, '+spanPlayer.innerHTML+'! Seu tempo foi de: '+timer.innerHTML);
      window.location = '../pages/vitória2.html';
    }, 500);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame()
    
  } else {
      setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

   }, 500);
  }
}

const revealcard = ({ target }) => {
if (target.parentNode.className.includes('reveal-card')) {
  return;
}

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();
  }

}
const createCards = (character) => {
  
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../img/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealcard)
  card.setAttribute('data-character', character);

  return card;
}

const loadGame = () => {

  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

duplicateCharacters.forEach((character) => {

     const card = createCards(character);
     grid.appendChild(card);

  });

}

const startTimer = () => {
  
 this.loop = setInterval(() => {
      timer.innerHTML = +timer.innerHTML + 1;
    }, 1000);

}
                        
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}