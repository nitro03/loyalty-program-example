import React from 'react';
import Search from "../../components/Search/Search";
import './scss/home.scss';

const Home = () => {
    return (
        <div className={"home__container"}>
            <Search/>
        </div>
    );
};

export default Home;