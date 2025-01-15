let playerCards = JSON.parse(localStorage.getItem('playerCards')) || [];

function saveCardsToLocalStorage(cards) {
  localStorage.setItem('playerCards', JSON.stringify(cards));
}

function renderCards() {
  const cardContainer = document.querySelector('.cardContainer');
  cardContainer.innerHTML = '';

  playerCards.forEach((playerData, index) => {
    createCard(playerData, index);
  });
}

function createCard(playerData, index) {
  const newCard = document.createElement('div');
  newCard.classList.add('playerCard');
  newCard.innerHTML = `
    <div class="cardBase">
      <div class="playerName">${playerData.name}</div>
      <img src="${playerData.image}" width="190px" height="140px" class="playerImage">
      <div class="overallRating">OVR: ${playerData.rating}</div>
      <div class="playerStats">
        <div><u>Goals</u>: ${playerData.goals}</div>
        <div><u>Assists</u>: ${playerData.assists}</div>
        <div><u>Steals</u>: ${playerData.steals}</div>
        <div><u>Saves</u>: ${playerData.saves}</div>
      </div>
      <button class="otherStats">See <u>other..</u></button>
      <div class="otherStatsPopup" style="display: none;">
        <div><u>MVPS</u>: ${playerData.mvps}</div>
        <div><u>Anklers</u>: ${playerData.anklers}</div>
        <div><u>Matches</u>: ${playerData.matches}</div>
        <div class="discordUser">${playerData.user}</div>
        <button class="popupCloser">X</button>
      </div>
       <button class="deleteCardButton">Delete</button>
    </div>
  `;

  const otherStatsButton = newCard.querySelector('.otherStats');
  const popupCloserButton = newCard.querySelector('.popupCloser');
  const popup = newCard.querySelector('.otherStatsPopup');
  const deleteCardButton = newCard.querySelector('.deleteCardButton');

  otherStatsButton.addEventListener('click', function () {
    popup.style.display = 'block';
  });

  popupCloserButton.addEventListener('click', function () {
    popup.style.display = 'none';
  });

  deleteCardButton.addEventListener('click', function () {
    playerCards.splice(index, 1);
    saveCardsToLocalStorage(playerCards);
    renderCards();
  });

  const cardContainer = document.querySelector('.cardContainer');
  cardContainer.appendChild(newCard);
}

renderCards();

const addCardButton = document.querySelector('.addCardButton');
addCardButton.addEventListener('click', function () {
  const playerName = prompt('Enter the player name:');
  const playerGoals = prompt('Enter the number of goals:');
  const playerAssists = prompt('Enter the number of assists:');
  const playerRating = prompt('Enter the overall rating:');
  const playerSteals = prompt('Enter the number of steals:');
  const playerSaves = prompt('Enter the number of saves:');
  const playerMvps = prompt('Enter the number of MVPS:');
  const playerAnklers = prompt('Enter the number of Anklers:');
  const playerMatches = prompt('Enter the number of matches:');
  const playerUser = prompt("Enter the player's Discord username:")
  const playerImage = prompt('Enter the image name (include filetype!):')

  if (!playerName || !playerGoals || !playerAssists || !playerRating || !playerSteals || !playerSaves || !playerMvps || !playerAnklers || !playerMatches || !playerImage || !playerUser) {
    alert('All fields are required to create a new card!');
    return;
  }

  const newPlayer = {
    name: playerName,
    goals: playerGoals,
    assists: playerAssists,
    rating: playerRating,
    steals: playerSteals,
    saves: playerSaves,
    mvps: playerMvps,
    anklers: playerAnklers,
    matches: playerMatches,
    image: playerImage,
    user: playerUser
  };

  playerCards.push(newPlayer);
  saveCardsToLocalStorage(playerCards);
  renderCards();
});
