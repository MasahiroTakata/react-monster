import Name from './monster/Name';
import Image from './monster/Image';
import Meter from './monster/Meter';
import '../../css/MonstersArrangement.css';

const Opponent = (props) => {
    const { opponent } = props;

    return (
        <div className='monstersContainer'>
            <div className='infoContainer'>
                <Name name={opponent.name} level={opponent.level} textAlign='right' />
                <Meter max={opponent.maxHp} current={opponent.hp} additionalStyles={opponentStyle.progressStyle} />
            </div>
            <Image monster={opponent} size={60}>😈</Image>
        </div>
    );
}

const opponentStyle = {
    progressStyle: {
        height: '15px',
        transition: '0.5s',
        whiteSpace: 'nowrap',
        borderRadius: '10px 10px 10px 10px',
    },
}

export default Opponent;