import SearchClient from '../../src/SearchClient/SearchClient';
import { enableFetchMocks } from "jest-fetch-mock"

enableFetchMocks();

describe('Sends a search query to the search service and provides the result list', () => {
    beforeEach(() => {
        fetch.doMock();
    });

    it('should return an empty list for an empty query (async await)', async () => {
        fetch.mockResponseOnce(JSON.stringify([]));

        const client = new SearchClient();

        const searchResult = await client.search('');

        expect(searchResult).toEqual([]);
        expect(fetch.mock.calls.length).toEqual(0);
    });

    it.each([
        [undefined],
        [null],
        [3],
        [{}],
        [''],
    ])('should not call fetch for %s', (searchQuery) => {
        fetch.mockResponseOnce(JSON.stringify([]));

        const client = new SearchClient();

        return client.search(searchQuery).then((searchResult) => {
            expect(searchResult).toEqual([]);
            expect(fetch.mock.calls.length).toEqual(0);
        });
    });

    it('should return a list with results when searching for google', async () => {
        fetch.mockResponseOnce(JSON.stringify(['google.com', 'myaccount.google.com']));

        const client = new SearchClient();

        const searchResult = await client.search([['g'], ['o'], ['o'], ['g'], ['l'], ['e']]);

        expect(searchResult).toEqual(['google.com', 'myaccount.google.com']);
        expect(fetch.mock.calls.length).toEqual(1);
    });
});