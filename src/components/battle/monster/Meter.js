const Meter = (props) => {
    const{ current, max, additionalStyles} = props;
    const width = (current / max) * 100;
    const style = additionalStyles || {};
    style.width = width + '%';

    if(width > 50){
        style.background = '#9c9';
    } else if( 20 < width){
        style.background = '#ffa500';
    } else {
        style.background = '#ff0000';
    }

    return(
    <div style={meterStyle.meter_base}>
        <div style={style}></div>
    </div>
    );
};
const meterStyle = {
    meter_base:{
        height: '15px',
        width: '100%'
    }
}
export default Meter;