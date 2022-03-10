# Table_API - Call : JS / CSS / HTML

## Table with - Search, Sort, Pagination, Drag-Drop functionality /

Consider the following example code:

```JavaScript
//----- Drag Events Start -----///
function handleDragStart(evn) {
  evn.target.classList.add("dragging");
  console.log("drag starts", evn.target);
}

function handleDragEnd(evn) {
  const element = document.querySelector(".dragging");
  console.log("element", element);
  const pageStartIndex = (currentPage - 1) * dataPerPage;
  console.log("pageStartIndex", pageStartIndex);
  const elemIndex = pageStartIndex + Number(element.getAttribute("data-index"));
  console.log("elemIndex: ", elemIndex, "itemDroppedOverIndex: ", itemDroppedOverIndex);

  if (elemIndex < itemDroppedOverIndex) {
    covidCountries.splice(itemDroppedOverIndex, 0, covidCountries[elemIndex]);
    covidCountries.splice(elemIndex, 1);
  } else if (elemIndex > itemDroppedOverIndex) {
    const removed = covidCountries.splice(elemIndex, 1);
    covidCountries.splice(itemDroppedOverIndex, 0, removed[0]);
  }
  evn.target.classList.remove("dragging");
  render();
  itemDroppedOverIndex = undefined;
}

function handleDragOver() {
  const pageStartIndex = (currentPage - 1) * dataPerPage;

  itemDroppedOverIndex = pageStartIndex + Number(this.getAttribute("data-index"));
}
//----- Drag Events End -----///
```

---

Find me on Social media

This is my _[GitHub profile <img src="https://pics.freeicons.io/uploads/icons/png/3345023101530077752-512.png" width=20px/>](https://github.com/MrHovakimyan)_

This is my _[FaceBook profile <img src="https://img.icons8.com/plasticine/2x/facebook-new.png" width=30px/> ](https://www.facebook.com/Mr.Hovakimyan/)_

---

## Network requests - Fetch:

JavaScript can send network requests to the server and load new information whenever it’s needed.

For example, we can use a network request to:

Submit an order,
Load user information,
Receive latest updates from the server,
…etc.
…And all of that without reloading the page!

There’s an umbrella term “AJAX” (abbreviated Asynchronous JavaScript And XML) for network requests from JavaScript. We don’t have to use XML though: the term comes from old times, that’s why that word is there. You may have heard that term already.

There are multiple ways to send a network request and get information from the server.

The fetch() method is modern and versatile, so we’ll start with it. It’s not supported by old browsers (can be polyfilled), but very well supported among the modern ones.

The basic syntax is:

```JavaScript
let promise = fetch(url, [options])
// url – the URL to access.
// options – optional parameters: method, headers etc.

let response = await fetch(url);

if (response.ok) { // if HTTP-status is 200-299
  // get the response body (the method explained below)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

Without options, this is a simple GET request, downloading the contents of the url.

The browser starts the request right away and returns a promise that the calling code should use to get the result.

Getting a response is usually a two-stage process.

First, the promise, returned by fetch, resolves with an object of the built-in Response class as soon as the server responds with headers.

At this stage we can check HTTP status, to see whether it is successful or not, check headers, but don’t have the body yet.

The promise rejects if the fetch was unable to make HTTP-request, e.g. network problems, or there’s no such site. Abnormal HTTP-statuses, such as 404 or 500 do not cause an error.

We can see HTTP-status in response properties:

- status – HTTP status code, e.g. 200.
- ok – boolean, true if the HTTP status code is 200-299.

---

More information can be found:

- _[Network Requests - Fetch](https://javascript.info/fetch)_

- _[Promises, async/await](https://javascript.info/async-await)_
