import {calculatePoints} from "../../logic/pointsCalculator";

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

class TableData {
    constructor(data) {
        if (data && Array.isArray(data)) {
            this.data = data.map((row) => {
                return formatDateColumn(formatAmountColumn(addPointsColumn(row)));
            });
        } else {
            this.data = [];
            console.error('data is not an array');
        }
    }

    getFormattedData() {
        return this.data;
    }

    getSumOfPoints() {
        return this.data.reduce(
            (sum, row) => sum + row.points,
            0,
        );
    }
}

export default TableData;