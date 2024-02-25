import TableData from "../logic/TableData";


const mockedData = [
    {
        "id": "txn_3",
        "description": "Desktop PC",
        "amount": 188,
        "date": "2023-05-14T16:36:19.438803"
    },
    {
        "id": "txn_4",
        "description": "Smartwatch",
        "amount": 1052,
        "date": "2023-12-08T16:36:19.438812"
    },
    {
        "id": "txn_7",
        "description": "Test",
        "amount": 10,
        "date": "2023-12-06T16:36:19.438812"
    }
]
describe('Table data class tests', () => {
    const testData = new TableData(mockedData);

    it('should return points sum', () => {
        expect(testData.getSumOfPoints()).toEqual(88 * 2 + 50 + 50 + 952 * 2);
    });
    it('should return points by month', () => {
        const expectedResult = [
            {
                month: '2023-05',
                points: 88 * 2 + 50
            },
            {
                month: '2023-12',
                points: 50 + 952 * 2
            }
        ];
        expect(testData.getPointsDataByMonth()).toEqual(expectedResult);
    });
    it('should return formatted and sorted transactions data', () => {
        const expectedResult = [
            {
                id: "txn_3",
                description: "Desktop PC",
                amount: '188 $',
                date: "2023-05-14",
                points: 88 * 2 + 50
            },
            {
                id: "txn_7",
                description: "Test",
                amount: '10 $',
                date: "2023-12-06",
                points: 0
            },
            {
                id: "txn_4",
                description: "Smartwatch",
                amount: '1052 $',
                date: "2023-12-08",
                points: 50 + 952 * 2
            }
        ]
        expect(testData.getTransactionsData()).toEqual(expectedResult);
    });
});