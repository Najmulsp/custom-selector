import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from "react-icons/fa";

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

  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

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
      newValue = [option];
      setIsOpen(false);
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

  const filterOptions = (options, search) => {
    if (!search) return options;
    return isGrouped
      ? options.map(group => ({
          ...group,
          items: group.items.filter(item => item.toLowerCase().includes(search.toLowerCase())),
        })).filter(group => group.items.length > 0)
      : options.filter(option => option.toLowerCase().includes(search.toLowerCase()));
  };

  const filteredOptions = isSearchable ? filterOptions(options, search) : options;

  return (
    <div className={`kzui-select ${isDisabled ? 'kzui-select--disabled' : ''}`}>
      <div className="kzui-select__control" onClick={!isDisabled && handleToggleOpen}>
        <div className="kzui-select__value">
          {selectedValues.length === 0 ? placeholder : (
            isMulti
              ? selectedValues.map(val => (
                  <span className="kzui-select__multi-value" key={val}>
                    {val}
                    <span className="kzui-select__multi-value__remove" onClick={() => handleSelect(val)}>
                      &times;
                    </span>
                  </span>
                ))
              : selectedValues
          )}
        </div>
        {isClearable && (
          <button className="kzui-select__clear-btn" onClick={handleClear} disabled={isDisabled}>
            &times;
          </button>
        )}
      </div>
      {isOpen && (
        <div className="kzui-select__menu">
          {isSearchable && (
            <>
            
            <input
              type="text"
              className="kzui-select__search"
              value={search}
              onChange={handleSearch}
              placeholder="Search..."/>
              <FaSearch className='kzui-search-icon'/>
              </>
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
                  className={`kzui-select__option ${selectedValues.includes(option) ? 'kzui-select__option--disabled' : ''}`}
                  onClick={() => !selectedValues.includes(option) && handleSelect(option)}
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
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        groupLabel: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  ]),
  value: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  isGrouped: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChangeHandler: PropTypes.func,
  onMenuOpen: PropTypes.func,
  onSearchHandler: PropTypes.func,
};

export default CustomSelect;
