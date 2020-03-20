export default class SearchView {
    constructor(searchComponent, placeHolderText) {
        this.searchComponent = searchComponent;
        this.placeHolderText = placeHolderText;
    }

    searchEventHandler({ key }) {
        this.searchComponent.search(key);
    }

    render(containerElement) {
        const searchViewElement = document.createElement('input');
        searchViewElement.setAttribute('type', 'search');
        searchViewElement.setAttribute('placeholder', this.placeHolderText);
        searchViewElement.classList.add('search-box');
        searchViewElement.addEventListener('keydown', this.searchEventHandler.bind(this));

        containerElement.appendChild(searchViewElement);
    }
};