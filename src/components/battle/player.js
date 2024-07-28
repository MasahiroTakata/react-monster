const Player = () => {
  return (
      <div style={playerStyle.playerContainer}>
          <span style={playerStyle.playerImage}>🧑‍💻</span>
          <PlayerBattleIndicator />
      </div>
  );
}

const PlayerBattleIndicator = () => {
  return (
      <div style={playerStyle.battleIndicaterContainer}>
          <span style={playerStyle.battleIndicaterName}>みならいプログラマー：L5</span>
          <div>
              <span>HP</span>
              <span style={playerStyle.hpString}>100/100</span>
          </div>
      </div>
  );
}

const playerStyle = {
  battleIndicaterContainer: {
      witdh: '100%',
      height: '50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      justifyContent: 'center',
      paddingBottom: '12px',
      paddingRight: '24px',
      borderBottom: '2px solid #000',
      borderRight: '2px solid #000'
  },
  battleIndicaterName: {
      textAlign: 'left',
  },
  playerContainer: {
      display: 'flex',
      justifyContent: 'start',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px',
  },
  playerImage: {
      fontSize: '100px',
  },
  hpString: {
      fontWeight: 'bold',
      marginLeft: '4px',
      fontSize: '18px',
  }
}

export default Player;
