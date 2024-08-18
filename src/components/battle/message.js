import React, { useState } from 'react';
import { STATUS } from "../../constants/battle-constants";
import '../../css/MessageStyle.css';

const Message = (props) => {
    const { status, messageText } = props;

    return (
        <div className='messageContainer'>
            <MainMessage>{messageText}</MainMessage>
            {/* ステータスがメインコマンドの時、4択を表示する */}
            {status === STATUS.SELECT_MAIN_COMMAND && <MainCommandModal {...props} />}
            {/* ステータスがスキルコマンドの時、技の4択を表示する */}
            {status === STATUS.SELECT_SKILL_COMMAND && <SkillCommandModal {...props} />}
        </div>
    );
}
// 通常のメッセージを表示
const MainMessage = (props) => {
    return (
        <div className='normalMessageContainer border'>
            <p style={{ whiteSpace: 'preWrap' }}>{props.children}</p>
        </div>
    )
}
// メインコマンドを表示
const MainCommandModal = (props) => {
    const { onClickCommands } = props;
    const { onClickFight, onClickNotFound } = onClickCommands;

    return (<div className='mainCommandContainer border'>
        <MainCommand clickEvent={onClickFight}>たたかう</MainCommand>
        <MainCommand clickEvent={onClickNotFound}>どうぐ</MainCommand>
        <MainCommand clickEvent={onClickNotFound}>リアモン</MainCommand>
        <MainCommand clickEvent={onClickNotFound}>にげる</MainCommand>
    </div>)
}
// 4択の表示
const MainCommand = (props) => {
    // childrenは、たたかうとかどうぐなどの4択が格納されている
    const { clickEvent, children } = props;

    return (<Command className='mainCommandText' onClick={clickEvent}>{children}</Command>);
}
// わざコマンドを表示
const SkillCommandModal = (props) => {
    const { skills, onClickCommands, selectedSkillIndex } = props;
    const { onClickReturnMain, onClickSkill, onSelectSkill } = onClickCommands;
    const skill = skills[selectedSkillIndex];

    return (<>
        <div className='skillComandContainer border'>
            {skills.map((skill, index) =>
                <SkillCommand clickEvent={() => onClickSkill(index)} key={index} style={{ fontWeight: index == selectedSkillIndex ? 'bold' : 'normal' }} >{skill.name}</SkillCommand>
            )}
            <SkillCommand clickEvent={onClickReturnMain}>もどる↩︎</SkillCommand>
        </div>
        {selectedSkillIndex !== null && (
            <div className='skillDetailContainer border'>
                <span>{skill.pp}/{skill.maxPp}</span>
                <span>{skill.type}わざ</span>
                <Command className='skillSelectButton' onClick={onSelectSkill}>けってい</Command>
            </div>
        )}
    </>)
}
const SkillCommand = (props) => {
    const { clickEvent, children } = props;

    return (<Command className='skillCommandText' style={{ ...props.style }} onClick={clickEvent}>{children}</Command>);
}
// コマンドの表示
const Command = (props) => {
    const { children, style } = props;
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseEnter = () => {
        setIsHovering(true);
    };
    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (<span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props} style={{ opacity: isHovering ? 0.6 : 1, cursor: 'pointer', ...style }}>{children}</span>);
}

export default Message;