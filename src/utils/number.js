export function roundToTheNearestAnything(value, roundTo) {
  var mod = value % roundTo;
  if (mod < (roundTo / 2)) {
   return  value + (-mod);
  }else {
   return value + (roundTo - mod);
  }
}
