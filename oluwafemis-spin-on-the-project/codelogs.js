// Reset Game
// function resetGame(){
//   updateHighScore();
//   stopGame();
//   snake = [{x:10,y:10}];
//   food = generateFood();
//   direction = 'right';
//   gameSpeedDelay = 200;
//   updateScore();
// }

// function resetGame() {
//   const currentScore = snake.length - 1;
//   const name = playerName.textContent.trim();

//   // 1. Save this player's score
//   storage.savePlayerScore(name, currentScore);

//   // 2. Get the global highest score
//   const { bestPlayer, bestScore } = storage.getHighestScoringPlayer();

//   // 3. Display message
//   infoText.textContent =
//     `Game Over! Highest score is ${bestScore} by ${bestPlayer}.`;

//   stopGame();
//   snake = [{ x: 10, y: 10 }];
//   food = generateFood();
//   direction = "right";
//   gameSpeedDelay = 200;
//   updateScore();
// }



// Version 1
// function populateUI() {
//   // 1. Load saved data
//   const savedName = getSavedGameData.playerName;
//   const savedHighScore = Number(getSavedGameData.score);

//   // 2. Put saved data into UI
//   playerName.textContent = savedName;
//   highScore = savedHighScore;
//   highScoreText.textContent = `High Score: ${highScore.toString().padStart(3,'0')}`;

//   // 3. Save it back (ensure storage is always synced)
//   storage.setGameData(savedName, savedHighScore);
// }


// Persist Players Score by their name
// playerName.addEventListener("input", () => {
//   const name = playerName.textContent.trim();
//   highScore = storage.getPlayerScore(name);
//   highScoreText.textContent = `High Score: ${highScore.toString().padStart(3,'0')}`;
// });



// function updateHighScore(){
//   const currentScore = snake.length - 1;
//   const name = playerName.textContent.trim();

//   if(currentScore > highScore){
//      highScore = currentScore;
//      highScoreText.textContent = `High Score: ${highScore.toString().padStart(3,'0')}`;
     
//     //  previous way I was using to save the highsocre to localstorage
//     //  storage.setGameData(playerName.textContent, highScore);
//   }
//   // New Method Save the highscore per player
//   storage.savePlayerScore(name, highScore);

//   highScoreText.style.display = 'block';
// }



// STORAGE.JS

// VERSION 1
// class GameStorage{
//   constructor(){
//     this.playerName;
//     this.score;
//     this.defaultPlayerName = "Player-Sarayu";
//     this.defaultPlayerScore = 0;
//   }

//   getGameData(){
//     if(localStorage.getItem('Score') === null){
//       this.score = this.defaultPlayerScore;
//     }else{
//       this.score = localStorage.getItem('Score');
//     }

//     if(localStorage.getItem('Player-Name') === null){
//       this.playerName = this.defaultPlayerName;
//     }else{
//       this.playerName = localStorage.getItem('Player-Name');
//     }

//     return{
//      playerName: this.playerName,
//      score: this.score
//     }
//   }

//   setGameData(playerName, score){
//     localStorage.setItem('Player-Name', playerName);
//     localStorage.setItem('Score', score);
//   }
// }

// export default GameStorage;

// VERSION 2
// class GameStorage {
//   constructor() {
//     this.defaultPlayerName = "Player-Sarayu";
//     this.defaultPlayerScore = 0;
//   }

//   getGameData() {
//     const score = Number(localStorage.getItem("Score")) || this.defaultPlayerScore;
//     const playerName = localStorage.getItem("Player-Name") || this.defaultPlayerName;

//     return { playerName, score };
//   }

//   setGameData(playerName, score) {
//     localStorage.setItem("Player-Name", playerName);
//     localStorage.setItem("Score", Number(score)); // ensure numeric
//   }
// }

// export default GameStorage;



// Version 3
// class GameStorage {
//   constructor() {
//     this.defaultPlayerName = "Player-Sarayu";
//   }

//   // Load all player scores from localStorage
//   loadAllPlayers() {
//     return JSON.parse(localStorage.getItem("Players")) || {};
//   }

//   // Get score for a specific player
//   getPlayerScore(playerName) {
//     const players = this.loadAllPlayers();
//     return players[playerName] || 0;
//   }

//   // Save score for a specific player
//   savePlayerScore(playerName, score) {
//     const players = this.loadAllPlayers();
//     players[playerName] = score;
//     localStorage.setItem("Players", JSON.stringify(players));
//   }
// }

// export default GameStorage;