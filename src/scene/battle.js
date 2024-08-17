import React, { useState } from 'react';
import Opponent from "../components/battle/opponent";
import Player  from "../components/battle/player";
import Message from "../components/battle/message";
import wait from "../utils/wait";
import { STATUS, MESSAGE_SPEED } from "../constants/battle-constants";
import '../css/BattleScene.css';

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

const DEFAULT_OPPONENT = {
    name: 'SQLインジェクション',
    level: 5,
    hp: 100,
    maxHp: 100,
    attack: 20
};

const BattleScene = () => {
    const [screenStatus, setScreenStatus] = useState(STATUS.BATTLE_START);
    const [player, setPlayer] = useState(DEFAULT_PLAYER);
    const [opponent, setOpponent] = useState(DEFAULT_OPPONENT);
    const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
    const [messageText, setMessageText] = useState(`あ！ やせいの\nSQLインジェクションがあらわれた！`);
    // 画面上をクリックしたときの処理
    const onClickHandler = () => {
        switch (screenStatus) {
            case STATUS.BATTLE_START:
                goToMainCommand();
                break;
            case STATUS.BATTLE_END:
                if (window.confirm('リトライしますか？')) {
                    window.location.reload();
                }
                break;
            case STATUS.NOT_FOUND:
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
        setScreenStatus(STATUS.SELECT_SKILL_COMMAND);
    }
    // わざを仮選択したときの処理
    const onClickSkill = (id) => {
        setSelectedSkillIndex(id);
    }
    // わざを確定したときの処理
    const onSelectSkill = () => {
        // stateの更新はラグがあるため、変数に一旦格納
        const tempPlayer = { ...player };
        const tempOpponent = { ...opponent };
        // 選択したわざ
        const selectedSkill = tempPlayer.skills[selectedSkillIndex];
        setSelectedSkillIndex(null);
        // わざのPPを減らす
        tempPlayer.skills[selectedSkillIndex].pp --;
        setPlayer(tempPlayer);
        // 時間経過で戦闘を自動送りするため、非同期処理を実行
        Promise.resolve()
        // プレイヤーが攻撃を宣言！
        .then(() => startPlayersAttack())
        .then(() => wait(MESSAGE_SPEED))
        // プレイヤーの攻撃フェーズ
        .then(() => playersAttack())
        .then(() => wait(MESSAGE_SPEED))
        // 敵が攻撃を宣言！
        .then(() => startOpponentsAttack())
        .then(() => wait(MESSAGE_SPEED))
        // 敵の攻撃フェーズ
        .then(() => opponentsAttack())
        .then(() => wait(MESSAGE_SPEED))
        // プレイヤーのコマンド選択に戻る
        .then(() => goToMainCommand())
        // 例外発生時 
        .catch(err => handleError(err));
        // プレイヤーが攻撃を宣言！
        const startPlayersAttack = () => {
        setMessageText(` ${player.name}の${selectedSkill.name}！`);
        setScreenStatus(STATUS.ATTACK_PHASE);
        }
        // プレイヤーの攻撃フェーズ
        const playersAttack = () => {
            // わざが命中したかどうか
            const isMissed = Math.random() < selectedSkill.missRate / 100;
            if (isMissed) {
                setMessageText(`しかし、はずれてしまった！`);
            } else {
                // 攻撃が当たった場合
                switch (selectedSkill.type) {
                    case 'こうげき':
                        // ダメージ計算
                        const caluculatedDamage = Math.floor(selectedSkill.attack * tempPlayer.attackUpRate);
                        setMessageText(`${player.name}に${caluculatedDamage}のダメージ！`);
                        // 攻撃を当てた後のHP計算
                        const afterHp = tempOpponent.hp - caluculatedDamage;
                        if (afterHp > 0) {
                            tempOpponent.hp = afterHp;
                            setOpponent(tempOpponent);
                        } else {
                            tempOpponent.hp = 0;
                            setOpponent(tempOpponent);
                            throw new Error('OPONENT_DEAD');
                        }
                        break;
                    case 'のうりょくUP':
                        if (selectedSkill.attackUpRate > 0) {
                            // 攻撃UPわざの場合
                            tempPlayer.attackUpRate = tempPlayer.attackUpRate * selectedSkill.attackUpRate;
                            setPlayer(tempPlayer);
                            setMessageText(`${tempPlayer.name}のこうげきがグーンとあがった！`);
                        } else if (selectedSkill.deffenceUpRate > 0) {
                            // 防御UPわざの場合
                            tempPlayer.deffenceUpRate = tempPlayer.deffenceUpRate * selectedSkill.deffenceUpRate;
                            setPlayer(tempPlayer);
                            setMessageText(`${tempPlayer.name}のぼうぎょがグーンとあがった！`);
                        } else {
                            setMessageText(`しかし、なにもおこらなかった。`);
                        }
                        break;
                    default:
                        throw new Error('INVALID_SKILL_TYPE');
                }
            }
        }
        // 敵が攻撃を宣言！
        const startOpponentsAttack = () => {
            setMessageText(`${opponent.name}のこうげき！`);
        }
        // 敵の攻撃フェーズ
        const opponentsAttack = () => {
            // ダメージ計算
            const caluculatedDamage = Math.floor(tempOpponent.attack / tempPlayer.deffenceUpRate);
            setMessageText(`${tempPlayer.name}に${caluculatedDamage}のダメージ！`);
            // 攻撃を受けた後のHP計算
            const afterHp = tempPlayer.hp - caluculatedDamage;
            if (afterHp > 0) {
                tempPlayer.hp = afterHp;
                setPlayer(tempPlayer);
            } else {
                tempPlayer.hp = 0;
                setPlayer(tempPlayer);
                throw new Error('PLAYER_DEAD');
            }
        }

        const handleError = (err) => {
            switch (err.message) {
                // 敵が倒れたとき、バトル終了
                case 'OPONENT_DEAD':
                    setMessageText(`${opponent.name}をたおした！`);
                    setScreenStatus(STATUS.BATTLE_END);
                break;
                // プレイヤーが倒れたとき、バトル終了
                case 'PLAYER_DEAD':
                    setMessageText(`${player.name}はたおれてしまった！`);
                    setScreenStatus(STATUS.BATTLE_END);
                break;
                // その他のエラー
                default:
                    alert(err);
                break;
            }
        }
    };
    // 未開発のボタンをクリックしたときの処理
    const onClickNotFound = () => {
        setMessageText('この機能はまだできていないのじゃ！');
        setScreenStatus(STATUS.NOT_FOUND);
    }
    // 戻るを選択したときの処理
    const onClickReturnMain = () => {
        goToMainCommand();
    }

    const onClickCommands = {
        onClickFight,
        onClickReturnMain,
        onClickSkill,
        onClickNotFound,
        onSelectSkill
    };

    return (
        <div className='battleScene' onClick={onClickHandler}>
            <Opponent opponent={opponent} />
            <Player player={player} />
            <Message status={screenStatus} onClickCommands={onClickCommands} skills={player.skills} selectedSkillIndex={selectedSkillIndex} messageText={messageText}/>
        </div>
    );
}

export default BattleScene;