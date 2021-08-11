import React, {useState, useCallback} from "react";
import _ from 'lodash';

import './Search.css';

import SearchIcon from '../../images/searchIcon.svg';
import Cancel from '../../images/cancel.svg';

const Search = (props: CommonComponentsNS.ISearchProps) => {

    const [showCancelIcon, setShowCancelIcon] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');

    const debounceFunction = useCallback(_.debounce(
        (searchValue : string) => {
            props.onSearchFunction(searchValue);
    }, 400), []); 

    const handleOnChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        debounceFunction(e.target.value);
        if(e.target.value.length > 0){
            setShowCancelIcon(true);
        }else {
            setShowCancelIcon(false);
        };
    };

    const handleOnClickCancel = () => {
        setInputValue('');
        props.onSearchFunction('');
        setShowCancelIcon(false);
    }

    return (
        <div className={'searchContainer'}>
            <img src={SearchIcon} alt={'SearchIcon'}/>
            <input
                type={'text'}
                className={'inputBox'}
                value={inputValue}
                placeholder={'Search for a folder or file'}
                onChange={handleOnChangeInput}
            />
            {showCancelIcon &&             
                <img src={Cancel} 
                    className={'cancelIcon'} 
                    alt={'Cancel'}
                    onClick={handleOnClickCancel}
                />
            }
        </div>
    );
};

export default Search;