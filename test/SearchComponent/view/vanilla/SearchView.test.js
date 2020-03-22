import SearchComponent from '../../../../src/SearchComponent/SearchComponent';
import SearchView from '../../../../src/SearchComponent/view/vanilla/SearchView';

jest.mock('../../../../src/SearchComponent/SearchComponent');

describe('Vanilla javascript search view', () => {

    beforeEach(() => {
        document.body.innerHTML = '<div id="searchBox" />';
    });

    it('should render a search box', () => {
        const { viewContainer, searchViewElement } = renderSearchView();

        expect(searchViewElement).not.toBeNull();
        expect(viewContainer.innerHTML).toMatchSnapshot();
    });

    it('should search when user enters an input', () => {
        const { searchViewElement, searchComponent } = renderSearchView();

        simulateInput(searchViewElement, 'g');
        simulateInput(searchViewElement, 'go');
        simulateInput(searchViewElement, 'goo');

        expect(searchComponent.search).toHaveBeenCalledWith('goo');
    });

    function simulateInput(element, inputValue) {
        element.value = inputValue;
        element.dispatchEvent(new InputEvent('input', {
            data: inputValue
        }));
    }

    function renderSearchView() {
        const searchComponent = new SearchComponent();
        const searchView = new SearchView(searchComponent, 'some placehodler text');

        const searchViewElement = searchView.render();

        const viewContainer = document.getElementById('searchBox');
        viewContainer.appendChild(searchViewElement);

        return {
            searchComponent,
            viewContainer,
            searchViewElement: viewContainer.querySelector('.search-box')
        };
    }
});