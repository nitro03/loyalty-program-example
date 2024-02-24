import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

import Search from "../../components/Search/Search";
import {ALL_USERS_PATH} from "../../utils/paths";
import './scss/home.scss';

const All_TRANSACTION_BTN_LABEL = 'Show all users'
const Home = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(ALL_USERS_PATH);
    }
    return (
        <div className={"home--container"}>
            <Search/>
            <div className={"home--all_transactions_btn"}>
                <Button onClick={onClick}>
                    {All_TRANSACTION_BTN_LABEL}
                </Button>
            </div>
        </div>
    );
};

export default Home;