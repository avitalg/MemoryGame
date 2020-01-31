import React from 'react';
import PropTypes from 'prop-types';
import '../css/Card.css';

function Card(props) {
    const { side, img, index, found, click } = props;
    return (
        <div className={ `card ${side}` } onClick={()=>click(img, index, found)}>
            <img src={`images/${img}.png`} />
        </div>
    );
}

Card.propTypes = {
    img: PropTypes.string.isRequired,
    click: PropTypes.func.isRequired,
    side: PropTypes.string,
    index: PropTypes.number,
    found: PropTypes.bool,
};

Card.defaultProps = {
    side: "down",
    found: false,
};

export default Card;
