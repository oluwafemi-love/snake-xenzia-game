class GameStorage {
  loadAllPlayers() {
    return JSON.parse(localStorage.getItem("Players")) || {};
  }

  savePlayerScore(playerName, score) {
    const players = this.loadAllPlayers();

    // Save the highest score ONLY for that player
    if (!players[playerName] || score > players[playerName]) {
      players[playerName] = score;
    }

    localStorage.setItem("Players", JSON.stringify(players));
  }

  getHighestScoringPlayer() {
    const players = this.loadAllPlayers();
    
    let bestPlayer = null;
    let bestScore = 0;

    for (const name in players) {
      if (players[name] > bestScore) {
        bestPlayer = name;
        bestScore = players[name];
      }
    }

    return { bestPlayer, bestScore };
  }

   // Get score for a specific player
  getPlayerScore(playerName) {
    const players = this.loadAllPlayers();
    return players[playerName] || 0;
  }
}

export default GameStorage;