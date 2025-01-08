import PropTypes from 'prop-types';

// The component maintains its own state while also trying to sync with parent state through callbacks. 
// This can lead to synchronization issues.

function InputFields({ lowerValue, upperValue, onValueChange} ) {


function handleLowerChange(event) {
    onValueChange("lower", event.target.value);
  }

  function handleUpperChange(event) {
    onValueChange("upper", event.target.value);
  }


  return (
    <div className="input-container">
      <input 
        type="number"
        className="box"
        value={lowerValue}
        onChange={handleLowerChange}
        placeholder="Lower Bound"
      />
      <input 
        type="number"
        className="box"
        value={upperValue}
        onChange={handleUpperChange}
        placeholder="Upper Bound"
      />
    </div>
  );
}

InputFields.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  lowerValue: PropTypes.number.isRequired, 
  upperValue: PropTypes.number.isRequired
};

export default InputFields;