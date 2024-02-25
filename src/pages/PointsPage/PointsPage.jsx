import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

import './scss/pointPage.scss';
import ApiCaller from "../../apiClient/apiCaller";
import {Spinner} from "react-bootstrap";
import TimePeriodChooser from "../../components/TimePeriodChooser/TimePeriodChooser";
import PointsTable from "../../components/PointsTable/PointsTable";
import {Button} from "@mui/material";
import {GET_TRANSACTIONS_ENDPOINT} from "../../simulatedAPI/fakeServer";
import TableData from "../../components/PointsTable/TableData";
import PointsSummary from "../../components/PointsTable/PointsSummary";

const HEADER_TITLE = ' points'
const HEADER_TITLE_ALL_USERS = 'All users points';
const BACK_BTN_LABEL = 'Back to search';
const PointsPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState(null);
    const [pointsSummary, setPointsSummary] = useState(0);
    const [dateFilter, setDateFilter] = useState(null);
    const [userData, setUserData] = useState(null);


    const createDateFilterParams = () => {
        if (dateFilter) {
            const {dateFrom, dateTo} = dateFilter;
            let queryString = '';
            if (dateFrom) {
                queryString += `dateFrom=${dateFrom}`
            }
            if (dateTo) {
                if (dateFrom) {
                    queryString += "&";
                }
                queryString += `dateTo=${dateTo}`
            }
            return queryString;
        }
        return '';
    }

    const getTableDataUrl = () => {
        if (!id) {
            //for all users
            const paramsString = createDateFilterParams()
            return paramsString ? `${GET_TRANSACTIONS_ENDPOINT}?${paramsString}` : GET_TRANSACTIONS_ENDPOINT;
        }
        const paramsString = createDateFilterParams()
        const urlForUsersTransactions = `${GET_TRANSACTIONS_ENDPOINT}?userId=${id}`;
        return paramsString ? `${urlForUsersTransactions}&${paramsString}` : urlForUsersTransactions;

    }

    const getTableData = () => {
        setIsLoading(true);
        const url = getTableDataUrl();
        ApiCaller.fetchData({
                url
            },
            (data) => {
                const tableData = new TableData(data);
                setTableData(tableData.getFormattedData());
                setPointsSummary(tableData.getSumOfPoints());
                setIsLoading(false);
            },
            (e) => {
                alert(e);
                setTableData(null)
                setIsLoading(false);
            })
    };
    const getUserData = () => {
        if (id) {
            const url = `/rest/api/users?id=${id}`
            ApiCaller.fetchData({
                    url
                },
                (user) => {
                    const {firstName, lastName} = user[0];
                    const userData = {
                        name: `${firstName} ${lastName}`
                    };
                    setUserData(userData);
                },
                (err) => {
                    console.error('Cannot get user data', err)
                    setUserData({name: 'unknown'});
                })
        }
    };

    const onDateChange = useCallback((date) => {
        setDateFilter(date);
    }, [setDateFilter]);

    useEffect(() => {
        getUserData();
    }, [])

    useEffect(() => {
        getTableData();
    }, [dateFilter]);

    const renderHeader = () => {
        const title = userData ? `${userData.name} ${HEADER_TITLE}` : HEADER_TITLE_ALL_USERS
        const backBtnOnCLick = () => {
            navigate('/');
        }
        return (
            <div className="points_page--header">
                <h2>{title}</h2>
                <Button onClick={backBtnOnCLick}>{BACK_BTN_LABEL}</Button>
            </div>
        )
    }

    const renderLoader = () => {
        return (
            <div className="points_page--spinner">
                <Spinner/>
            </div>
        );
    }

    const renderTable = () => {
        return <PointsTable data={tableData}/>;
    }

    return (
        <div className={"points_page--container"}>
            {renderHeader()}
            <div className="points_page--table_container">
                <TimePeriodChooser onDateChange={onDateChange}/>
                {isLoading ? renderLoader() : renderTable()}
                <PointsSummary points={pointsSummary}/>
            </div>
        </div>
    );
};

export default PointsPage;