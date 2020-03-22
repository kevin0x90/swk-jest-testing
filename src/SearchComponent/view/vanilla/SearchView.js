export default class SearchView {
    constructor(searchComponent, placeholderText) {
        this.searchComponent = searchComponent;
        this.placeholderText = placeholderText;
    }

    searchEventHandler({ currentTarget }) {
        this.searchComponent.search(currentTarget.value);
    }

    render() {
        const searchViewElement = document.createElement('input');
        searchViewElement.setAttribute('type', 'search');
        searchViewElement.setAttribute('placeholder', this.placeholderText);
        searchViewElement.classList.add('search-box');
        searchViewElement.addEventListener('input', this.searchEventHandler.bind(this));

        return searchViewElement;
    }
};