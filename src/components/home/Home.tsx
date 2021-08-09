import React from 'react';

import Search from '../search';

import './Home.css';

const Home = () => {

    return (
        <div className={'mainContainer'}>
            <div className={'header'}>
            </div>
            <div className={'content'}>
                <Search
                    dataToFilter={''}
                    keyToSearch={'hello'}
                />  
            </div>
        </div>
    );
};

export default Home;
