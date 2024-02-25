import React from 'react';
import Search from "../../components/Search/Search";
import './scss/home.scss';

const Home = () => {
    return (
        <div className={"home--container"}>
            <Search/>
        </div>
    );
};

export default Home;