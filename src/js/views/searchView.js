class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHundlerSearch(hundler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      hundler();
    });
  }
}

export default new SearchView();
