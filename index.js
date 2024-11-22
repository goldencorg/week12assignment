alert(`Use fetch after adding or deleting!`);
//array where all the players will be added to once they're fetched
let playerList = []
//grabbing div where players will be placed in
const playersContainer = document.getElementById("players-container");
//async function where players in json file are fetched and uses literal templates/interpolation to list them
async function fetchPlayers() {
    const response = await fetch("http://localhost:3000/players");
    playerList = await response.json();
    console.log(playerList);
    playersContainer.innerHTML = playerList.map(
        player => `<div class="bg-light rounded mt-5">
            <h2>${player.name}</h2>
            <h3>${player.star} ${player.pos}</h3>
            <h4>${player.home}</h4>
        </div>`
    ).join("");
}; 
//async function that takes input of all the input areas in html to create new player with the related properties and IDs; input areas will clear once posted
let lastCreatedItem = null;
async function createPlayer(){
    let playerName = document.getElementById('player-name').value
    let playerStar = document.getElementById('player-star').value
    let playerPosition = document.getElementById('player-position').value
    let playerHome = document.getElementById('player-home').value
    let playerStyle = document.getElementById('player-style').value
    let lcAnswer = playerStyle.toLowerCase();
    if (lcAnswer === 'offense'){
        lcAnswer = 1;
    } else if (lcAnswer === 'defense'){
        lcAnswer = 2;
    } else if (lcAnswer === 'special teams'){
        lcAnswer = 3;
    } else {
        lcAnswer = '';
    };

    const newPlayer = {
        name : playerName, 
        star : playerStar,
        pos : playerPosition,
        home : playerHome,
        footballId : lcAnswer
    };
    const response = await fetch("http://localhost:3000/players", {
        method : "POST",
        headers : { "Content-Type" : "application/json" },
        body: JSON.stringify(newPlayer)
    });
    const newlyCreatedItem = await response.json();
    lastCreatedItem = newlyCreatedItem
    console.log(lastCreatedItem);
    document.getElementById('player-name').value = '';
    document.getElementById('player-star').value = '';
    document.getElementById('player-position').value = '';
    document.getElementById('player-home').value = '';
    document.getElementById('player-style').value = '';
};
//asynce function that identifies the last object in the array and deletes it from the json file
async function deletePlayer(){
    let idPlayerToDelete = (Object.keys(playerList).length)
    fetch("http://localhost:3000/players/" +  [idPlayerToDelete], {
        method : "DELETE"
    });
};
