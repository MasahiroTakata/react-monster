import '../../../css/HPMeter.css';

const Meter = (props) => {
    const{ additionalStyles } = props;
    const width = calculateWidth(props);
    const newStyle = { ...additionalStyles, width: width + '%' };
    newStyle.background = determineBackgroundColor(parseFloat(width));
    return(
        <div className='HpBase'>
            <div style={newStyle}></div>
        </div>
    );
};

const determineBackgroundColor = (width) => {
    if (width > 50) {
        return '#9c9';
    } else if (width > 20) {
        return '#ffa500';
    } else {
        return '#ff0000';
    }
};

const calculateWidth = (props) => {
    const {current, max} = props;

    return (current / max) * 100;
};

export default Meter;