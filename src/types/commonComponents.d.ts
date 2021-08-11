declare namespace CommonComponentsNS {
    
    interface ICommonButtonProps {
        disabled: boolean;
        onClick: (...args:any) => void;
        buttonStyle?: string; 
        name?: string;
    }

    interface IModalProps {
        isModalOpen: boolean;
        modalStyle?: string;
        headerName: string;
        isShowCancelIcon: boolean;
        onClickCancelIcon?: (...args:any) => void;
    }

    interface ISearchProps {
        onSearchFunction : (...args:any) => void;
    }

    interface IFileViewProps {
        type: DocumentNS.ModalFolderFileType;
        numberOfFiles: number; 
    }

    interface IFileTypeDisplayProps {
        fileType?: string;
    }

    interface IRoutes {
        id: string;
        name: string;
    }

    interface IBreadCrumbProps {
        routes: IRoutes[];
    }

    interface IFileDisplayFooterProps {
        type: DocumentNS.ModalFolderFileType;
        fileName: string;
        fileID: string;
        fileType?: string;
    }

}