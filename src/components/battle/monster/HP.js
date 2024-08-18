import '../../../css/HpStyle.css';

const Hp = (props) => {
    const { hp, maxHp, fontSize } = props;
    const hpColor = determineTextColor(props);
    return (
        <div>
            <span>HP</span>
            <span style={{ fontSize: fontSize ? fontSize : 16 }} className='numericalStyle'><span style={{ color: hpColor }}>{hp}</span> / {maxHp}</span>
        </div>)
}

const determineTextColor = (props) => {
    const { hp, maxHp } = props;

    if (hp > maxHp * 0.5) {
        return 'green';
    } else if (hp > maxHp * 0.2) {
        return 'orange';
    } else {
        return 'red';
    }
};

export default Hp;
