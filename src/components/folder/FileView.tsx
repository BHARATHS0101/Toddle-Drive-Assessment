import React from 'react';

import './Folder.css';

const FileView:React.FC<CommonComponentsNS.IFileViewProps> = (props) => {

    const fileViewClass = props.type!=='folder'?'marginTop':null;
    
    return (
        <div className={`fileView ${fileViewClass}`}>
            {`${props.numberOfFiles} ${props.type}${props.numberOfFiles>1?'s':''}`}
            <div className={'fileDisplayContainer'}>
                {props.children}
            </div>
        </div>
    );
};

export default FileView;