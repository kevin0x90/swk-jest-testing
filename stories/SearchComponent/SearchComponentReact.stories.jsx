import React from 'react';
import fetchMock from 'fetch-mock';

import ReactSearchView from '../../src/SearchComponent/view/react/SearchView';
import SearchComponent from '../../src/SearchComponent/SearchComponent';
import SearchClient from '../../src/SearchClient/SearchClient';

fetchMock.get('begin:/api/search?query=', {
  body: [
    'google.com',
    'googol.de',
    'mail.google.com'
  ]
}, { status: 200 });

export default { title: 'SearchComponent' };

export const asReactComponent = () => {
  const searchComponent = new SearchComponent(new SearchClient());
  const placeholderText = 'some placeholder text';
  const props = { searchComponent, placeholderText };
  const searchView = (<ReactSearchView {...props} />);

  document.addEventListener('searchComponent:response', (response) => console.log('success', response.detail));
  document.addEventListener('searchComponent:error', (response) => console.log('error', response.detail));

  return searchView;
};