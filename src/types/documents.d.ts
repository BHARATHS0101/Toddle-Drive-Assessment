declare namespace DocumentNS {

    type ModalFolderFileType = 'folder' | 'file';
    type ModalActionType = 'create' | 'rename' | 'delete';

    interface IFile {
        fileID: string;
        fileName: string;
        fileType: string;
    }

    interface IFiles {
        [key:string]: IFile
    }
    
    interface IFolder {
        folderName: string;
        folderID: string;
        files: IFiles;
        parentID: string | null;
    }

    interface IDocuments {
        [key:string]: IFolder;
    }

    interface IRoutes {
        id: string;
        name: string;
    }

    interface IState {
        documentsData: IDocuments;
        selectedFolder: IFolder | null;
        subFolders: IFolder[];
        selectedFolderCopy: IFolder | null;
        subFoldersCopy: IFolder[];
        isAddModalOpen: boolean;
        isDeleteModalOpen: boolean;
        isRenameModalOpen: boolean;
        selectedModalFolderFileType: ModalFolderFileType;
        selectedModalActionType: ModalActionType;
        modalInputValueToEdit: string;
        routes: IRoutes[];
        fileFolderIDToEdit: string;
    }

    interface IActionTypes {
        DOCUMENTS_SET_INITIAL_DATA: 'DOCUMENTS_SET_INITIAL_DATA';
        DOCUMENTS_OPEN_ADD_MODAL: 'DOCUMENTS_OPEN_ADD_MODAL';
        DOCUMENTS_OPEN_DELETE_MODAL: 'DOCUMENTS_OPEN_DELETE_MODAL';
        DOCUMENTS_SET_SEARCH_DATA: 'DOCUMENTS_SET_SEARCH_DATA';
    }

    interface IATSetInitialData {
        type: IActionTypes['DOCUMENTS_SET_INITIAL_DATA'];
        payload: {
            documentsData: IDocuments;
            selectedFolder: IFolder | null;
            subFolders: IFolder[];
            routes: IRoutes[];
        }
    }

    interface IATSetAddModalOpen {
        type: IActionTypes['DOCUMENTS_OPEN_ADD_MODAL'];
        payload: {
            isAddModalOpen: boolean;
            selectedModalFolderFileType: ModalFolderFileType;
            selectedModalActionType: ModalActionType;
            modalInputValueToEdit: string;  
            fileFolderIDToEdit: string; 
        }
    }

    interface IATSetDeleteModalOpen {
        type: IActionTypes['DOCUMENTS_OPEN_DELETE_MODAL'];
        payload: {
            isDeleteModalOpen: boolean;
            selectedModalFolderFileType: ModalFolderFileType;
            selectedModalActionType: ModalActionType;
            modalInputValueToDelete: string;
            fileFolderIDToDelete: string;
        }
    }

    interface IATSetSearchData {
        type: IActionTypes['DOCUMENTS_SET_SEARCH_DATA'];
        payload: {
            selectedFolderCopy: IFolder | null;
            subFoldersCopy: IFolder[];
        }
    }

    type AllActions =
        | IATSetInitialData
        | IATSetAddModalOpen
        | IATSetDeleteModalOpen
        | IATSetSearchData;

    interface IActionCreators {
        setInitialData: (
        ) => ReduxNS.IThunkFunction<AllActions>;
        setAddModalOpen: (
            isModalOpen: boolean,
        ) => ReduxNS.IThunkFunction<AllActions>;
        onClickAddFileFolder: (
            fileFolderType: ModalFolderFileType,
        ) => IATSetAddModalOpen;
        onClickRenameFileFolder: (
            fileFolderType: ModalFolderFileType,
            fileFolderName: string,
            fileFolderID: string,
        ) => IATSetAddModalOpen;
        onSubmitAddFileFolder: (
            fileFolderName: string,
        ) => ReduxNS.IThunkFunction<AllActions>;
        onSubmitRenameFileFolder: (
            folderName: string,
        ) => ReduxNS.IThunkFunction<AllActions>;
        duplicateFileFolder: (
            fileFolderType: ModalFolderFileType,
            fileFolderID: string,
        ) => ReduxNS.IThunkFunction<AllActions>;
        SetDeleteModalOpen: (
            isDeleteModalOpen: boolean,
        ) => ReduxNS.IThunkFunction<AllActions>;
        onClickDeleteFileFolder: (
            fileFolderType: ModalFolderFileType,
            fileFolderID: string,
            fileFolderName: string,
        ) => IATSetDeleteModalOpen;
        onDeleteFileFolder: () => ReduxNS.IThunkFunction<AllActions>;
        onClickFolder: (
            folderID: string,
        ) => ReduxNS.IThunkFunction<AllActions>;
        onClickRoute: (
            folderID,
            index: number,
        ) => ReduxNS.IThunkFunction<AllActions>;
        onSearchData: (
            searchValue: string,
        ) => ReduxNS.IThunkFunction<AllActions>;
    }

    interface IFolderProps {
        subFolders: IFolder[];
        selectedFolder: IFolder | null;
    }

    interface IAddModalProps {
        folderFileType: ModalFolderFileType;
        action: ModalActionType;
        inputValue: string;
        isModalOpen: boolean;
        onSubmit: (...args:any) => void;
    }
}