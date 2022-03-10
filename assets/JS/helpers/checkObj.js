export const checkObj = (arr, obj) => {
  if (arr.length === 0) {
    arr.push(obj);
    return;
  }
  const arrForCheck = arr.map((item) => item.countryName);
  // console.log("Array For Check", arrForCheck); => an Array with countries name
  if (!arrForCheck.includes(obj.countryName)) {
    arr.push(obj);
  } else {
    console.log("This country has been already added to the list", obj);
    return;
  }
};
