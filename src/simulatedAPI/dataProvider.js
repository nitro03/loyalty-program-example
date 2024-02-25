import allUsers from '../data/users.json';
import allTransactions from '../data/transactions.json';
import {getTimestamp, isTimestamp} from "../utils/dateUtils";

const WRONG_DATE_FORMAT_MSG = 'Date is not in timestamp format';
const WRONG_DATES_ORDER = '"Date from" must be earlier than "Date to"';

const searchUsers = (usersIds) => {
    const result = []
    allUsers.forEach((user) => {
        (usersIds || []).forEach((id) => {
            if (user.id === id) {
                result.push(user);
            }
        })

    })
    return result;
};

const searchTransactions = (usersIds, dateFrom, dateTo) => {
    const result = []
    const users = searchUsers(usersIds)
    users.forEach((user) => {
        const {transactions} = user;

        transactions.forEach((id) => {
            result.push(getTransactionById(id));
        });
    })
    if (dateFrom) {
        return filterByDate(result, Number(dateFrom?.[0]), Number(dateTo?.[0]));
    }
    if (dateTo) {
        return filterByDate(result, 0, Number(dateTo?.[0]));
    }
    return result;
};

const getTransactionById = (id) => {
    return allTransactions.find((transaction) => {
        return transaction.id === id;
    })
}

const filterByDate = (transactions, dateFrom, dateTo) => {
    if (!isTimestamp(dateFrom)) {
        throw new Error(`dateFrom - ${WRONG_DATE_FORMAT_MSG}`);
    }
    return transactions.filter((transaction) => {
        const transactionDate = getTimestamp(transaction.date)
        if (dateTo) {
            if (!isTimestamp(dateTo)) {
                throw new Error(`dateTo - ${WRONG_DATE_FORMAT_MSG}`);
            }
            if(dateFrom > dateTo) {
                throw new Error(WRONG_DATES_ORDER);
            }
            return transactionDate >= dateFrom && transactionDate <= dateTo;
        }
        return transactionDate >= dateFrom;
    });
};

const getUserData = (queryParams) => {
    if (queryParams && Object.keys(queryParams).length !== 0) {
        return searchUsers(queryParams.id);
    }
    return allUsers;
};
const getTransactionsData = (queryParams) => {
    if (queryParams && Object.keys(queryParams).length !== 0) {
        const {userId, dateFrom, dateTo} = queryParams;
        return searchTransactions(userId, dateFrom, dateTo);
    }
    return allTransactions;
};


export {
    getUserData,
    getTransactionsData
};