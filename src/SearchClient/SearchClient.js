export default class SearchClient {
    search(keystrokes) {
        if (!Array.isArray(keystrokes)) {
          return Promise.resolve([]);
        }

        const query = keystrokes.flat().join('')
        if (typeof query !== 'string' || query.trim().length === 0) {
            return Promise.resolve([]);
        }

        return fetch(`/api/search?query=${query}`).then(response => response.json());
    }
};