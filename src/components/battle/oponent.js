import Name from './monster/Name';
import Image from './monster/Image';
import Meter from './monster/Meter';

const Oponent = (props) => {
    const { oponent } = props;

    return (
        <div style={oponentStyle.oponentContainer}>
            <div style={oponentStyle.infoContainer}>
                <Name name={oponent.name} level={oponent.level} textAlign='right' />
                <Meter max={oponent.maxHp} current={oponent.hp} additionalStyles={oponentStyle.progressStyle} />
            </div>
            <Image monster={oponent} size={60}>😈</Image>
        </div>
    );
}

const oponentStyle = {
    infoContainer: {
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
    oponentContainer: {
        display: 'flex',
        justifyContent: 'end',
        justifyContent: 'space-between',
        padding: '24px',
    },
    progressStyle: {
        height: '15px',
        transition: '0.5s',
        whiteSpace: 'nowrap',
        borderRadius: '10px 10px 10px 10px',
    },
}

export default Oponent;