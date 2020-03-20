import SearchClient from '../../src/SearchClient/SearchClient';
import SearchComponent from '../../src/SearchComponent/SearchComponent';

jest.mock('../../src/SearchClient/SearchClient');

describe('SearchComponent', () => {

    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
    });

    it('should debounce inputs', () => {
        expect.assertions(2);
        const searchClient = new SearchClient();
        searchClient.search.mockResolvedValue(['google.com']);
        const searchComponent = new SearchComponent(searchClient);

        let searchPromise = searchComponent.search('g');
        searchPromise = searchComponent.search('go');
        searchPromise =searchComponent.search('goo');
        searchPromise =searchComponent.search('goog');
        searchPromise =searchComponent.search('googl');

        jest.runAllTimers();

        return searchPromise.then(() => {
            expect(searchClient.search).toHaveBeenCalledTimes(1);
            expect(searchClient.search).toHaveBeenNthCalledWith(1, 'googl');
        });
    });

    it('should fire an event when a search response is received', () => {
        expect.assertions(1);
        const mockEventCallback = jest.fn();
        document.addEventListener('searchComponent:response', mockEventCallback);

        const searchClient = new SearchClient();
        searchClient.search.mockResolvedValue(['google.com']);
        const searchComponent = new SearchComponent(searchClient);

        const searchPromise = searchComponent.search('google');
        jest.runAllTimers();

        return searchPromise.then(() => {
            expect(mockEventCallback).toHaveBeenCalledWith(
                new CustomEvent('searchComponent:response', { detail: ['google.com'] }));
        });
    });
});