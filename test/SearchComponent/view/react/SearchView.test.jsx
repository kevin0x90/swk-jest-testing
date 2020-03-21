import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import SearchComponent from '../../../../src/SearchComponent/SearchComponent';
import SearchView from '../../../../src/SearchComponent/view/react/SearchView';

jest.mock('../../../../src/SearchComponent/SearchComponent');

describe('React search view', () => {
  it('should render a search box', () => {
    const component = renderer.create(<SearchView />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should search when user enters an input', () => {
    const { searchComponent, searchViewElement } = renderSearchView();

    fireEvent.keyDown(searchViewElement, { key: 'g' });

    expect(searchComponent.search).toHaveBeenCalledWith('g');
  });

  function renderSearchView() {
        const searchComponent = new SearchComponent();
        const placeholder = 'some placehodler text';
        const props = { searchComponent, placeholder };
        const { container } = render(<SearchView {...props} />);

        return {
          searchComponent,
          searchViewElement: container.querySelector('.search-box')
        };
    }
});