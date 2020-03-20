import SearchClient from '../../src/SearchClient/SearchClient';
import SearchComponent from '../../src/SearchComponent/SearchComponent';

jest.mock('../../src/SearchClient/SearchClient');

describe('SearchComponent', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    it('should debounce inputs', () => {
        expect.assertions(2);
        const { searchComponent, searchClient } = createSearchComponent();

        searchComponent.search('g');
        searchComponent.search('go');
        searchComponent.search('goo');
        searchComponent.search('goog');
        const searchPromise = searchComponent.search('googl');
        jest.advanceTimersByTime(200);

        return searchPromise.then(() => {
            expect(searchClient.search).toHaveBeenCalledTimes(1);
            expect(searchClient.search).toHaveBeenNthCalledWith(1, 'googl');
        });
    });

    it('should fire an event when a search response is received', () => {
        expect.assertions(1);
        const mockEventCallback = jest.fn();
        document.addEventListener('searchComponent:response', mockEventCallback);
        const { searchComponent } = createSearchComponent();

        const searchPromise = searchComponent.search('google');
        jest.advanceTimersByTime(200);

        return searchPromise.then(() => {
            expect(mockEventCallback).toHaveBeenCalledWith(
                new CustomEvent('searchComponent:response', { detail: ['google.com'] }));
        });
    });

    function createSearchComponent() {
        const searchClient = new SearchClient();
        searchClient.search.mockResolvedValue(['google.com']);
        const searchComponent = new SearchComponent(searchClient);

        return {
            searchClient,
            searchComponent
        };
    }
});