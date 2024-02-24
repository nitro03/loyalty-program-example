import React, {useEffect, useState} from 'react';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

import './scss/timePeriodChooser.scss';
import PropTypes from "prop-types";

const DATE_FROM_LABEL = 'Date From';
const DATE_TO_LABEL = 'Date To';
const DATE_FORMAT = 'DD-MM-YYYY';

const TimePeriodChooser = (props) => {

    const {onDateChange} = props;
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    useEffect(() => {
        onDateChange({
            dateFrom: dateFrom ? dateFrom.unix()*1000 : null,
            dateTo: dateTo ? dateTo.unix()*1000 : null
        })
    }, [dateFrom, dateTo, onDateChange]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="date_picker">
                <DatePicker label={DATE_FROM_LABEL}
                            format={DATE_FORMAT}
                            value={dateFrom}
                            onChange={(newValue) => setDateFrom(newValue)}/>
                <DatePicker label={DATE_TO_LABEL}
                            format={DATE_FORMAT}
                            value={dateTo}
                            onChange={(newValue) => setDateTo(newValue)}/>
            </div>
        </LocalizationProvider>
    );
};

TimePeriodChooser.propTypes = {
    onDateChange: PropTypes.func.isRequired
}

export default TimePeriodChooser;