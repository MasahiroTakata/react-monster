import Name from './monster/Name';
import Image from './monster/Image';
import Meter from './monster/Meter';
import '../../css/MonstersArrangement.css';

const Oponent = (props) => {
    const { oponent } = props;

    return (
        <div className='monstersContainer'>
            <div className='infoContainer'>
                <Name name={oponent.name} level={oponent.level} textAlign='right' />
                <Meter max={oponent.maxHp} current={oponent.hp} additionalStyles={oponentStyle.progressStyle} />
            </div>
            <Image monster={oponent} size={60}>😈</Image>
        </div>
    );
}

const oponentStyle = {
    progressStyle: {
        height: '15px',
        transition: '0.5s',
        whiteSpace: 'nowrap',
        borderRadius: '10px 10px 10px 10px',
    },
}

export default Oponent;