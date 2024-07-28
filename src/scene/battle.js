import React, { useState } from 'react';
import Oponent from "../components/battle/oponent";
import Player  from "../components/battle/player";
import Message from "../components/battle/message";

const BattleScene = () => {
    return (
        <div style={battleSceneStyle.battleScene}>
            <Oponent />
            <Player />
            <Message />
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