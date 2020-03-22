import { debounce } from 'throttle-debounce';

const SEARCH_RESPONSE_EVENT_NAME = 'searchComponent:response';
const SEARCH_ERROR_EVENT_NAME = 'searchComponent:error';

export default class SearchComponent {

    constructor(searchClient) {
        this.debouncedSearch = debounce(200, (query) => {
          searchClient.search(query)
            .then(this.emitSearchResponseEvent)
            .catch(this.emitSearchErrorEvent);
        });
    }

    search(query) {
      this.debouncedSearch(query);
    }

    emitSearchResponseEvent(searchResponse) {
        console.log('search response', searchResponse);

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