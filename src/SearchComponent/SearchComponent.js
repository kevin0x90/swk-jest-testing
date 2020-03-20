import debounce from 'debounce-promise';

const SEARCH_RESPONSE_EVENT_NAME = 'searchComponent:response';

export default class SearchComponent {

    constructor(searchClient) {
        this.debouncedSearch = debounce(searchClient.search, 200);
    }

    search(query) {
        return this.debouncedSearch(query)
            .then(this.emitSearchResponseEvent);
    }

    emitSearchResponseEvent(searchResponse) {
        document.dispatchEvent(new CustomEvent(SEARCH_RESPONSE_EVENT_NAME, {
            detail: searchResponse
        }));
    }
}