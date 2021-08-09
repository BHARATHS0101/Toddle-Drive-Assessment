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
        inputHeaderName: string;
        buttonName: string;
        onClickButton: (...args:any) => void;
    }

    interface ISearchProps {
        dataToFilter: any;
        keyToSearch: string;
    }

}