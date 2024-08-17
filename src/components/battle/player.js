import Name from './monster/Name';
import Hp from './monster/HP';
import Image from './monster/Image';
import Meter from './monster/Meter';
import '../../css/MonstersArrangement.css';

const Player = (props) => {
    const { player } = props;

    return (
        <div className='monstersContainer'>
            <Image monster={player} size={100}>🧑‍💻</Image>
            <div className='infoContainer'>
                <Name name={player.name} level={player.level} textAlign='left' />
                <Hp hp={player.hp} maxHp={player.maxHp} fontSize={18} />
                <Meter max={player.maxHp} current={player.hp} additionalStyles={playerStyle.progressStyle} />
            </div>
        </div>
    );
}

const playerStyle = {
    progressStyle: {
        height: '15px',
        transition: '1.0s',
        whiteSpace: 'nowrap',
        borderRadius: '10px 10px 10px 10px',
    },
}

export default Player;
