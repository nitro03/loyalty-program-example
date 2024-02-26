import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Autocomplete, Button, TextField} from "@mui/material";
import {Spinner} from "react-bootstrap";

import ApiCaller from "../../apiClient/apiCaller";
import {ALL_USERS_URL, USER_PATH} from "../../utils/paths";

import './scss/search.scss';

const SEARCHBOX_LABEL = 'Choose user';
const BTN_LABEL = 'Show user points';

const Search = () => {

    const [chosenUser, setChosenUser] = useState(null);
    const [userList, setUserList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        ApiCaller.fetchData({
                url: ALL_USERS_URL
            },
            onSuccess,
            onError)
    }, [userList]);

    const onSuccess = (data) => {
        setUserList(data);
        setIsLoading(false);
    }

    const onError = (e) => {
        console.error(e);
        setUserList([])
        setIsLoading(false);
    }

    const getUserList = () => {
        if (Array.isArray(userList)) {
            return userList.map((user) => {
                const {firstName, lastName} = user;
                return {
                    id: user.id,
                    label: `${firstName} ${lastName}`
                }
            })
        }
        return [];
    }

    const getBtnHref = () => {
        if (chosenUser) {
            return USER_PATH.replace(':id', chosenUser.id);
        }
    }
    const btnOnClick = () => {
        navigate(getBtnHref());
    }

    const handleChange = (event, element) => {
        setChosenUser(element);
    }

    const renderLoader = () => {
        return <Spinner/>
    }
    const renderSearch = () => {
        return (
            <>
                <div className={"search__searchbox"}>
                    <Autocomplete
                        id="auto-complete"
                        autoComplete
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        options={getUserList()}
                        renderInput={(params) => (
                            <TextField {...params} label={SEARCHBOX_LABEL} variant="standard"/>
                        )}
                        onChange={handleChange}
                    />
                </div>
                <div className={"search__button"}>
                    <Button disabled={!chosenUser} onClick={btnOnClick} variant="outlined">
                        {BTN_LABEL}
                    </Button>
                </div>
            </>
        );
    }
    return (
        <div className={"search__container"}>
            {isLoading ? renderLoader() : renderSearch()}
        </div>
    );
};

export default Search;