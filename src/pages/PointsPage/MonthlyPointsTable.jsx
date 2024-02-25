import React from 'react';
import PropTypes from "prop-types";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './scss/table.scss';

const MonthlyPointsTable = (props) => {
    const {data} = props;

    const renderRows = (data) => {
        if (Array.isArray(data)) {
            return data.map((row) => {
                const pointsSx = {
                    color: 'green',
                    fontWeight: 'bold'
                }
                return (
                    <TableRow
                        key={row.id}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell align="left">{row.month}</TableCell>
                        <TableCell align="right" sx={pointsSx}>{row.points}</TableCell>
                    </TableRow>
                )
            });
        }
        return null;
    };

    if (!data || !data.length) {
        return null;
    }

    const headerSx = {
        fontWeight: 'bold'
    }
    return (
        <div className="table--container table--container__align_right">
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 200}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={headerSx} align="left">Month</TableCell>
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

MonthlyPointsTable.propTypes = {
    data: PropTypes.array
}

export default MonthlyPointsTable;