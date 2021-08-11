import React from 'react';
import {useDispatch} from 'react-redux';
import _ from 'lodash';

import actionCreators from '../../redux/actionCreators/documents';
import Modal from '../modal';
import CommonButton from '../commonButton';

import './Home.css';

const DeleteModal = (props: DocumentNS.IAddModalProps) => {

    const dispatch = useDispatch();

    const dispatchActionToSetDeleteModalOpen = (isDeleteModalOpen: boolean) => {
        dispatch(actionCreators.SetDeleteModalOpen(isDeleteModalOpen));
    }

    const handleCancel = () => {
        dispatchActionToSetDeleteModalOpen(false);
    };

    const handleSubmit = () => {
        props.onSubmit();
    };

    const modalHeader = `Delete ${props.inputValue} ${props.folderFileType}?`

    return (
        <Modal
            isModalOpen={props.isModalOpen}
            headerName={modalHeader}
            isShowCancelIcon={false}
            onClickCancelIcon={handleCancel}
            modalStyle={'deleteModalContainer'}
        >
            <div className={'alertMessage'}>
                {`Are you sure you want to delete this ${props.folderFileType}? This is a permanent action and can’t be undone.`}
            </div>
            <div className={'buttonsContainer'}>
                <CommonButton
                    disabled={false}
                    onClick={handleSubmit}
                    name={`${_.startCase(props.action)} ${props.folderFileType}`}
                    buttonStyle={'deleteButton'}
                />
                <CommonButton
                    disabled={false}
                    onClick={handleCancel}
                    name={'cancel'}
                    buttonStyle={'cancelButton'}
                />
            </div>
        </Modal>
    )
};

export default DeleteModal;