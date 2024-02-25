import {
    addPointsColumn,
    formatAmountColumn,
    formatDateColumn,
    getTransactionMonth,
    getSortedMonthsArray,
    sortTransactionsByDateAsc
} from "./tableDataHelpers";

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

    getTransactionsData() {
        return sortTransactionsByDateAsc(this.data);
    }

    getSumOfPoints() {
        return this.data.reduce(
            (sum, row) => sum + row.points,
            0,
        );
    }

    getPointsDataByMonth() {
        const months = {}
        this.data.forEach((row) => {
            const processedTransactionMonth = getTransactionMonth(row);
            if (months[processedTransactionMonth]) {
                months[processedTransactionMonth] = months[processedTransactionMonth] + row.points;
            } else {
                months[processedTransactionMonth] = row.points
            }
        })
        return getSortedMonthsArray(months);
    }
}

export default TableData;