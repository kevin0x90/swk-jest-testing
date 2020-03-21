import fetchMock from 'fetch-mock';

import SearchView from '../../src/SearchComponent/view/vanilla/SearchView';
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

export const withCustomPlaceholder = () => {
  const searchView = new SearchView(new SearchComponent(new SearchClient()), 'please enter your search...');

  document.addEventListener('searchComponent:response', (response) => console.log('success', response.detail));
  document.addEventListener('searchComponent:error', (response) => console.log('error', response.detail));

  return searchView.render()
};