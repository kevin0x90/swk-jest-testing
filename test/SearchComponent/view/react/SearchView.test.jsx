import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import SearchComponent from '../../../../src/SearchComponent/SearchComponent';
import SearchView from '../../../../src/SearchComponent/view/react/SearchView';

jest.mock('../../../../src/SearchComponent/SearchComponent');

describe('React search view', () => {
  it('should render a search box', () => {
    const component = renderer.create(<SearchView searchComponent={new SearchComponent()} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should search when user enters an input', () => {
    const { searchComponent, searchViewElement } = renderSearchView();

    fireEvent.change(searchViewElement, { target: { value: 'g' } });

    expect(searchComponent.search).toHaveBeenCalledWith('g');
  });

  function renderSearchView() {
        const searchComponent = new SearchComponent();
        const placeholderText = 'some placeholder text';
        const props = { searchComponent, placeholderText };
        const { container } = render(<SearchView {...props} />);

        return {
          searchComponent,
          searchViewElement: container.querySelector('.search-box')
        };
    }
});