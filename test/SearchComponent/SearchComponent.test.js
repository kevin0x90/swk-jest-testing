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
        searchComponent.search('o');
        searchComponent.search('o');
        searchComponent.search('g');
        const searchPromise = searchComponent.search('l');
        jest.advanceTimersByTime(200);

        return searchPromise.then(() => {
            expect(searchClient.search).toHaveBeenCalledTimes(1);
            expect(searchClient.search).toHaveBeenNthCalledWith(1, [['g'], ['o'], ['o'], ['g'], ['l']]);
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

    it('should fire an error event when search request has an error', () => {
        expect.assertions(1);
        const mockEventCallback = jest.fn();
        document.addEventListener('searchComponent:error', mockEventCallback);
        const { searchComponent } = createSearchComponent(setupMockReject);

        const searchPromise = searchComponent.search('safsadfasfasf');
        jest.advanceTimersByTime(200);

        return searchPromise.then(() => {
            expect(mockEventCallback).toHaveBeenCalledWith(
                new CustomEvent('searchComponent:error', { detail: new Error('an error occured') }));
        });
    });

    function setupMockResolve(searchClient) {
        searchClient.search.mockResolvedValue(['google.com']);
    }

    function setupMockReject(searchClient) {
        searchClient.search.mockRejectedValue(new Error('an error occured'));
    }

    function createSearchComponent(setupSearchClientMock = setupMockResolve) {
        const searchClient = new SearchClient();
        setupSearchClientMock(searchClient);
        const searchComponent = new SearchComponent(searchClient);

        return {
            searchClient,
            searchComponent
        };
    }
});