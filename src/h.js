var EMPTYO = {};
var EMPTYAR = [];
var isArray = Array.isArray;

export function h(type, props, contArg) {
  var content;
  var len = arguments.length - 2;

  if (len === 0) {
    content = EMPTYAR;
  } else if (len === 1) {
    if (isArray(contArg)) {
      content = maybeFlatten(contArg);
    } else if (contArg && contArg._vnode) {
      content = contArg;
    } else {
      content = { _text: contArg };
    }
  } else {
    content = flattenChildren(arguments, 2, []);
  }

  return {
    _vnode: true,
    type,
    key: props && props.key,
    props: props || EMPTYO,
    content,
    _data: null,
    _node: null
  };
}

function maybeFlatten(arr) {
  for (var i = 0; i < arr.length; i++) {
    var ch = arr[i];
    if (isArray(ch)) return flattenChildren(arr, i, arr.slice(0, i));
  }
  return arr;
}

function flattenChildren(children, start, arr) {
  for (var i = start; i < children.length; i++) {
    var ch = children[i];
    if (isArray(ch)) {
      flattenChildren(ch, 0, arr);
    } else if (ch && ch._vnode) {
      arr.push(ch);
    } else {
      arr.push({ _text: ch });
    }
  }
  return arr;
}