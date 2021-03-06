import React from 'react';

import './CommonButton.css';

const CommonButton:React.FC<CommonComponentsNS.ICommonButtonProps> = (props) => {    

    const buttonStyle = props.disabled ? 
                            `buttonEnabled ${props.buttonStyle} buttonDisabled` : 
                            `buttonEnabled ${props.buttonStyle}`;

    return (
        <button 
            className={buttonStyle}
            disabled={props.disabled}
            onClick={props.onClick}
        >   
            {props.name ? props.name : null}
            {props.children}
        </button>     
    );
};

export default CommonButton;