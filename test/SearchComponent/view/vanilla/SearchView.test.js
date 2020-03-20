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

        searchViewElement.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'g'
        }));

        expect(searchComponent.search).toHaveBeenCalledWith('g');
    });

    function renderSearchView() {
        const searchComponent = new SearchComponent();
        const searchView = new SearchView(searchComponent, 'some placehodler text');
        const viewContainer = document.getElementById('searchBox');

        searchView.render(viewContainer);

        return {
            searchComponent,
            viewContainer,
            searchViewElement: viewContainer.querySelector('.search-box')
        };
    }
});