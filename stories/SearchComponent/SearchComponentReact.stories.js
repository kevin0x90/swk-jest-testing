import React from 'react';
import fetchMock from 'fetch-mock';

import ReactSearchView from '../../src/SearchComponent/view/react/SearchView';
import SearchComponent from '../../src/SearchComponent/SearchComponent';
import SearchClient from '../../src/SearchClient/SearchClient';

export default { title: 'SearchComponent' };

export const asReactComponent = () => {
  const searchComponent = new SearchComponent(new SearchClient());
  const placeholder = 'some placehodler text';
  const props = { searchComponent, placeholder };
  const searchView = (<ReactSearchView {...props} />);

  document.addEventListener('searchComponent:response', (response) => console.log('success', response.detail));
  document.addEventListener('searchComponent:error', (response) => console.log('error', response.detail));

  return searchView;
};