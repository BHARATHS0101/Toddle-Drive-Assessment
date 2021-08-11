import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {truncate} from 'lodash';

import actionCreators from '../../redux/actionCreators/documents';

import './Folder.css';

import Dots from '../../images/dots.svg';
import Edit from '../../images/edit.svg';
import Delete from '../../images/delete.svg';
import Duplicate from '../../images/duplicate.svg';

const FileDisplayFooter = (props: CommonComponentsNS.IFileDisplayFooterProps) => {

    const [displayCard, setDisplayCard] = useState(false);

    const dispatch = useDispatch();

    const dispatchActionToSetRenameData = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        dispatch(actionCreators.onClickRenameFileFolder(
            props.type, 
            `${props.fileName}${props.fileType?'.'+props.fileType:''}`, 
            props.fileID
        ));
        setDisplayCard(false);
        e.stopPropagation();    
    };

    const dispatchActionToDuplicateFileFolder = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        dispatch(actionCreators.duplicateFileFolder(
            props.type,
            props.fileID
        ));
        setDisplayCard(false);
        e.stopPropagation(); 
    };

    const dispatchActionToDeleteFileFolder = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        dispatch(actionCreators.onClickDeleteFileFolder(
            props.type,
            props.fileID,
            `${props.fileName}${props.fileType?'.'+props.fileType:''}`,
        ));
        setDisplayCard(false);
        e.stopPropagation(); 
    };

    const handleOnClickDots = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();
        displayCard ? setDisplayCard(false):setDisplayCard(true);
    };

    const FooterContent = props.type!=='folder'? (
        <div className={'fileDisplayFooterContent'}>
            <div className={'fileTypeColor'}>
                {props.fileType?.toUpperCase()}
            </div>
            {truncate(props.fileName, {length:24})}
        </div>
    ):(
        <div className={'fileDisplayFooterContent'}>
            {truncate(props.fileName, {length: 24})}
        </div>
    );

    return (
        <div className={'fileDisplayFooter'}>
            {FooterContent}
            <img 
                src={Dots} 
                alt={'Dots'} 
                onClick={handleOnClickDots}
                className={displayCard? 'dotsImage': ''}
                id={'dotsImage'}
            />
            {displayCard && 
                <div className={'overlayCard'}>
                    <div className={'overlayItems'} onClick={dispatchActionToSetRenameData}>
                        <img src={Edit} alt={'Edit'}/>
                        {`Rename ${props.type}`}
                    </div>
                    <div className={'overlayItems'} onClick={dispatchActionToDuplicateFileFolder}>
                        <img src={Duplicate} alt={'Duplicate'}/>
                        {`Duplicate ${props.type}`}
                    </div>
                    <div className={'overlayItems deleteItem'} onClick={dispatchActionToDeleteFileFolder}>
                        <img src={Delete} alt={'Delete'}/>
                        {`Delete ${props.type}`}
                    </div>
                </div>
            }
        </div>  
    );
};

export default FileDisplayFooter;
