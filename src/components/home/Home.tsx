import React, {useEffect, lazy, Suspense} from 'react';

import {useSelector, useDispatch} from 'react-redux';

import actionCreators from '../../redux/actionCreators/documents';
import BreadCrumb from '../breadCrumb';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';

import './Home.css';

const Folder = lazy(() => import('../folder'));

const Home = () => {

    const state = useSelector((
        appState:ReduxNS.IState
    ) => appState.Documents);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionCreators.setInitialData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dispatchActionToSubmitAddFileFolder = (fileFolderName: string) => {
        if(state.selectedModalActionType === 'create'){
            dispatch(actionCreators.onSubmitAddFileFolder(fileFolderName));
        }else {
            dispatch(actionCreators.onSubmitRenameFileFolder(fileFolderName))      
        }
    };

    const dispatchActionToDeleteFileFolder = () => {
        dispatch(actionCreators.onDeleteFileFolder());
    }

    return (
        <div className={'mainContainer'}>
            <AddModal
                inputValue={state.modalInputValueToEdit}
                action={state.selectedModalActionType}
                folderFileType={state.selectedModalFolderFileType}
                isModalOpen={state.isAddModalOpen}
                onSubmit={dispatchActionToSubmitAddFileFolder}
            />
            <DeleteModal
                inputValue={state.modalInputValueToEdit}
                action={'delete'}
                folderFileType={state.selectedModalFolderFileType}
                isModalOpen={state.isDeleteModalOpen}
                onSubmit={dispatchActionToDeleteFileFolder}
            />
            <div className={'header'}>
                <BreadCrumb
                    routes={state.routes}
                />
            </div>
            <div className={'content'}>
                <Suspense fallback={<div>{'Loading....'}</div>}>
                    <Folder
                        selectedFolder={state.selectedFolderCopy}
                        subFolders={state.subFoldersCopy}
                    />
                </Suspense>
            </div>
        </div>
    );
};

export default Home;
