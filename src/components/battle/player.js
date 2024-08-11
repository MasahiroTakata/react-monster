import Name from './monster/Name';
import Hp from './monster/HP';
import Image from './monster/Image';
import Meter from './monster/Meter';

const Player = (props) => {
    const { player } = props;
    const progressStyle = {
        height: '15px',
        transition: '1.0s',
        whiteSpace: 'nowrap',
        borderRadius: '10px 10px 10px 10px',
    };

    return (
        <div style={playerStyle.playerContainer}>
            <Image monster={player} size={100}>🧑‍💻</Image>
            <div style={playerStyle.infoContainer}>
                <Name name={player.name} level={player.level} textAlign='left' />
                <Hp hp={player.hp} maxHp={player.maxHp} fontSize={18} />
                <Meter max={player.maxHp} current={player.hp} additionalStyles={progressStyle} />
            </div>
        </div>
    );
}

const playerStyle = {
    infoContainer: {
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
    playerContainer: {
        display: 'flex',
        justifyContent: 'start',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px',
        height: '100px'
    },
}

export default Player;
