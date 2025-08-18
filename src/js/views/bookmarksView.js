import View from './view';
import previewView from './previewView';

class BookMarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it ;)`;
  _message = '';

  addHundlerRender(hundler) {
    window.addEventListener('load', hundler);
  }

  _generateMarkup() {
    console.log('bookmarks List', this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookMarksView();
