export class paginationClass {
  #currentPage = 1;

  get page() {
    return this.#currentPage;
  }

  set page(newPage) {
    this.#currentPage = newPage;
  }
}
