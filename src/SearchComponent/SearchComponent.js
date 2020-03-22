import { debounce } from 'throttle-debounce';

const SEARCH_RESPONSE_EVENT_NAME = 'searchComponent:response';
const SEARCH_ERROR_EVENT_NAME = 'searchComponent:error';

const dispatchEvent = (eventName, payload) => document.dispatchEvent(new CustomEvent(eventName, { detail: payload }));

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
      dispatchEvent(SEARCH_RESPONSE_EVENT_NAME, searchResponse);
    }

    emitSearchErrorEvent(searchError) {
      dispatchEvent(SEARCH_ERROR_EVENT_NAME, searchError);
    }
}