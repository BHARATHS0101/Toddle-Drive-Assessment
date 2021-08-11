import React from 'react';

import './Modal.css';

import Cancel from '../../images/cancel.svg';

const Modal:React.FC<CommonComponentsNS.IModalProps> = (props) => {

    const modalDisplayStyle = props.isModalOpen ?
                                'modalContainer modalContainerOpen' : 
                                'modalContainer';

    return (
        <div className={modalDisplayStyle}>
            <div className={`modal ${props.modalStyle}`}>
                <div className={'modalHeader'}>
                    {props.headerName}
                    {props.isShowCancelIcon && 
                        <img src={Cancel} 
                            className={'cancelIcon'} 
                            alt={'Cancel'}
                            onClick={props.onClickCancelIcon}
                        />
                    }
                </div>
                {props.children}
            </div>
        </div>
    );
};

export default Modal;