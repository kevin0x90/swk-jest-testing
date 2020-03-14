import SearchClient from '../../src/SearchClient/SearchClient';

describe('Sends a search query to the search service and provides the result list', () => {
    it('should return an empty list for an empty query (Promises)', () => {
        const client = new SearchClient();

        return client.search('').then((searchResult) => {
            expect(searchResult).toEqual([]);
        });
    });

    it('should return an empty list for an empty query (async await)', async () => {
        const client = new SearchClient();

        const searchResult = await client.search('');

        expect(searchResult).toEqual([]);
    });

});