// Import Module and Helpers
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
// Import Views
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// Import Runtimes
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    resultsView.updateRender(model.getSearchResultPage());
    bookmarksView.updateRender(model.state.bookmarks);
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);

    resultsView.render(model.getSearchResultPage());

    paginationView.render(model.state.search);
  } catch (err) {}
};

const controlPagination = function (goToPage) {
  console.log(goToPage);

  resultsView.render(model.getSearchResultPage(goToPage));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.updateRender(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // 2. Update recipe view
  recipeView.updateRender(model.state.recipe);

  // 3. Render bookmarks array
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView._toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

const welcome = function () {
  console.log(welcome);
  console.log(welcome);
  console.log(welcome);
  console.log(welcome);
  console.log(welcome);
  console.log(welcome);
  console.log(welcome);
  console.log(welcome);
};

const init = function () {
  bookmarksView.addHundlerRender(controlBookmarks);
  recipeView.addHundlerRender(controlRecipes);
  recipeView.addHundlerUpdateServings(controlServings);
  recipeView.addHundlerAddBookmark(controlAddBookmark);
  searchView.addHundlerSearch(controlSearchResult);
  paginationView.addHundlerClick(controlPagination);
  addRecipeView._addHundlerUpload(controlAddRecipe);
  welcome();
};
init();
