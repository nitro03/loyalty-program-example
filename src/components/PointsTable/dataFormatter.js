import {calculatePoints} from "../../logic/pointsCalculator";

export const formatData = (data) => {
    if (data && Array.isArray(data)) {
        return data.map((row) => {
            return formatDateColumn(formatAmountColumn(addPointsColumn(row)));
        });
    }
    console.error('data is not an array');
    return data;
}

const addPointsColumn = (row) => {
    return {
        ...row,
        points: calculatePoints(row.amount)
    }
}

const formatAmountColumn = (row) => {
    const {amount} = row;
    return {
        ...row,
        amount: `${amount} $`
    }
}

const formatDateColumn = (row) => {
    const {date} = row;
    const newDate = date.split("T")[0];
    return {
        ...row,
        date: newDate
    }
}