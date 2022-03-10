export const arrayToHTML = ($parentElement, array, markupCallBack) => {
    if (typeof markupCallBack !== "function") {
      throw new Error("Markup should be a function");
    }
  
    $parentElement.innerHTML = array.map(markupCallBack);
  };