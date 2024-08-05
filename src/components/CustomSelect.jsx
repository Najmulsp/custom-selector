import { useState } from 'react';
import PropTypes from 'prop-types';

const CustomSelect = ({
  isClearable = false,
  isSearchable = false,
  isDisabled = false,
  options = [],
  value = [],
  placeholder = "Select...",
  isGrouped = false,
  isMulti = false,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  const [search, setSearch] = useState('');
  const [selectedValues, setSelectedValues] = useState(value);
  const [isOpen, setIsOpen] = useState(false);


  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen && onMenuOpen) {
      onMenuOpen();
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (onSearchHandler) {
      onSearchHandler(event.target.value);
    }
  };

  const handleSelect = (option) => {
    let newValue;
    if (isMulti) {
      newValue = selectedValues.includes(option) 
        ? selectedValues.filter(val => val !== option) 
        : [...selectedValues, option];
    } else {
      newValue = option;
    }
    setSelectedValues(newValue);
    if (onChangeHandler) {
      onChangeHandler(newValue);
    }
  };

  const handleClear = () => {
    setSelectedValues([]);
    if (onChangeHandler) {
      onChangeHandler(isMulti ? [] : null);
    }
  };

  const filteredOptions = isSearchable ? 
    options.filter(option => 
      isGrouped 
        ? option.groupLabel.toLowerCase().includes(search.toLowerCase()) 
          || option.items.some(item => item.toLowerCase().includes(search.toLowerCase()))
        : option.toLowerCase().includes(search.toLowerCase())
    )
    : options;

  return (
    <div className={`kzui-select ${isDisabled ? 'kzui-select--disabled' : ''}`}>
      <div className="kzui-select__control" onClick={!isDisabled && handleToggleOpen}>
        <div className="kzui-select__value">
          {selectedValues.length === 0 ? placeholder : isMulti ? selectedValues.join(', ') : selectedValues}
        </div>
        <button 
          className="kzui-select__clear-btn" 
          onClick={isClearable && handleClear}
          disabled={!isClearable || isDisabled}
        >
          Clear
        </button>
      </div>
      {isOpen && (
        <div className="kzui-select__menu">
          {isSearchable && (
            <input 
              type="text" 
              className="kzui-select__search" 
              value={search} 
              onChange={handleSearch}
              placeholder="Search..."
            />
          )}
          <div className="kzui-select__options">
            {filteredOptions.map(option => 
              isGrouped ? (
                <div key={option.groupLabel} className="kzui-select__group">
                  <div className="kzui-select__group-label">{option.groupLabel}</div>
                  {option.items.map(item => (
                    <div 
                      key={item} 
                      className={`kzui-select__option ${selectedValues.includes(item) ? 'kzui-select__option--selected' : ''}`}
                      onClick={() => handleSelect(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <div 
                  key={option} 
                  className={`kzui-select__option ${selectedValues.includes(option) ? 'kzui-select__option--selected' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
    isClearable: PropTypes.boolean,
    isSearchable: PropTypes.boolean,
    isDisabled: PropTypes.boolean,
    options: PropTypes.object,
    value: PropTypes.object,
    placeholder: PropTypes.string,
    isGrouped: PropTypes.boolean,
    isMulti: PropTypes.boolean,
    onChangeHandler: PropTypes.undefined,
    onMenuOpen: PropTypes.undefined,
    onSearchHandler: PropTypes.undefined,
}
export default CustomSelect;