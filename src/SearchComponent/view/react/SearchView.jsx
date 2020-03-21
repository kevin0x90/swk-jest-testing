import React from 'react';

export default ({ searchComponent, placeholderText }) => {
  const searchEventHandler = ({ key }) => {
    searchComponent.search(key);
  };

  return (
    <input
      className="search-box"
      type="search"
      placeholder={placeholderText}
      onKeyDown={searchEventHandler}
    />
  );
};