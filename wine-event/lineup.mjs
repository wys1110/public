export function paginateWines(wines, pageSize = 5) {
  const pages = [];

  for (let index = 0; index < wines.length; index += pageSize) {
    pages.push(wines.slice(index, index + pageSize));
  }

  return pages;
}
