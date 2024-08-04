import React, { useState } from 'react';
import Oponent from "../components/battle/oponent";
import Player  from "../components/battle/player";
import Message from "../components/battle/message";
import { STATUS } from "../constants/battle-constants";

const DEFAULT_PLAYERS_SKILL = [
  {
    name: 'かいはつ',
    attack: 10,
    maxPoint: 20,
    missRate: 20,
    pp: 20,
    maxPp: 20,
    type: 'こうげき',
  },
  {
    name: 'ちょうさ',
    attackUpRate: 1.5,
    deffenceUpRate: 0,
    maxPoint: 10,
    missRate: 0,
    pp: 10,
    maxPp: 10,
    type: 'のうりょくUP',
  },
  {
    name: 'べんきょう',
    attackUpRate: 0,
    deffenceUpRate: 1.5,
    maxPoint: 10,
    missRate: 0,
    pp: 10,
    maxPp: 10,
    type: 'のうりょくUP',
  },
];

const DEFAULT_PLAYER = {
  name: 'みならいプログラマー',
  level: 5,
  hp: 100,
  maxHp: 100,
  attackUpRate: 1,
  deffenceUpRate: 1,
  skills: DEFAULT_PLAYERS_SKILL,
};

const DEFAULT_OPONENT = {
  name: 'SQLインジェクション',
  level: 5,
  hp: 100,
  maxHp: 100,
  attack: 20
};

const BattleScene = () => {
  // const BattleScene = () => {
  const [screenStatus, setScreenStatus] = useState(STATUS.BATTLE_START);
  const [player, setPlayer] = useState(DEFAULT_PLAYER);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
  const [messageText, setMessageText] = useState(`あ！ やせいの\nSQLインジェクションがあらわれた！`);
  // }
  // 画面上をクリックしたときの処理
  const onClickHandler = () => {
    switch (screenStatus) {
        case STATUS.BATTLE_START:
            goToMainCommand();
            break;

        default:
            break;
    }
  }
  // メインコマンド選択に戻る
  const goToMainCommand = () => {
    setScreenStatus(STATUS.SELECT_MAIN_COMMAND);
    setMessageText("どうする？");
  }
  // たたかうを選択したときの処理
  const onClickFight = () => {
    console.log("たたかう");
    setScreenStatus(STATUS.SELECT_SKILL_COMMAND);
  }
  // わざを仮選択したときの処理
  const onClickSkill = (id) => {
    setSelectedSkillIndex(id);
}
  const onClickCommands = {
    onClickFight,
    // onClickReturnMain,
    onClickSkill,
    // onClickNotFound,
    // onSelectSkill
};

  return (
      <div style={battleSceneStyle.battleScene} onClick={onClickHandler}>
          <Oponent />
          <Player player={player}/>
          <Message status={screenStatus} onClickCommands={onClickCommands} skills={player.skills} selectedSkillIndex={selectedSkillIndex} messageText={messageText}/>
      </div>
  );
}

const battleSceneStyle = {
    battleScene: {
        width: '100%',
        height: '100%',
        padding: '10px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
}

export default BattleScene;