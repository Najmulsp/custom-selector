import { useState } from 'react';
import CustomSelect from './components/CustomSelect';

const App = () => {
  const groupedOptions = [
    {
      groupLabel:'',
      items: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'ES6', 'React JS', 'Next JS', 'Redux', 'TypeScript']
    }
  ];

  const [value, setValue] = useState([]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="kzui-app">
      <h1 className='kzui-select-text'>1. Select Your Skills Here:</h1>
      <div className='kzui-select-container'>
        <CustomSelect
          isClearable
          isSearchable
          isMulti
          options={groupedOptions}
          value={value}
          placeholder="Click to select..."
          isGrouped
          onChangeHandler={handleChange}
          onSearchHandler={handleSearch}
        />
      </div>
    </div>
  );
};

export default App;
