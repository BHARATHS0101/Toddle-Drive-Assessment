import React, {useState} from 'react';

import CommonButton from '../commonButton';

import './Modal.css';

import Cancel from '../../images/cancel.svg';

const Modal:React.FC<CommonComponentsNS.IModalProps> = (props) => {

    const [inputValue, setInputValue] = useState<string>('');

    const handleOnChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    
    const handleCancel = () => {
        setInputValue('');
        props.onClickCancelIcon && props.onClickCancelIcon();
    };

    const handleOnClickButton = () => {
        props.onClickButton(inputValue);
    };

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
                            onClick={handleCancel}
                        />
                    }
                </div>
                <div className={'inputContainer'}>
                    {props.inputHeaderName}
                    <input
                        type={'text'}
                        className={'inputBox'}
                        value={inputValue}
                        placeholder={'Please enter name'}
                        onChange={handleOnChangeInput}
                    />
                </div>
                <div className={'buttonsContainer'}>
                    <CommonButton
                        disabled={false}
                        onClick={handleCancel}
                        name={'cancel'}
                        buttonStyle={'cancelButton'}
                    />
                    <CommonButton
                        disabled={inputValue.length===0}
                        onClick={handleOnClickButton}
                        name={props.buttonName}
                    />
                </div>
            </div>
        </div>
    );
};

export default Modal;