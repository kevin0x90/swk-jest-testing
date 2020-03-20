import debounce from 'debounce-promise';

const SEARCH_RESPONSE_EVENT_NAME = 'searchComponent:response';
const SEARCH_ERROR_EVENT_NAME = 'searchComponent:error';

export default class SearchComponent {

    constructor(searchClient) {
        this.debouncedSearch = debounce(searchClient.search, 200);
    }

    search(query) {
        return this.debouncedSearch(query)
            .then(this.emitSearchResponseEvent)
            .catch(this.emitSearchErrorEvent);
    }

    emitSearchResponseEvent(searchResponse) {
        document.dispatchEvent(new CustomEvent(SEARCH_RESPONSE_EVENT_NAME, {
            detail: searchResponse
        }));
    }

    emitSearchErrorEvent(searchError) {
        document.dispatchEvent(new CustomEvent(SEARCH_ERROR_EVENT_NAME, {
            detail: searchError
        }));
    }
}