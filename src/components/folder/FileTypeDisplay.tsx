import React from 'react';

import './Folder.css';

import Folder from '../../images/folder.svg';
import PDF from '../../images/pdf.svg';
import Text from '../../images/text.svg';
import PPT from '../../images/ppt.svg';

const FileTypeDisplay = (props: CommonComponentsNS.IFileTypeDisplayProps) => {
    
    const getBackgroundColorStyle = () => {
        switch(props.fileType){
            case 'pdf':
                return {
                    style: 'pdf',
                    imagePath: PDF,
                };
            case 'doc':
                return {
                    style: 'text',
                    imagePath: Text,
                };    
            case 'txt':
                return {
                    style: 'text',
                    imagePath: Text,
                };  
            case 'ppt':
                return {
                    style: 'ppt',
                    imagePath: PPT,
                };
            default :
                return {
                    style: '',
                    imagePath: Folder,
                };
        };
    };

    return (
        <div className={`fileDisplay ${getBackgroundColorStyle().style}`}>
            <img src={getBackgroundColorStyle().imagePath} alt={'fileImage'}/>
        </div>
    )
};

export default React.memo(FileTypeDisplay);