const Oponent = () => {
  return (
      <div style={oponentStyle.oponentContainer}>
          <OponentBattleIndicator />
          <p style={oponentStyle.oponentImage}>😈</p>
      </div>
  );
}

const OponentBattleIndicator = () => {
  return (
      <div style={oponentStyle.battleIndicaterContainer}>
          <span style={oponentStyle.battleIndicaterName}>SQLインジェクション：L5</span>
          <div>
              <span>HP</span>
              <span style={oponentStyle.hpString}>100/100</span>
          </div>
      </div>
  );
}

const oponentStyle = {
  battleIndicaterContainer: {
      witdh: '100%',
      height: '50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      justifyContent: 'center',
      paddingBottom: '12px',
      paddingLeft: '24px',
      borderBottom: '2px solid #000',
      borderLeft: '2px solid #000'
  },
  battleIndicaterName: {
      textAlign: 'right',
  },
  oponentContainer: {
      display: 'flex',
      justifyContent: 'end',
      justifyContent: 'space-between',
      padding: '24px',
  },
  oponentImage: {
      fontSize: '60px',
  },
  hpString: {
      fontWeight: 'bold',
      marginLeft: '4px',
      fontSize: '16px',
  }
}

export default Oponent;