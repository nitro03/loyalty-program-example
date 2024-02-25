import React from 'react';
import PropTypes from "prop-types";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './scss/PointsTable.scss';

const NO_DATA_INFO = 'No data';
const PointsTable = (props) => {
    const {data} = props;

    const renderRows = (data) => {
        if (Array.isArray(data)) {
            return data.map((row) => {
                return (
                    <TableRow
                        key={row.id}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell>{row.description}</TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">{row.points}</TableCell>
                    </TableRow>
                )
            });
        }
        return null;
    };

    if (!data) {
        return null;
    }

    if (!data.length) {
        return (
            <div className="points_table--info">{NO_DATA_INFO}</div>
        )
    }
    const headerSx = {
        fontWeight: 'bold'
    }
    return (
        <div className="points_table--container">
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={headerSx}>Item</TableCell>
                            <TableCell sx={headerSx} align="right">Date</TableCell>
                            <TableCell sx={headerSx} align="right">Amount</TableCell>
                            <TableCell sx={headerSx} align="right">Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderRows(data)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

PointsTable.propTypes = {
    data: PropTypes.array
}

export default PointsTable;