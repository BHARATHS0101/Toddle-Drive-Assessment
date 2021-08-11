import React from 'react';
import {map} from 'lodash';
import { useDispatch } from 'react-redux';

import actionCreators from '../../redux/actionCreators/documents';

import './BreadCrumb.css';

import Toddle from '../../images/toddle.svg';
import LeftArrow from '../../images/leftArrow.svg';
import RightArrow from '../../images/rightArrow.svg';


const BreadCrumb = (props: CommonComponentsNS.IBreadCrumbProps) => {

    const dispatch = useDispatch();

    const dispatchActionToNavigateToFolder = (folderID: string, index: number) => { 
        if(index < props.routes.length){
            dispatch(actionCreators.onClickRoute(folderID, index));
        }
    };

    return (
        <div className={'breadCrumbContainer'}>
            <img src={LeftArrow} alt={'LeftArrow'}/>
            <img src={Toddle} alt={'Toddle'}/>
            {map(props.routes, (eachRoute, index) => {
                return (
                    <div key={eachRoute.id} className={'displayFlexRow'}>
                        {index > 0 && <img src={RightArrow} alt={'RightArrow'}/>}
                        <div 
                            onClick={() => dispatchActionToNavigateToFolder(eachRoute.id, index)}
                            className={`${props.routes.length === index+1?'activeColor':''} `}
                        >
                            {`${eachRoute.name}`}
                        </div>
                    </div>    
                );
            })}
        </div>
    )
};

export default BreadCrumb;