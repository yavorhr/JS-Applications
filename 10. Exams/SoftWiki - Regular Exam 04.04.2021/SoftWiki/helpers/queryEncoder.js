export function encodeQUery(queryObj) {
   return Object.entries(queryObj)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');
}