import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

import './scss/pointsPage.scss';
import ApiCaller from "../../apiClient/apiCaller";
import {Spinner} from "react-bootstrap";
import TimePeriodChooser from "../../components/TimePeriodChooser/TimePeriodChooser";
import TransactionsTable from "./TransactionsTable";
import {Button} from "@mui/material";
import {GET_TRANSACTIONS_ENDPOINT} from "../../simulatedAPI/fakeServer";
import TableData from "./logic/TableData";
import PointsSummary from "./PointsSummary";
import MonthlyPointsTable from "./MonthlyPointsTable";

const HEADER_TITLE = ' points'
const HEADER_TITLE_ALL_USERS = 'All users points';
const BACK_BTN_LABEL = 'Back to search';
const PointsPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [transactionsData, setTransactionsData] = useState(null);
    const [pointsSummary, setPointsSummary] = useState(0);
    const [monthlyPointsData, setMonthlyPointsData] = useState(null);
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
                setTransactionsData(tableData.getTransactionsData());
                setPointsSummary(tableData.getSumOfPoints());
                setMonthlyPointsData(tableData.getPointsDataByMonth());
                setIsLoading(false);
            },
            (e) => {
                alert(e);
                setTransactionsData(null)
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

    const renderData = () => {
        return (
            <>
                <TransactionsTable data={transactionsData}/>
                <div className="points_page--points_summary">
                    <MonthlyPointsTable data={monthlyPointsData}/>
                    <PointsSummary points={pointsSummary}/>
                </div>
            </>
        );
    }

    return (
        <div className={"points_page--container"}>
            {renderHeader()}
            <div className="points_page--table_container">
                <TimePeriodChooser onDateChange={onDateChange}/>
                {isLoading ? renderLoader() : renderData()}
            </div>
        </div>
    );
};

export default PointsPage;