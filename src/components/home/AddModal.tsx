import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import _ from 'lodash';

import actionCreators from '../../redux/actionCreators/documents';
import Modal from '../modal';
import CommonButton from '../commonButton';

import './Home.css';

const AddModal = (props: DocumentNS.IAddModalProps) => {

    const dispatch = useDispatch();

    const dispatchActionToSetAddModalOpen = (isAddModalOpen: boolean) => {
        dispatch(actionCreators.setAddModalOpen(isAddModalOpen));
    }

    const modalHeader = (props.action === 'create') ? 
                        `Create a new ${props.folderFileType}` : 
                        `Rename ${props.folderFileType}`;

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
            setInputValue(props.inputValue);
    }, [props]);

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedValue = e.target.value;
        if(changedValue.match(/^(?![\s-])[\w\s-.?!@#$%^&*()_+=-]+$/) || changedValue===''){
            setInputValue(e.target.value);
        }
    };

    const handleCancel = () => {
        setInputValue('');
        dispatchActionToSetAddModalOpen(false);
    };

    const handleSubmit = () => {
        props.onSubmit(inputValue);
        setInputValue('');
    };

    const buttonDisability = () => {
        const fileFormats = ['ppt', 'doc', 'txt', 'pdf'];
        if(inputValue.length > 0){
            if(props.folderFileType === 'file'){
                const format = inputValue.split('.')[1];
                return !_.includes(fileFormats, format);
            }
            return false;
        }
        return true;
    };

    return (
        <Modal
            isModalOpen={props.isModalOpen}
            headerName={modalHeader}
            isShowCancelIcon={true}
            onClickCancelIcon={handleCancel}
        >
            <div 
                className={'modalInputContainer'}>
                {`Name of the ${props.folderFileType}`}
                <input
                    type={'text'}
                    className={'modalInputBox'}
                    value={inputValue}
                    placeholder={`Enter ${props.folderFileType} name`}
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
                disabled={buttonDisability()}
                onClick={handleSubmit}
                name={`${_.startCase(props.action)} ${props.folderFileType}`}
            />
        </div>
        </Modal>
    )
};

export default AddModal;