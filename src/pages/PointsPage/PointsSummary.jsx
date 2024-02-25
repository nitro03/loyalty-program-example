import React from 'react';
import PropTypes from "prop-types";

import './scss/pointsSummary.scss';

const LABEL = 'Total points: '
const PointsSummary = (props) => {
    const {points} = props;
    return (
        <div className="points_summary--container">
            <span className="points_summary--text">
                {LABEL}
                <span className="points_summary--text__highlight">{points}</span>
            </span>
        </div>
    );
};

PointsSummary.propTypes = {
    points: PropTypes.number.isRequired
}

export default PointsSummary;