import React from "react";
import _ from 'lodash';

import Search from "../search";

import './SkeletonLoader.css';

const SkeletonLoader = () => {
    return (
        <div className={'skeletonMainContainer'}>
            <div className={'skeletonHeaderContent'}>
                <div className={'skeletonHeader'}></div>
                <div className={'skeletonButtonsContainer'}>
                    <div className={'skeletonCreateFile'}>
                        {'New File'}
                    </div>
                    <div className={'skeletonCreateFolder'}>
                        {'New Folder'}
                    </div>
                </div>
            </div>
            <div className={'skeletonFileFolder'}></div>
            <Search onSearchFunction={() => null}/>
            <div className={'skeletonContent'}>
                <div className={'skeletonFoldersContainer'}>
                    <div className={'skeletonFileFolder'}></div>
                    <div className={'skeletonFolders'}>
                        {_.map([1,2,3,4], (each, index) => {
                        return (
                            <div className={'skeletonFolderOutline'} key={index}>
                                <div className={'skeletonFolderImageContainer'}>
                                    <div className={'skeletonFolderImage'}></div>
                                    <div className={'skeletonFolderType'}></div>
                                    <div className={'skeletonFolderName'}></div>
                                </div>
                            </div>
                        );
                        })}
                    </div>
                </div>
                <div className={'SkeletonFoldersContainer'}>
                    <div className={'skeletonFileFolder'}></div>
                    <div className={'skeletonFolders'}>
                        {_.map([1,2,3,4], (each, index) => {
                        return (
                            <div className={'skeletonFolderOutline'} key={index}>
                                <div className={'skeletonFolderImageContainer'}>
                                    <div className={'skeletonFolderImage'}></div>
                                    <div className={'skeletonFolderType'}></div>
                                    <div className={'skeletonFolderName'}></div>
                                </div>
                            </div>
                        );
                        })}
                    </div>
                </div>
            </div>
            <div className={'animationContainer'}>
                <div className={'animation'}></div>
            </div>
        </div>
    )
};

export default SkeletonLoader;