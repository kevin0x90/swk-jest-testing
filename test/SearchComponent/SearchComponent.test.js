import SearchClient from '../../src/SearchClient/SearchClient';
import SearchComponent from '../../src/SearchComponent/SearchComponent';

jest.mock('../../src/SearchClient/SearchClient');

describe('SearchComponent', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    it('should debounce inputs', () => {
        const searchClient = new SearchClient();
        const searchComponent = new SearchComponent(searchClient);
        searchComponent.search('g');
        searchComponent.search('go');
        searchComponent.search('goo');
        searchComponent.search('goog');
        searchComponent.search('googl');

        jest.advanceTimersByTime(200);
        expect(searchClient.search).toHaveBeenCalledTimes(1);
        expect(searchClient.search).toHaveBeenNthCalledWith(1, 'googl');
    });

    it('should fire an event when a search response is received', async () => {
        const mockEventCallback = jest.fn();
        document.addEventListener('searchComponent:response', mockEventCallback);

        const searchClient = new SearchClient();
        searchClient.search.mockResolvedValue(['google.com']);
        const searchComponent = new SearchComponent(searchClient);

        await searchComponent.search('google');
        jest.runAllTimers();

        expect(mockEventCallback).toHaveBeenCalledWith({ detail: ['google.com'] });
    });
});