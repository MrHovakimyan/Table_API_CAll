export default function pagination(arr, dataPerPage, currentPage) {
  const endIndex = currentPage * dataPerPage;
  const startIndex = endIndex - dataPerPage;
  return arr.slice(startIndex, endIndex);
}
export function renderPages(arr, dataPerPage, currentPage) {
  if (!arr.length) return;
  const pageCount = Math.ceil(arr.length / dataPerPage);
  const $pageNav = document.querySelector(".page-nav");

  if (pageCount > 1) {
    $pageNav.classList.remove("hidden");
    const $pageList = document.querySelector(".page-list");
    $pageList.innerHTML = "";
    // creating page numbers/buttons
    for (let i = 1; i <= pageCount; i++) {
      const $navLi = document.createElement("li");
      $navLi.innerHTML = i;
      $navLi.classList.add("page-list_item");
      if(currentPage === i) {
        $navLi.classList.add("active");
      }
      $navLi.setAttribute("data-id", i);
      $pageList.append($navLi);
    }
  } else {
    $pageNav.classList.add("hidden");
  }
  return pageCount;
}
// if next => if(currentPage < pageCount) => currentPage++
// if prev => if(currentPage > 1) => currentPage--
