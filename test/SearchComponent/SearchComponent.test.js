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
        searchComponent.search('googl');
        jest.advanceTimersByTime(200);

        expect(searchClient.search).toHaveBeenCalledTimes(1);
        expect(searchClient.search).toHaveBeenNthCalledWith(1, 'googl');
    });

    it('should fire an event when a search response is received', (done) => {
        expect.assertions(1);
        const mockEventCallback = jest.fn();
        document.addEventListener('searchComponent:response', mockEventCallback);
        document.addEventListener('searchComponent:response', () => {
          expect(mockEventCallback).toHaveBeenCalledWith(
            new CustomEvent('searchComponent:response', { detail: ['google.com'] }));
          done();
        });
        const { searchComponent } = createSearchComponent();

        searchComponent.search('google');
        jest.advanceTimersByTime(200);
    });

    it('should fire an error event when search request has an error', (done) => {
        expect.assertions(1);
        const mockEventCallback = jest.fn();
        document.addEventListener('searchComponent:error', mockEventCallback);
        document.addEventListener('searchComponent:error', () => {
          expect(mockEventCallback).toHaveBeenCalledWith(
            new CustomEvent('searchComponent:error', { detail: new Error('an error occured') }));
          done();
        });
        const { searchComponent } = createSearchComponent(setupMockReject);

        searchComponent.search('safsadfasfasf');
        jest.advanceTimersByTime(200);
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