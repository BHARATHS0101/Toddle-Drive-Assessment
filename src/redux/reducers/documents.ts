import {Reducer} from 'redux';

const initialState: DocumentNS.IState = {
    documentsData: {},
    selectedFolder: null,
    subFolders: [],
    isAddModalOpen: false,
    isDeleteModalOpen: false,
    isRenameModalOpen: false,
    selectedModalActionType: 'create',
    selectedModalFolderFileType: 'folder',
    modalInputValueToEdit: '',
    routes: [],
    fileFolderIDToEdit: '',
    selectedFolderCopy: null,
    subFoldersCopy: [],
};

const reducer:Reducer<
    DocumentNS.IState,
    DocumentNS.AllActions
> = (state = initialState, action) => {
    switch (action.type) {

        case 'DOCUMENTS_SET_INITIAL_DATA':
            return {
                ...state,
                selectedFolder: action.payload.selectedFolder,
                selectedFolderCopy: action.payload.selectedFolder,
                documentsData: action.payload.documentsData,
                subFolders: action.payload.subFolders,
                subFoldersCopy: action.payload.subFolders,
                routes: action.payload.routes,
                isAddModalOpen: false,
                isDeleteModalOpen: false,
                isRenameModalOpen: false,
                selectedModalActionType: 'create',
                selectedModalFolderFileType: 'folder',
                modalInputValueToEdit: '',
            }

        case 'DOCUMENTS_OPEN_ADD_MODAL':
            return {
                ...state,
                isAddModalOpen: action.payload.isAddModalOpen,
                selectedModalActionType: action.payload.selectedModalActionType,
                selectedModalFolderFileType: action.payload.selectedModalFolderFileType,
                modalInputValueToEdit: action.payload.modalInputValueToEdit,
                fileFolderIDToEdit: action.payload.fileFolderIDToEdit,
            }
            
        case 'DOCUMENTS_OPEN_DELETE_MODAL':
            return {
                ...state,
                isDeleteModalOpen: action.payload.isDeleteModalOpen,
                selectedModalActionType: action.payload.selectedModalActionType,
                selectedModalFolderFileType: action.payload.selectedModalFolderFileType,
                modalInputValueToEdit: action.payload.modalInputValueToDelete,
                fileFolderIDToEdit: action.payload.fileFolderIDToDelete,
            }    
          
        case 'DOCUMENTS_SET_SEARCH_DATA':
            return {
                ...state,
                selectedFolderCopy: action.payload.selectedFolderCopy,
                subFoldersCopy: action.payload.subFoldersCopy
            }    

        default:
            return {
                ...state,
            }
    }
};

export default reducer;