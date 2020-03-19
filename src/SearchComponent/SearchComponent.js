import debounce from 'lodash/debounce';

const SEARCH_RESPONSE_EVENT_NAME = 'searchComponent:response';

export default class SearchComponent {

    constructor(searchClient) {
        this.debouncedSearch = debounce(searchClient.search.bind(searchClient), 200);
    }

    search(query) {
        const result = this.debouncedSearch(query);

        console.log(result);

        return result.then(this.emitSearchResponseEvent);
    }

    emitSearchResponseEvent(searchResponse) {
        console.log('event');
        document.dispatchEvent(new CustomEvent(SEARCH_RESPONSE_EVENT_NAME, {
            detail: searchResponse
        }));
    }
}