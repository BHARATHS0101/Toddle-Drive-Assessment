import _ from 'lodash';
import { Dispatch } from 'react';

import actionTypes from '../actionTypes/documents';

class ActionCreators implements DocumentNS.IActionCreators {

    setInitialData: DocumentNS.IActionCreators['setInitialData'] = (
    ) => {
        return async(dispatch, getState) => {
            try {
                const uniqueID = Date.now().toString();
                const localDocuments = localStorage.getItem('documents');
                if(!localDocuments){
                    const documentsData : DocumentNS.IDocuments = {
                        [uniqueID]: {
                            folderID: uniqueID,
                            folderName: 'My Documents',
                            files: {},
                            parentIDs: [],
                        }
                    }
                    const routes:DocumentNS.IRoutes[] = [{
                        id: uniqueID,
                        name: 'My Documents',
                    }];
                    this.dispatchActionToSetInitialData(
                        dispatch,
                        documentsData,
                        uniqueID,
                        routes,
                    );
                }else {
                    const documentsData:DocumentNS.IDocuments = JSON.parse(localDocuments);
                    const routes:DocumentNS.IRoutes[] = [{
                        id: documentsData[Object.keys(documentsData)[0]].folderID,
                        name: documentsData[Object.keys(documentsData)[0]].folderName,
                    }];
                    this.dispatchActionToSetInitialData(
                        dispatch,
                        documentsData,
                        routes[0].id,
                        routes,
                    );
                }   
            }catch {
                console.log('error');
            }
        }
    }

    onClickAddFileFolder: DocumentNS.IActionCreators['onClickAddFileFolder'] = (
        fileFolderType
    ) => {
        return ({
            type: actionTypes.DOCUMENTS_OPEN_ADD_MODAL,
            payload: {
                isAddModalOpen: true,
                selectedModalActionType: 'create',
                selectedModalFolderFileType: fileFolderType,
                modalInputValueToEdit: '',
                fileFolderIDToEdit: '',
            }
        })
    }

    setAddModalOpen: DocumentNS.IActionCreators['setAddModalOpen'] = (
        isModalOpen
    ) => async(dispatch, getState) => {
        const {selectedModalFolderFileType} = getState().Documents;
        const {selectedModalActionType} = getState().Documents;
        const {modalInputValueToEdit} = getState().Documents;
        dispatch({
            type: actionTypes.DOCUMENTS_OPEN_ADD_MODAL,
            payload: {
                isAddModalOpen: isModalOpen,
                selectedModalFolderFileType,
                selectedModalActionType,
                modalInputValueToEdit,
                fileFolderIDToEdit: '',
            }
        });
    }

    dispatchActionToSetInitialData= (
        dispatch: Dispatch<DocumentNS.IATSetInitialData>,
        documentsData: DocumentNS.IDocuments,
        selectedFolderID: string,
        routes: DocumentNS.IRoutes[],
    ) => {
        localStorage.removeItem('documents');
        localStorage.setItem('documents', JSON.stringify(documentsData));
        const selectedFolder = _.find(documentsData, {folderID: selectedFolderID});
        const subFolders = _.filter(documentsData, (eachDocument) => {
            return (eachDocument.parentIDs[eachDocument.parentIDs.length-1] === selectedFolder?.folderID);
        });
        dispatch({
            type: actionTypes.DOCUMENTS_SET_INITIAL_DATA,
            payload: {
                selectedFolder: selectedFolder?selectedFolder:null,
                documentsData,
                subFolders, 
                routes,
            }
        })   
    }

    onSubmitAddFileFolder: DocumentNS.IActionCreators['onSubmitAddFileFolder'] = (
        fileFolderName
    ) => async(dispatch, getState) => {
        const {selectedModalFolderFileType} = getState().Documents;
        const {selectedFolder} = getState().Documents;
        const documents = _.cloneDeep(getState().Documents.documentsData);
        const uniqueID = Date.now().toString();
        if(selectedFolder){
            if(selectedModalFolderFileType === 'folder'){
                const newParentIDs = selectedFolder.parentIDs;
                const newFolder: DocumentNS.IFolder = {
                        folderID: uniqueID,
                        folderName: fileFolderName,
                        files: {},
                        parentIDs: newParentIDs.concat([selectedFolder.folderID]),
                };
                documents[uniqueID] = newFolder;
            }else {
                const fileNameFormat = fileFolderName.split('.');
                const newFile: DocumentNS.IFile = {
                        fileID: uniqueID,
                        fileName: fileNameFormat[0],
                        fileType: fileNameFormat[1],
                };
                documents[selectedFolder.folderID].files[uniqueID] = newFile;
            }
            this.dispatchActionToSetInitialData(
                dispatch,
                documents,
                selectedFolder.folderID,
                getState().Documents.routes,
            );
        }
    }

    onClickRenameFileFolder: DocumentNS.IActionCreators['onClickRenameFileFolder'] = (
        fileFolderType,
        fileFolderName,
        fileFolderID,
    ) => {
        return ({
            type: actionTypes.DOCUMENTS_OPEN_ADD_MODAL,
            payload: {
                isAddModalOpen: true,
                selectedModalFolderFileType: fileFolderType,
                selectedModalActionType: 'rename',
                modalInputValueToEdit: fileFolderName,
                fileFolderIDToEdit: fileFolderID
            }
        });
    };
    
    onSubmitRenameFileFolder: DocumentNS.IActionCreators['onSubmitRenameFileFolder'] = (
        fileFolderName
    ) => async(dispatch, getState) => {
        const documents = _.cloneDeep(getState().Documents.documentsData);
        const {fileFolderIDToEdit} = getState().Documents;
        const {selectedModalFolderFileType} = getState().Documents;
        const selectedFolder = getState().Documents.selectedFolder;

        if(selectedFolder){
            if(selectedModalFolderFileType === 'folder' && selectedFolder){
                documents[fileFolderIDToEdit].folderName = fileFolderName;
            }else{
                const fileNameFormat = fileFolderName.split('.');
                documents[selectedFolder.folderID].files[fileFolderIDToEdit].fileName = fileNameFormat[0];
                documents[selectedFolder.folderID].files[fileFolderIDToEdit].fileType = fileNameFormat[1];
            };
            this.dispatchActionToSetInitialData(
                dispatch,
                documents,
                selectedFolder.folderID,
                getState().Documents.routes,
            );
        }
    };

    duplicateFileFolder: DocumentNS.IActionCreators['duplicateFileFolder'] = (
        fileFolderType,
        fileFolderID,
    ) => async(dispatch, getState) => {
        const documents = _.cloneDeep(getState().Documents.documentsData);
        const uniqueID = Date.now().toString();
        const selectedFolder = getState().Documents.selectedFolder;
        if(selectedFolder){
            if(fileFolderType === 'folder') {
                const duplicateFolder = JSON.stringify(documents[fileFolderID]);
                documents[uniqueID] = JSON.parse(duplicateFolder);
                documents[uniqueID].folderID = uniqueID;
            }else{
                const duplicateFile = JSON.stringify(documents[selectedFolder.folderID].files[fileFolderID]);
                documents[selectedFolder.folderID].files[uniqueID] = JSON.parse(duplicateFile);
                documents[selectedFolder.folderID].files[uniqueID].fileID = uniqueID;
            }
            this.dispatchActionToSetInitialData(
                dispatch,
                documents,
                selectedFolder.folderID,
                getState().Documents.routes,
            );
        }
    }

    SetDeleteModalOpen: DocumentNS.IActionCreators['SetDeleteModalOpen'] = (
        isDeleteModalOpen,
    ) => async(dispatch, getState) => {
        dispatch({
            type: actionTypes.DOCUMENTS_OPEN_DELETE_MODAL,
            payload: {
                isDeleteModalOpen: isDeleteModalOpen,
                selectedModalActionType: 'delete',
                selectedModalFolderFileType: getState().Documents.selectedModalFolderFileType,
                modalInputValueToDelete: getState().Documents.modalInputValueToEdit,
                fileFolderIDToDelete: getState().Documents.fileFolderIDToEdit,
            }
        });
    }

    onClickDeleteFileFolder: DocumentNS.IActionCreators['onClickDeleteFileFolder'] = (
        fileFolderType,
        fileFolderID,
        fileFolderName,
    ) => {
        return ({
            type: actionTypes.DOCUMENTS_OPEN_DELETE_MODAL,
            payload: {
                isDeleteModalOpen: true,
                selectedModalActionType: 'delete',
                selectedModalFolderFileType: fileFolderType,
                modalInputValueToDelete: fileFolderName,
                fileFolderIDToDelete: fileFolderID,
            }
        })
    }

    onDeleteFileFolder: DocumentNS.IActionCreators['onDeleteFileFolder'] = (
    ) => async(dispatch, getState) => {
        const documents = _.cloneDeep(getState().Documents.documentsData);
        const fileFolderType = getState().Documents.selectedModalFolderFileType;
        const selectedFolder = getState().Documents.selectedFolder;
        const fileFolderIDToDelete = getState().Documents.fileFolderIDToEdit;
        if(selectedFolder){
            if(fileFolderType === 'folder') {
                delete documents[fileFolderIDToDelete];
                _.map(documents, (eachDocument) => {
                    if(_.includes(eachDocument.parentIDs, fileFolderIDToDelete)){
                        delete documents[eachDocument.folderID];
                    }
                });
            }else {
                delete documents[selectedFolder['folderID']].files[fileFolderIDToDelete];
            }
            this.dispatchActionToSetInitialData(
                dispatch,
                documents,
                selectedFolder.folderID,
                getState().Documents.routes,
            );
        }
    }

    onClickFolder: DocumentNS.IActionCreators['onClickFolder'] = (
        folderID
    ) => async(dispatch, getState) => {
        let routes = _.cloneDeep(getState().Documents.routes);
            const newRoute = {
                id: folderID,
                name: getState().Documents.documentsData[folderID].folderName,
            };
        routes.push(newRoute);
        this.dispatchActionToSetInitialData(
            dispatch,
            getState().Documents.documentsData,
            folderID,
            routes,
        );
    }

    onClickRoute: DocumentNS.IActionCreators['onClickRoute'] = (
        folderID,
        index
    ) => async(dispatch, getState) => {
        let routes = _.cloneDeep(getState().Documents.routes);
        const newRoutes = routes.slice(0, index+1);
        this.dispatchActionToSetInitialData(
            dispatch,
            getState().Documents.documentsData,
            folderID,
            newRoutes,
        );
    }

    onSearchData: DocumentNS.IActionCreators['onSearchData'] = (
        searchValue
    ) => async(dispatch, getState) => {
        const selectedFolder = _.cloneDeep(getState().Documents.selectedFolder);
        const subFolders = _.cloneDeep(getState().Documents.subFolders);

        if(selectedFolder) {
            
            const filteredSelectedFolderFiles = _.filter(selectedFolder?.files, (
                eachFile
            ) => _.includes(_.toLower(eachFile.fileName), _.toLower(searchValue)));

            selectedFolder.files = {};
            
            _.map(filteredSelectedFolderFiles, (eachFile) => {
                selectedFolder.files[eachFile.fileID] = {
                    fileID:  eachFile.fileID,
                    fileName: eachFile.fileName,
                    fileType: eachFile.fileType,
                }
            });
    
            const filteredSelectedSubFolders = _.filter(subFolders, (
                eachSubFolder
            ) => _.includes(_.toLower(eachSubFolder.folderName), _.toLower(searchValue)));
            
            dispatch({
                type: actionTypes.DOCUMENTS_SET_SEARCH_DATA,
                payload: {
                    subFoldersCopy: filteredSelectedSubFolders,
                    selectedFolderCopy: selectedFolder,
                }
            })
        }
    }
};

export default new ActionCreators();