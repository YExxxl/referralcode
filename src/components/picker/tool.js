function _typeof(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

export function isString(obj) {
  return _typeof(obj) === 'string';
}

export function isPlainObject(obj) {
  return _typeof(obj) === 'object';
}

module.exports = {
  isString,
  isPlainObject
}
