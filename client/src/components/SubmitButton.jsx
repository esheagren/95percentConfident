import PropTypes from 'prop-types';

function SubmitButton({ onClick }) {
    return (
        <button 
            onClick={onClick}
            className="submit-button"
        >
            Submit Answer
        </button>
    );
}

SubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SubmitButton;

