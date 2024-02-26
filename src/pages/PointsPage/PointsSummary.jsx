import React from 'react';
import PropTypes from "prop-types";

import './scss/pointsSummary.scss';

const LABEL = 'Total points: '
const PointsSummary = (props) => {
    const {points} = props;
    return (
        <div className="points_summary__container">
            <span className="points_summary__text">
                {LABEL}
                <span className="points_summary__text--highlight">{points}</span>
            </span>
        </div>
    );
};

PointsSummary.propTypes = {
    points: PropTypes.number.isRequired
}

export default PointsSummary;