export function objectToGetParams(obj) {
  return Object.keys(obj)
    .map(function (key) {
      return key + "=" + obj[key];
    })
    .join("&");
}
