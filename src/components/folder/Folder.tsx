import React from 'react';
import {useDispatch} from 'react-redux';
import _ from 'lodash';

import actionCreators from '../../redux/actionCreators/documents';
import CommonButton from '../commonButton';
import Search from '../search';
import FileView from './FileView';
import FileTypeDisplay from './FileTypeDisplay';
import FileDisplayFooter from './FileDisplayFooter';

import './Folder.css';

const Folder = (props: DocumentNS.IFolderProps) => {

    const numberOfFiles = _.size(props.selectedFolder?.files);
    const numberOfFolders = props.subFolders.length;

    const dispatch = useDispatch();

    const dispatchActionToAddFileFolder = (fileFolderType: DocumentNS.ModalFolderFileType) => {
        dispatch(actionCreators.onClickAddFileFolder(fileFolderType));
    };

    const dispatchActionToOpenFolder = (folderID: string) => {
        dispatch(actionCreators.onClickFolder(folderID));
    };

    const disptachAtcionToSearchFilesFolders = (searchValue: string) => {
        dispatch(actionCreators.onSearchData(searchValue));
    }

    return (
        <>
            <div className={'folderHeaderContainer'}>
                {props.selectedFolder?props.selectedFolder.folderName: '--'}
                <div>
                    <CommonButton
                        disabled={false}
                        onClick={() => dispatchActionToAddFileFolder('folder')}
                        name={'New folder'}
                        buttonStyle={'newFolderButton'}
                    />
                    <CommonButton
                        disabled={false}
                        onClick={() => dispatchActionToAddFileFolder('file')}
                        name={'New file'}
                    />
                </div>
            </div>

            <div className={'folderInfoText'}>
                {`${numberOfFolders} 
                    ${numberOfFolders > 1 ? 'folders':'folder'}, 
                    ${numberOfFiles} 
                    ${numberOfFiles > 1 ? 'files': 'file'}`}
            </div>

            <Search
                onSearchFunction={disptachAtcionToSearchFilesFolders}
            />

            {numberOfFolders > 0 && 
                <FileView 
                    type={'folder'}
                    numberOfFiles={numberOfFolders}
                >
                {_.map(props.subFolders, (eachSubFolder, index) => {
                    return (
                        <div 
                            className={'file'} 
                            onClick={() => dispatchActionToOpenFolder(eachSubFolder.folderID)}
                            key={eachSubFolder.folderID}
                        >
                            <FileTypeDisplay/>
                            <FileDisplayFooter
                                type={'folder'} 
                                fileName={eachSubFolder.folderName}
                                fileID={eachSubFolder.folderID}
                            />
                        </div>
                    )
                })}
                </FileView>
            }

            {numberOfFiles > 0 && 
                <FileView 
                    type={'file'}
                    numberOfFiles={numberOfFiles}
                >
                {_.map(props.selectedFolder?.files, (eachFile, index) => {
                    return (
                        <div
                            className={'file'} 
                            key={eachFile.fileID}
                        >
                            <FileTypeDisplay
                                fileType={eachFile.fileType}
                            />
                            <FileDisplayFooter
                                type={'file'} 
                                fileName={eachFile.fileName}
                                fileID={eachFile.fileID}
                                fileType={eachFile.fileType}
                            />
                        </div>
                    )
                })}
                </FileView>
            }    
        </>
    );
};

export default Folder;