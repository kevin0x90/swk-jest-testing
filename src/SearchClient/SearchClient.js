export default class SearchClient {
    search(query) {
        if (typeof query !== 'string' || query.trim().length === 0) {
            return Promise.resolve([]);
        }

        return fetch(`/api/search?query=${query}`).then(response => response.json());
    }
};