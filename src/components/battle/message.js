const Message = () => {
  let status = 0;
  return (
      <div style={messageStyle.messageContainer}>
          {status === 0 &&(
              <div style={{...messageStyle.normalMessageContainer, ...messageStyle.border}}>
                  <p>あ！やせいの<br />SQLインジェクションがとびだしてきた！</p>
              </div>
          )}
          

          {status === 1 &&(
              <>
              <div style={{...messageStyle.normalMessageContainer, ...messageStyle.border}}>
                  <p>どうする？</p>
              </div>
              <div style={{...messageStyle.mainCommandContainer, ...messageStyle.border}}>
                  <span style={messageStyle.mainCommandText}>たたかう</span>
                  <span style={messageStyle.mainCommandText}>どうぐ</span>
                  <span style={messageStyle.mainCommandText}>リアモン</span>
                  <span style={messageStyle.mainCommandText}>にげる</span>
              </div>
          </>
          )}

          {status === 2 &&(
              <>
              <div style={{...messageStyle.normalMessageContainer, ...messageStyle.border}}>
                  <p></p>
              </div>
              <div style={{...messageStyle.skillComandContainer, ...messageStyle.border}}>
                   <span style={messageStyle.skillCommandText}>かいはつ</span>
                  <span style={messageStyle.skillCommandText}>ちょうさ</span>
                  <span style={messageStyle.skillCommandText}>べんきょう</span>
                  <span style={messageStyle.skillCommandText}>もどる↩︎</span>
              </div>
              <div style={{...messageStyle.skillDetailContainer, ...messageStyle.border}}>
                  <span style={messageStyle.skillRemainingPointText}>20/20</span>
                  <span>タイプ / ノーマル</span>
                  <span style={messageStyle.skillSelectButton}>くりだす</span>
              </div>
          </>
          )}
      </div>
  );
}

const messageStyle = {
  border: {
      border: '2px solid black',
      borderRadius: 4,
      backgroundColor: 'white',
  },
  messageContainer:{
      position: 'relative',
  },
  normalMessageContainer: {
      witdh: '100%',
      height: 80,
      padding: 12,
  },
  mainCommandContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 200,
      height: 80,
      padding: 12,
      display: 'flex',
      flexWrap: 'wrap',
  },
  mainCommandText: {
      width: '50%',
  },
  skillCommandText: {
      width: '100%',
  },
  skillComandContainer:{
      position: 'absolute',
      bottom: 0,
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      padding: 12,
      gap:4,
      width: '50%',
  },
  skillDetailContainer:{
      width: '50%',
      position: 'absolute',
      padding: 12,
      gap:4,
      bottom: 0,
      right: 0,
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      alignItems: 'flex-end',
  },
  skillRemainingPointText: {
      fontWeight: 'bold',
      fontSize: 18,
  },
  skillSelectButton: {
      textDecoration: 'underline',
  }
}

export default Message;
