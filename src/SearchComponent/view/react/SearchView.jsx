import React from 'react';

export default ({ searchComponent, placeholderText = '' }) => {
  const searchEventHandler = ({ currentTarget }) => {
    searchComponent.search(currentTarget.value);
  };

  return (
    <input
      className="search-box"
      type="search"
      placeholder={placeholderText}
      onChange={searchEventHandler}
    />
  );
};