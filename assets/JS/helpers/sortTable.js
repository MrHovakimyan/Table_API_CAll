export default function sortByProp(arr, by, up) {
  let trArr = [...arr];
  if (up === 0) {
    return trArr;
  }
  if (typeof arr[by] === "string") {
    trArr = arr.map((item) => item[by].toLowerCase());
  }
  return trArr.sort((a, b) => {
    if (up === 1) {
      // sorting arr in asc
      if (a[by] >= b[by]) {
        return 1;
      }
      return -1;
    } else if (up === 2) {
      // sorting arr in dsc
      if (a[by] <= b[by]) {
        return 1;
      }
      return -1;
    }
  });
}
