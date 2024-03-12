// import React, { useState } from 'react';
// import Select from 'react-select';

// function CheckboxSelect  ({ options, selectedOptions, onChange }) {

//   const handleChange = (selectedValues) => {
//     onChange(selectedValues.map((value) => value.value));
//   };

//   const formatOptions = options.map((option) => ({ value: option, label: option }));

//   return (
//     <div style={{width: '100%', borderBottom: '20px '}}>
//     <Select
//           options={formatOptions}
//           isMulti
//           value={formatOptions.filter((option) => selectedOptions.includes(option.value))}
//           onChange={handleChange}
//       />
//     </div>
//   );
// };

// export default CheckboxSelect


import React from 'react';
import Select from 'react-select';

function CheckboxSelect  ({ options, selectedOptions, onChange }) {

  const handleChange = (selectedValues) => {
    onChange(selectedValues.map((value) => value.value));
  };

  const formatOptions = options.map((option) => ({ value: option, label: option }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'red', // Change the color of the text
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: 'green', // Change the color of the text
    }),
  };

  return (
    <div style={{width: '100%', borderBottom: '20px solid #282c34'}}>
      <Select
        options={formatOptions}
        isMulti
        value={formatOptions.filter((option) => selectedOptions.includes(option.value))}
        onChange={handleChange}
        styles={customStyles} // Apply custom styles
      />
    </div>
  );
};

export default CheckboxSelect;


