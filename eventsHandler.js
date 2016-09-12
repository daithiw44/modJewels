'use strict';
function addEvent(node, type, listener) {
  if (!(node = $(node))) return false;
  if (node.addEventListener) {
    node.addEventListener(type, listener, false);
    return true;
  } else if (node.attachEvent) {
    // MSIE method
    node['e' + type + listener] = listener;
    node[type + listener] = () => {
      node['e' + type + listener](window.event);
    };
    node.attachEvent('on' + type, node[type + listener]);
    return true;
  }
  return false;
}

function $(...args) {
  let element, elements = [];
  args.forEach((element) =>{
    if (typeof element == 'string') {
      element = document.getElementById(element);
    }
    if (args.length === 1) {
      elements = element;
    } else {
      elements.push(element);
    }
  });
  return elements;
}

export {$, addEvent}; 
