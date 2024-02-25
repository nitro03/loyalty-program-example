import {calculatePoints} from "../../../logic/pointsCalculator";

const MONTH_PARSE_ERROR_MSG = 'Cannot get month from:';
export const addPointsColumn = (row) => {
    return {
        ...row,
        points: calculatePoints(row.amount)
    }
}

export const formatAmountColumn = (row) => {
    const {amount} = row;
    return {
        ...row,
        amount: `${amount} $`
    }
}

export const formatDateColumn = (row) => {
    const {date} = row;
    const newDate = date.split("T")[0];
    return {
        ...row,
        date: newDate
    }
}

export const getTransactionMonth = (row) => {
    const {date} = row;
    const newDate = date.split("T")[0];
    const dateParts = newDate.split('-');
    if (dateParts.length === 3) {
        return `${dateParts[0]}-${dateParts[1]}`;
    }
    console.error(MONTH_PARSE_ERROR_MSG, row);
    return '';
}

export const getSortedMonthsArray = (months) => {
    const keys = Object.keys(months);
    keys.sort();
    return keys.map((key) => {
        return {
            month: key,
            points: months[key]
        }
    })
}

export const sortTransactionsByDateAsc = (rows) => {
    const comparator = (a, b) => {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    }

    return rows.sort(comparator);
}