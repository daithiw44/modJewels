'use strict';
const XMLHttpFactories = [
  function() {
    return new XMLHttpRequest();
  },
  function() {
    return new ActiveXObject('Msxml2.XMLHTTP');
  },
  function() {
    return new ActiveXObject('Msxml3.XMLHTTP');
  },
  function() {
    return new ActiveXObject('Microsoft.XMLHTTP');
  }
];

let createXMLHTTPObject = function() {
  let i, xmlhttp = false;
  for (i = 0; i < XMLHttpFactories.length; i++) {
    try {
      xmlhttp = XMLHttpFactories[i]();
    } catch (e) {
      continue;
    }
    break;
  }
  createXMLHTTPObject = () => { return xmlhttp; }; 
  return xmlhttp;
};

function sendRequest(url, callback, postData, type='application/json' ) {
  let method, req = createXMLHTTPObject();
  if (!req) return;
  method = (postData) ? 'POST' : 'GET';
  req.open(method, url, true);
  req.setRequestHeader('Content-type',type);
  if (postData) req.onreadystatechange = function() {
    if (req.readyState != 4) return;
    if (req.status != 200 && req.status != 304) {
      return;
    }
    callback(req.responseText);
  };
  if (req.readyState == 4) return;
  req.send(postData);
}

export default sendRequest;
