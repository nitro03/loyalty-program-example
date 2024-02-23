import allUsers from '../data/users.json';
import allTransactions from '../data/transactions.json';
import {getTimestamp, isTimestamp} from "../utils/dateUtils";

const WRONG_DATE_FORMAT_MSG = 'Date is not in timestamp format';

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
        const transactionsList = user.transactions;

        transactionsList.forEach((id) => {
            result.push(getTransactionById(id));
        });
    })
    if (dateFrom) {
        return filterByDate(result, Number(dateFrom?.[0]), Number(dateTo?.[0]));
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
            if (!isTimestamp(dateTo) || dateFrom > dateTo) {
                throw new Error(`dateTo - ${WRONG_DATE_FORMAT_MSG}`);
            }
            return transactionDate >= dateFrom && transactionDate <= dateTo;
        }
        return transactionDate >= dateFrom;
    });
};

const getUserData = (queryParams) => {
    if (queryParams) {
        return searchUsers(queryParams.id);
    }
    return {
        code: 200,
        data: allUsers
    };
};
const getTransactionsData = (queryParams) => {
    if (queryParams) {
        return searchTransactions(queryParams.userId, queryParams.dateFrom, queryParams.dateTo);
    }
    return {
        code: 200,
        data: allTransactions
    };
};


export {
    getUserData,
    getTransactionsData
};