/*
 * Web Mapping Components
 * https://github.com/CSBP-CPSE/web-mapping-components/blob/master/LICENCE.md
 * v1.0 - 2021-02-04
 */

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var Util = /*#__PURE__*/function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, null, [{
    key: "Mixin",

    /**
    * Merges an object into another object. 
    *
    * @param {object} a - the object that will receive the properties 
    * @param {object} b - the object to merge into object A
    * @returns the modified Object
    */
    value: function Mixin(a, b) {
      for (var key in b) {
        if (b.hasOwnProperty(key)) a[key] = b[key];
      } // TODO : Why did I use arguments[0] instead of a?


      return arguments[0];
    }
    /**
    * Debounces a function. The function will be executed after a timeout 
    * unless the function is called again in which case, the timeout will
    * reset
    *
    * @param {function} delegate - the Function to debounce
    * @param {integer} threshold - the timeout length, in milliseconds
    * @returns {function} the debounced function
    */

  }, {
    key: "Debounce",
    value: function Debounce(delegate, threshold) {
      var timeout;
      return function debounced() {
        function delayed() {
          delegate.apply(this, arguments);
          timeout = null;
        }

        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(delayed.bind(this), threshold || 100);
      };
    }
    /**
    * Formats a String using substitute strings
    *
    * Example: 
    * Input: Format("Hello world! My name is {0} {1}", ["Foo", "Bar"])
    * Output: "Hello world! My name is Foo Bar"
    *
    * @param {string} str - String, the String to format
    * @param {array} subs - Array(String), An array of Strings to substitute into the String
    * @returns {string} the formatted String
    */

  }, {
    key: "Format",
    value: function Format(str, subs) {
      if (!subs || subs.length == 0) return str;
      var s = str;

      for (var i = 0; i < subs.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, subs[i]);
      }

      return s;
    }
    /**
     * Gets the value of the first property of a provided object
     * 
     * @param {object} obj - object to get first property from
     * @returns the value of the first object
     */

  }, {
    key: "FirstProperty",
    value: function FirstProperty(obj) {
      var firstPropVal;
      var props = Object.getOwnPropertyNames(obj);

      if (props.length) {
        firstPropVal = obj[props[0]];
      }

      return firstPropVal;
    }
    /**
     * ParseCsv takes a string containing csv data, and parses it to generate an array
     * containing each row of the csv.
     * 
     * Example:
     * 
     * Util.ParseCsv("name,age\nfoo,22\nbar,24") -> [["name","age"],["foo","22"],["bar","24"]]
     * 
     * @param {string} csv - string containing csv data
     * @returns {array} a list containing each row of csv data
     */

  }, {
    key: "ParseCsv",
    value: function ParseCsv(csv) {
      var s = 0;
      var i = 0;
      var lines = [[]];

      while (s < csv.length) {
        if (csv[s] == '"') {
          s++;
          var e = csv.indexOf('"', s);
          lines[i].push(csv.substr(s, e - s));
          e++;
        } else {
          var e1 = csv.indexOf(',', s);
          var e2 = csv.indexOf('\n', s);
          var e = e1 > -1 && e1 < e2 ? e1 : e2;
          lines[i].push(csv.substr(s, e - s));

          if (e == e2) {
            lines.push([]);
            i++;
          }
        }

        s = e + 1;
      }

      return lines;
    }
    /**
     * Sets the disabled property to true or false for a provided selection
     * of nodes if they are of a focusable type.
     * 
     * @param {array} nodes - A list of DOM selections.
     * @param {boolean} disabled - true or false.
     */

  }, {
    key: "DisableFocusable",
    value: function DisableFocusable(nodes, disabled) {
      var focusable = ["button", "fieldset", "input", "optgroup", "option", "select", "textarea"];
      nodes.forEach(function (n) {
        var selection = n.querySelectorAll(focusable);
        if (selection.length == 0) return;

        for (var i = 0; i < selection.length; i++) {
          selection[i].disabled = disabled;
        }
      });
    }
  }]);

  return Util;
}();

var _nls = null;
var _locale = null;
var _templatables = {};

var Core = /*#__PURE__*/function () {
  function Core() {
    _classCallCheck(this, Core);
  }

  _createClass(Core, null, [{
    key: "Nls",

    /**
    * Get a localized nls string ressource
    *
    * Parameters :
    *	id : String, the id of the nls ressource to retrieve
    *	subs : Array(String), an array of Strings to substitute in the localized nls string ressource
    *	locale : String, the locale for the nls ressource
    * Return : String, the localized nls string ressource
    */
    value: function Nls(id, subs, locale) {
      if (!this.nls) throw new Error("Nls content not set.");
      var itm = this.nls[id];
      if (!itm) throw new Error("Nls String '" + id + "' undefined.");
      var txt = itm[locale ? locale : this.locale];
      if (txt === undefined || txt === null) throw new Error("String does not exist for requested language.");
      return Util.Format(txt, subs);
    }
    /**
    * A convenience function to get a deffered object for asynchronous processing. 
    * Removes one level of nesting when working with promises
    *
    * Parameters :
    *	none
    * Return : Object, an object with a Resolve and Reject function
    *
    * { 
    *	promise: the promise object associated to the asynchronous process, 
    *	Resolve: a function to resolve the promise, 
    *	Reject: a function to reject the promise 
    * }
    */

  }, {
    key: "Defer",
    value: function Defer() {
      var defer = {};
      defer.promise = new Promise(function (resolve, reject) {
        defer.Resolve = function (result) {
          resolve({
            result: result
          });
        };

        defer.Reject = function (error) {
          reject({
            error: error
          });
        };
      });
      return defer;
    }
    /**
    * Get or set a templated class definition, this is required to nest Templated UI 
    * components within other Templated UI components.
    *
    * Parameters :
    *	id : String, the id of the templated class definition to get or set
    *	definition : Class, when specified, the class definition to set 
    * Return : Class, the class definition created  
    */

  }, {
    key: "Templatable",
    value: function Templatable(id, definition) {
      if (definition) {
        if (_templatables[id]) throw new Error("Templatable ".concat(id, " is defined multiple times."));else _templatables[id] = definition;
      } else if (!_templatables[id]) throw new Error("Templatable ".concat(id, " is not defined."));

      return _templatables[id];
    }
    /**
    * Get an Array of class definitions by matching its
    *
    * Parameters :
    *	id : String, the id of the nls ressource to retrieve
    *	subs : Array(String), an array of Strings to substitute in the localized nls string ressource
    *	locale : String, the locale for the nls ressource
    * Return : String, the localized nls string ressource
    */

  }, {
    key: "Templated",
    value: function Templated(namespace) {
      var templated = [];

      for (var id in _templatables) {
        if (id.match(namespace)) templated.push(_templatables[id]);
      }

      return templated;
    }
  }, {
    key: "root",
    set: function set(value) {
      this._root = value;
    },
    get: function get() {
      return this._root;
    }
    /**
    * Gets the nls ressources
    *
    * Return : Object, an object containing the nls ressources
    */

  }, {
    key: "nls",
    get: function get() {
      return _nls;
    }
    /**
    * Sets the nls ressources
    */
    ,
    set: function set(value) {
      _nls = value;
    }
    /**
    * Gets the locale String
    *
    * Return : String, a String containing the locale
    */

  }, {
    key: "locale",
    get: function get() {
      return _locale;
    }
    /**
    * Sets the locale String
    */
    ,
    set: function set(value) {
      _locale = value;
    }
  }]);

  return Core;
}();

/**
 * A collection of methods for manipulating content in a Document Object Model (DOM).
 */

var Dom = /*#__PURE__*/function () {
  function Dom() {
    _classCallCheck(this, Dom);
  }

  _createClass(Dom, null, [{
    key: "Node",

    /**
    * Retrieve an Element using a selector
    *
    * @param {HTML Element} pNode - the parent node where to begin the search
    * @param {string} selector - a selector statement
    * @returns {HTML Element} The Element found, null otherwise
    */
    value: function Node(pNode, selector) {
      return pNode.querySelectorAll(selector).item(0) || null;
    }
    /**
    * Create an Element appended to specified parent node
    *
    * @param {string} tagName - the type of Element to be created (div, span, label, input, etc.)
    * @param {object} options - a dictionary type object containing the options to assign to the created Element
    * @param {HTML Element} pNode - the parent Element where the created Element will be apended
    * @returns {HTML Element} the Element created
    */

  }, {
    key: "Create",
    value: function Create(tagName, options, pNode) {
      var elem = document.createElement(tagName);
      Util.Mixin(elem, options);
      this.Place(elem, pNode);
      return elem;
    }
    /**
    * Create an SVG Element and append it to parent node.
    *
    * @param {string} tagName - the type of SVG Element to be created (rect, path, etc.)
    * @param {object} options - a dictionary type object containing the options to assign to the created SVG Element
    * @param {HTML Element} pNode - the parent Element where the created SVG Element will be apended
    * @returns {HTML Element} The SVG Element created
    */

  }, {
    key: "CreateSVG",
    value: function CreateSVG(tagName, options, pNode) {
      var elem = document.createElementNS("http://www.w3.org/2000/svg", tagName);

      for (var id in options) {
        elem.setAttribute(id, options[id]);
      }

      this.Place(elem, pNode);
      return elem;
    }
    /**
    * Create an Element from a namespace
    *
    * Valid Namespaces are : 
    *	HTML : http://www.w3.org/1999/xhtml
    *	SVG  : http://www.w3.org/2000/svg
    *	XBL  : http://www.mozilla.org/xbl
    *	XUL  : http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul
    *
    * @param {string} ns - the URI namespace containing the Element to create 
    * @param {string} tagName - the type of Element to be created (rect, path, etc.)
    * @param {object} options - a dictionary type object containing the options to assign to the created Element
    * @param {HTML Element} pNode - the parent Element where the created Element will be apended
    * @returns {HTML Element} The SVG Element created
    */

  }, {
    key: "CreateNS",
    value: function CreateNS(ns, tagName, options, pNode) {
      var elem = document.createElementNS(ns, tagName);

      for (var id in options) {
        elem.setAttribute(id, options[id]);
      }

      this.Place(elem, pNode);
      return elem;
    }
    /**
    * Append an Element to another Element
    *
    * @param {HTML Element} elem - the Element to append
    * @param {HTML Element} pNode - the parent Element where the Element will be apended
    */

  }, {
    key: "Place",
    value: function Place(elem, pNode) {
      if (!!pNode) pNode.appendChild(elem);
    }
    /**
    * Remove all children of an Element
    *
    * @param {HTML Element} elem - The DOM Element being emptied
    */

  }, {
    key: "Empty",
    value: function Empty(elem) {
      while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
      }
    }
    /**
    * Add classes to an Element
    *
    * @param {HTML Element} elem - the Element to modify
    * @param {string} elemClasses - the class names to add to the Element
    */

  }, {
    key: "AddClasses",
    value: function AddClasses(elem, elemClasses) {
      var c1 = elem.className.split(" ");
      elemClasses.split(" ").forEach(function (c) {
        if (c1.indexOf(c) == -1) c1.push(c);
      });
      elem.className = c1.join(" ");
    }
    /**
    * Remove a class from an Element
    *
    * @param {HTML Element} elem - the Element to modify
    * @param {string} elemClass - the class to be removed from the Element
    */

  }, {
    key: "RemoveClass",
    value: function RemoveClass(elem, elemClass) {
      var c1 = elem.className.split(" ");
      var c2 = elemClass.split(" ");
      elem.className = c1.filter(function (c) {
        return c2.indexOf(c) == -1;
      }).join(" ");
    }
    /**
    * Verify that an Element contains a class
    *
    * @param {HTML Element} elem - the Element to verify
    * @param {string} elemClass - the class to verify
    * @returns {boolean} true if the Element contains the class, false otherwise
    */

  }, {
    key: "HasClass",
    value: function HasClass(elem, elemClass) {
      return (' ' + elem.className + ' ').indexOf(' ' + elemClass + ' ') > -1;
    }
    /**
    * Set the class of an Element
    *
    * @param {HTML Element} elem - the Element to modify
    * @param {string} elemClass - set the class of the Element
    */

  }, {
    key: "SetClass",
    value: function SetClass(elem, elemClass) {
      elem.className = elemClass;
    }
    /**
    * Toggle a class on or off for an Element
    *
    * @param {HTML Element} elem - the Element to modify
    * @param {string} elemClass - the class to add/remove from the Element
    * @param {boolean} enabled - true to add the class, or false to remove class
    */

  }, {
    key: "ToggleClass",
    value: function ToggleClass(elem, elemClass, enabled) {
      if (enabled) {
        this.AddClasses(elem, elemClass);
      } else {
        this.RemoveClass(elem, elemClass);
      }
    }
    /**
    * Get an attribute value from an Element
    *
    * @param {HTML Element} elem - the Element to retrieve the attribute from
    * @param {string} attr - the name of the attribute to retrieve
    * @returns {string} - the value of the attribute if found, null otherwise
    */

  }, {
    key: "GetAttribute",
    value: function GetAttribute(elem, attr) {
      var attr = elem.attributes.getNamedItem(attr);
      return attr ? attr.value : null;
    }
    /**
    * Set an attribute value on an Element
    *
    * @param {HTML Element} elem - the Element to set the attribute on
    * @param {string} attr - the name of the attribute to set
    * @param {string} value - the value of the attribute to set
    */

  }, {
    key: "SetAttribute",
    value: function SetAttribute(elem, attr, value) {
      elem.setAttribute(attr, value);
    }
    /**
    * Get the size of an Element
    *
    * @param {HTML Element} elem - the Element to retrieve the size
    * @returns {object} An object literal containing the size of the Element
    * { 
    *	w: width of the Element, 
    *	h: height of the Element 
    * }
    */

  }, {
    key: "Size",
    value: function Size(elem) {
      var style = window.getComputedStyle(elem);
      var h = +style.getPropertyValue("height").slice(0, -2);
      var w = +style.getPropertyValue("width").slice(0, -2);
      var pL = +style.getPropertyValue("padding-left").slice(0, -2);
      var pR = +style.getPropertyValue("padding-right").slice(0, -2);
      var pT = +style.getPropertyValue("padding-top").slice(0, -2);
      var pB = +style.getPropertyValue("padding-bottom").slice(0, -2);
      var w = w - pL - pR;
      var h = h - pT - pB; // Use smallest width as width and height for square grid that fits in container
      // var s = w < h ? w : h;

      return {
        w: w,
        h: h
      };
    }
    /**
    * Get the siblings of an Element
    *
    * @param {HTML Element} elem - the Element to retrieve the siblings
    * @returns {array} An array of elements containing the siblings of the input element
    */

  }, {
    key: "Siblings",
    value: function Siblings(elem) {
      var elements = [];

      for (var i = 0; i < elem.parentNode.children.length; i++) {
        elements.push(elem.parentNode.children[i]);
      }

      elements.splice(elements.indexOf(elem), 1);
      return elements;
    }
  }]);

  return Dom;
}();

var Net = /*#__PURE__*/function () {
  function Net() {
    _classCallCheck(this, Net);
  }

  _createClass(Net, null, [{
    key: "Request",

    /**
    * Execute a web request
    *
    * Parameters :
    *	url : String, the request URL
    * Return : none
    *
    * TODO : This should return a promise object but (ie11)
    *
    */
    value: function Request(url) {
      var d = Core.Defer();
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState != 4) return; // TODO : Switched to this.response, check if it breaks anything

        if (this.status == 200) d.Resolve(this.response);else {
          var error = new Error(this.status + " " + this.statusText);
          d.Reject(error);
        }
      };

      xhttp.open("GET", url, true);
      xhttp.send();
      return d.promise;
    }
  }, {
    key: "JSON",
    value: function (_JSON) {
      function JSON(_x) {
        return _JSON.apply(this, arguments);
      }

      JSON.toString = function () {
        return _JSON.toString();
      };

      return JSON;
    }(function (url) {
      var d = Core.Defer();
      Net.Request(url).then(function (r) {
        return d.Resolve(JSON.parse(r.result));
      }, d.Reject);
      return d.promise;
    })
    /**
    * Get a parameter value from the document URL
    *
    * Parameters :
    *	name : String, the name of the parameter to retrieve from the URL
    * Return : String, the value of the parameter from the URL, an empty string if not found
    */

  }, {
    key: "GetUrlParameter",
    value: function GetUrlParameter(name) {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
      var results = regex.exec(window.location.href);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    /**
    * Download content as a file
    *
    * Parameters :
    *	name : String, the name of the file to download
    *	content : 
    * Return : none
    */

  }, {
    key: "Download",
    value: function Download(name, content) {
      var link = document.createElement("a");
      link.href = "data:application/octet-stream," + encodeURIComponent(content);
      link.download = name;
      link.click();
      link = null;
    }
    /**
    * Gets the base URL for the app
    *
    * Parameters : none
    * Return : String, the base path to the web app
    */

  }, {
    key: "AppPath",
    value: function AppPath() {
      var path = location.href.split("/");
      path.pop();
      return path.join("/");
    }
    /**
    * Gets the base URL for the app
    *
    * Parameters : none
    * Return : String, the base path to the web app
    */

  }, {
    key: "FilePath",
    value: function FilePath(file) {
      file = file.charAt(0) == "/" ? file.substr(1) : file;
      var path = [Net.AppPath(), file];
      return path.join("/");
    }
  }]);

  return Net;
}();

var Evented = /*#__PURE__*/function () {
  function Evented() {
    _classCallCheck(this, Evented);

    this.listeners = {};
  }

  _createClass(Evented, [{
    key: "addEventListener",
    value: function addEventListener(type, callback, once) {
      if (!(type in this.listeners)) this.listeners[type] = [];
      var h = {
        target: this,
        type: type,
        callback: callback,
        once: !!once
      };
      this.listeners[type].push(h);
      return h;
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, callback) {
      if (!(type in this.listeners)) return;
      var stack = this.listeners[type];

      for (var i = 0, l = stack.length; i < l; i++) {
        if (stack[i].callback === callback) {
          stack.splice(i, 1);
          return this.removeEventListener(type, callback);
        }
      }
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      if (!(event.type in this.listeners)) return;
      var stack = this.listeners[event.type];

      for (var i = 0; i < stack.length; i++) {
        stack[i].callback.call(this, event);
      }

      for (var i = stack.length - 1; i >= 0; i--) {
        if (!!stack[i].once) this.removeEventListener(event.type, stack[i].callback);
      }
    }
  }, {
    key: "Emit",
    value: function Emit(type, data) {
      // Let base event properties be overwritten by whatever was provided.	
      var event = {
        bubbles: true,
        cancelable: true
      };
      Util.Mixin(event, data); // Use the type that was specifically provided, target is always this.

      event.type = type;
      event.target = this;
      this.dispatchEvent(event);
    }
  }, {
    key: "On",
    value: function On(type, callback) {
      return this.addEventListener(type, callback, false);
    }
  }, {
    key: "Once",
    value: function Once(type, callback) {
      return this.addEventListener(type, callback, true);
    }
  }, {
    key: "Off",
    value: function Off(type, callback) {
      this.removeEventListener(type, callback);
    }
  }]);

  return Evented;
}();

var Templated = /*#__PURE__*/function (_Evented) {
  _inherits(Templated, _Evented);

  var _super = _createSuper(Templated);

  function Templated(container, options) {
    var _this;

    _classCallCheck(this, Templated);

    _this = _super.call(this);
    _this.options = options || {};

    _this.BuildTemplate();

    if (_this.template) _this.SetNamedNodes();
    if (_this.template) _this.BuildSubWidgets();
    if (_this.template) _this.SetRoots();
    if (container) _this.Place(container);
    return _this;
  }

  _createClass(Templated, [{
    key: "BuildTemplate",
    value: function BuildTemplate() {
      // Use template provided in options first, use Template function second
      var html = this.options.template ? this.options.template : this.Template(); // TODO : I think it still works with empty templates.

      if (!html) return; // Trailing whitespaces can cause issues when parsing the template, remove them

      html = html.trim(); // Replace all nls strings in template. Nls string pattern in templates is nls(StringId)

      html = this.Replace(html, /nls\((.*?)\)/, function (m) {
        return Core.Nls(m);
      });
      this.template = Dom.Create("div", {
        innerHTML: html
      });
    }
  }, {
    key: "SetNamedNodes",
    value: function SetNamedNodes() {
      var named = this.template.querySelectorAll("[handle]");
      this.nodes = {}; // Can't use Array ForEach here since named is a NodeList, not an array

      for (var i = 0; i < named.length; i++) {
        var name = Dom.GetAttribute(named[i], "handle");
        this.nodes[name] = named[i];
      }
    }
  }, {
    key: "BuildSubWidgets",
    value: function BuildSubWidgets() {
      var nodes = this.template.querySelectorAll("[widget]");

      for (var i = 0; i < nodes.length; i++) {
        var path = Dom.GetAttribute(nodes[i], "widget");
        var module = Core.Templatable(path);
        var widget = new module(nodes[i]);
        var handle = Dom.GetAttribute(widget.container, "handle");
        if (handle) this.nodes[handle] = widget;
      }
    }
  }, {
    key: "SetRoots",
    value: function SetRoots() {
      this.roots = [];

      for (var i = 0; i < this.template.children.length; i++) {
        this.roots.push(this.template.children[i]);
      }
    }
  }, {
    key: "Place",
    value: function Place(container) {
      this.container = container;
      this.roots.forEach(function (r) {
        return Dom.Place(r, container);
      });
    }
  }, {
    key: "Template",
    value: function Template() {
      return null;
    }
  }, {
    key: "Replace",
    value: function Replace(str, expr, delegate) {
      var m = str.match(expr);

      while (m) {
        str = str.replace(m[0], delegate(m[1]));
        m = str.match(expr);
      }

      return str;
    }
  }, {
    key: "Node",
    value: function Node(id) {
      return this.nodes[id];
    } // TODO : Build a root function

  }]);

  return Templated;
}(Evented);

var Popup = /*#__PURE__*/function (_Templated) {
  _inherits(Popup, _Templated);

  var _super = _createSuper(Popup);

  _createClass(Popup, [{
    key: "Content",
    set: function set(content) {
      this.content = content;
      Dom.Place(content, this.Node("body"));
    },
    get: function get() {
      return this.content;
    }
  }]);

  function Popup(classes, container) {
    var _this;

    _classCallCheck(this, Popup);

    _this = _super.call(this, container || document.body);
    _this.onBody_KeyUp_Bound = _this.onBody_KeyUp.bind(_assertThisInitialized(_this));
    _this.content = null;
    _this.h = null;

    _this.Node("close").addEventListener("click", _this.onBtnClose_Click.bind(_assertThisInitialized(_this)));

    if (classes) Dom.AddClasses(_this.Node("root"), classes);

    _this.Node("root").addEventListener("click", _this.onModal_Click.bind(_assertThisInitialized(_this)));

    _this.SetStyle(0, "hidden");

    return _this;
  }

  _createClass(Popup, [{
    key: "SetStyle",
    value: function SetStyle(opacity, visibility) {
      this.Node("root").style.opacity = opacity;
      this.Node("root").style.visibility = visibility;
    }
  }, {
    key: "Show",
    value: function Show() {
      Util.DisableFocusable(Dom.Siblings(this.Node("root")), true);
      this.h = document.body.addEventListener("keyup", this.onBody_KeyUp_Bound);
      this.SetStyle(1, "visible");
      this.Emit("Show", {
        popup: this
      });
      this.Node("close").focus();
    }
  }, {
    key: "Hide",
    value: function Hide() {
      Util.DisableFocusable(Dom.Siblings(this.Node("root")), false);
      document.body.removeEventListener("keyup", this.onBody_KeyUp_Bound);
      this.SetStyle(0, "hidden");
      this.Emit("Hide", {
        popup: this
      });
    }
  }, {
    key: "onBody_KeyUp",
    value: function onBody_KeyUp(ev) {
      if (ev.keyCode == 27) this.Hide();
    }
  }, {
    key: "onModal_Click",
    value: function onModal_Click(ev) {
      this.Hide();
    }
  }, {
    key: "onBtnClose_Click",
    value: function onBtnClose_Click(ev) {
      this.Hide();
    }
  }, {
    key: "Template",
    value: function Template() {
      return "<div handle='root' class='popup'>" + "<div class='popup-container'>" + "<div class='popup-header'>" + "<div class='popup-title' handle='title'></div>" + "<button class='close' handle='close'>×</button>" + "</div>" + "<div class='popup-body' handle='body'></div>" + "</div>" + "</div>";
    }
  }]);

  return Popup;
}(Templated);

var Tooltip = /*#__PURE__*/function (_Templated) {
  _inherits(Tooltip, _Templated);

  var _super = _createSuper(Tooltip);

  _createClass(Tooltip, [{
    key: "BBox",
    get: function get() {
      return this.Node("root").getBoundingClientRect();
    }
  }]);

  function Tooltip(node, classes) {
    var _this;

    _classCallCheck(this, Tooltip);

    _this = _super.call(this, node || document.body);
    if (classes) Dom.AddClasses(_this.Node("root"), classes);
    return _this;
  }

  _createClass(Tooltip, [{
    key: "Template",
    value: function Template() {
      return '<div handle="root" class="tooltip">' + '<div handle="content"></div>' + '</div>';
    }
  }, {
    key: "PositionTarget",
    value: function PositionTarget(target, offset) {
      var bbox1, bbox2;
      offset = offset || [0, 0];
      bbox1 = target.getBoundingClientRect();
      bbox2 = this.Node("root").getBoundingClientRect();
      var x = bbox1.left + bbox1.width / 2 - bbox2.width / 2 + offset[0];
      var y = bbox1.top + document.documentElement.scrollTop - bbox2.height - 5 + offset[1];
      this.PositionXY(x, y);
    }
  }, {
    key: "PositionXY",
    value: function PositionXY(x, y) {
      this.Node("root").style.left = x + "px";
      this.Node("root").style.top = y + "px";

      if (this.BBox.left + this.BBox.width > window.innerWidth) {
        this.Node("root").style.top = y + 30 + "px";
        this.Node("root").style.left = -180 + x + "px";
      }
    }
  }, {
    key: "Show",
    value: function Show(x, y) {
      this.PositionXY(x, y);
      this.Node("root").style.opacity = 1;
    }
  }, {
    key: "Hide",
    value: function Hide() {
      this.Node("root").style.opacity = 0;
    }
  }, {
    key: "Empty",
    value: function Empty() {
      Dom.Empty(this.Node("content"));
    }
  }]);

  return Tooltip;
}(Templated);

var typeahead = Core.Templatable("Basic.Components.Typeahead", /*#__PURE__*/function (_Templated) {
  _inherits(Typeahead, _Templated);

  var _super = _createSuper(Typeahead);

  _createClass(Typeahead, [{
    key: "placeholder",
    set: function set(value) {
      this.Node('input').setAttribute('placeholder', value);
    }
  }, {
    key: "title",
    set: function set(value) {
      this.Node('input').setAttribute('title', value);
    }
  }, {
    key: "items",
    set: function set(value) {
      var _this2 = this;

      this._items = value.map(function (i) {
        var li = Dom.Create("li", {
          innerHTML: i.label,
          tabIndex: -1
        });
        var item = {
          data: i,
          node: li
        };
        li.addEventListener("mousedown", _this2.onLiClick_Handler.bind(_this2, item));
        return item;
      });
    }
  }, {
    key: "current",
    set: function set(value) {
      this._curr = value;
    },
    get: function get() {
      return this._curr;
    }
  }]);

  function Typeahead(container, options) {
    var _this;

    _classCallCheck(this, Typeahead);

    _this = _super.call(this, container, options);
    _this._items = null;
    _this._filt = null;
    _this._curr = null;
    _this._temp = null;

    _this.Node("input").addEventListener("input", function (ev) {
      this.OnInputInput_Handler(ev);
    }.bind(_assertThisInitialized(_this))); // this.Node("input").addEventListener("click", this.OnInputClick_Handler.bind(this));


    _this.Node("input").addEventListener("keydown", function (ev) {
      this.OnInputKeyDown_Handler(ev);
    }.bind(_assertThisInitialized(_this)));

    _this.Node("input").addEventListener("blur", function (ev) {
      this.OnInputBlur_Handler(ev);
    }.bind(_assertThisInitialized(_this)));

    _this.Node("input").addEventListener("focusin", function (ev) {
      this.OnInputClick_Handler(ev);
    }.bind(_assertThisInitialized(_this))); // this.Node("input").addEventListener("focusout", this.OnInputBlur_Handler.bind(this));


    if (!options) return _possibleConstructorReturn(_this);
    _this.items = options.items;
    return _this;
  }

  _createClass(Typeahead, [{
    key: "Empty",
    value: function Empty() {
      Dom.Empty(this.Node("list"));
      this._filt = [];
    }
  }, {
    key: "Fill",
    value: function Fill(mask) {
      this._filt = this._items.filter(function (i) {
        return compare(i.data.label, mask);
      });
      var frag = document.createDocumentFragment();

      for (var i = 0; i < this._filt.length; i++) {
        var curr = this._filt[i]; // Maybe insert <b> at right index instead, faster?

        curr.node.innerHTML = curr.data.label.replace(mask, "<b>".concat(mask, "</b>"));
        curr.next = this._filt[(i + 1) % this._filt.length];
        curr.next.prev = curr;
        Dom.Place(curr.node, frag);
      }

      Dom.Place(frag, this.Node("list"));

      function compare(label, mask) {
        return label.toLowerCase().indexOf(mask.toLowerCase()) !== -1;
      }
    }
  }, {
    key: "UpdateClass",
    value: function UpdateClass() {
      Dom.ToggleClass(this.Node("root"), "collapsed", this._filt.length == 0);
    }
  }, {
    key: "Reset",
    value: function Reset() {
      if (this._temp) Dom.SetClass(this._temp.node, "");
      this._temp = null;
      this.Empty();
      var value = this.current ? this.current.data.label : "";
      this.Node("input").value = value;
    }
  }, {
    key: "OnInputInput_Handler",
    value: function OnInputInput_Handler(ev) {
      if (ev.target.value.length < 3) return;
      this.Empty();
      this.Fill(ev.target.value);
      this.UpdateClass();
    }
  }, {
    key: "OnInputClick_Handler",
    value: function OnInputClick_Handler(ev) {
      if (ev.target.value.length < 3) return;
      this.Fill(ev.target.value);
      this.UpdateClass();
    }
  }, {
    key: "OnInputKeyDown_Handler",
    value: function OnInputKeyDown_Handler(ev) {
      // prevent default event on specifically handled keys
      if (ev.keyCode == 40 || ev.keyCode == 38 || ev.keyCode == 13 || ev.keyCode == 27) ev.preventDefault(); // shift + up : select text

      if (ev.shiftKey == true && ev.keyCode == 38) this.nodes.Input.select(); // up or down key : cycle through dropdown
      else if (ev.keyCode == 40 || ev.keyCode == 38) {
          this._temp = this._temp || this._filt[this._filt.length - 1];
          Dom.SetClass(this._temp.node, "");
          this._temp = ev.keyCode == 40 ? this._temp.next : this._temp.prev;
          this.Node("input").value = this._temp.data.label;
          this.ScrollTo(this._temp);
          Dom.SetClass(this._temp.node, "active");
        } // enter : select currently focused
        else if (ev.keyCode == 13) {
            // if an item is currently selected through arrows, select that one
            if (this._temp) this.onLiClick_Handler(this._temp); // if a filtered list is being shown, select the first item
            else if (this._filt.length > 0) this.onLiClick_Handler(this._filt[0]); // nothing is selected (don't think this can happen		    	
              else {
                  this.OnInputClick_Handler({
                    target: this.Node("input")
                  });
                }
          } // if escape key
          else if (ev.keyCode == 27) this.OnInputBlur_Handler();
    }
  }, {
    key: "OnInputBlur_Handler",
    value: function OnInputBlur_Handler(ev) {
      this.Reset();
      this.UpdateClass();
    }
  }, {
    key: "onLiClick_Handler",
    value: function onLiClick_Handler(item, ev) {
      this.current = item;
      this.Reset();
      this.UpdateClass();
      this.Emit("Change", {
        item: item.data
      });
    }
  }, {
    key: "ScrollTo",
    value: function ScrollTo(item) {
      // create rectangules to know the position of the elements
      var ul = this.Node("list");
      var liBx = item.node.getBoundingClientRect();
      var ulBx = ul.getBoundingClientRect(); //if the element is in this range then it is inside the main container, don't scroll

      if (liBx.bottom > ulBx.bottom) ul.scrollTop = ul.scrollTop + liBx.bottom - ulBx.top - ulBx.height;else if (liBx.top < ulBx.top) ul.scrollTop = ul.scrollTop + liBx.top - ulBx.top;
    }
  }, {
    key: "Template",
    value: function Template() {
      return "<div handle='root' class='typeahead collapsed'>" + "<input handle='input' type='text' class='input'>" + "<ul handle='list' class='list'></ul>" + "</div>";
    }
  }]);

  return Typeahead;
}(Templated));

/*https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js*/
!function (e, n) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? n() : "function" == typeof define && define.amd ? define(n) : n();
}(0, function () {

  function e(e) {
    var n = this.constructor;
    return this.then(function (t) {
      return n.resolve(e()).then(function () {
        return t;
      });
    }, function (t) {
      return n.resolve(e()).then(function () {
        return n.reject(t);
      });
    });
  }

  function n(e) {
    return !(!e || "undefined" == typeof e.length);
  }

  function t() {}

  function o(e) {
    if (!(this instanceof o)) throw new TypeError("Promises must be constructed via new");
    if ("function" != typeof e) throw new TypeError("not a function");
    this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], c(e, this);
  }

  function r(e, n) {
    for (; 3 === e._state;) {
      e = e._value;
    }

    0 !== e._state ? (e._handled = !0, o._immediateFn(function () {
      var t = 1 === e._state ? n.onFulfilled : n.onRejected;

      if (null !== t) {
        var o;

        try {
          o = t(e._value);
        } catch (r) {
          return void f(n.promise, r);
        }

        i(n.promise, o);
      } else (1 === e._state ? i : f)(n.promise, e._value);
    })) : e._deferreds.push(n);
  }

  function i(e, n) {
    try {
      if (n === e) throw new TypeError("A promise cannot be resolved with itself.");

      if (n && ("object" == _typeof(n) || "function" == typeof n)) {
        var t = n.then;
        if (n instanceof o) return e._state = 3, e._value = n, void u(e);
        if ("function" == typeof t) return void c(function (e, n) {
          return function () {
            e.apply(n, arguments);
          };
        }(t, n), e);
      }

      e._state = 1, e._value = n, u(e);
    } catch (r) {
      f(e, r);
    }
  }

  function f(e, n) {
    e._state = 2, e._value = n, u(e);
  }

  function u(e) {
    2 === e._state && 0 === e._deferreds.length && o._immediateFn(function () {
      e._handled || o._unhandledRejectionFn(e._value);
    });

    for (var n = 0, t = e._deferreds.length; t > n; n++) {
      r(e, e._deferreds[n]);
    }

    e._deferreds = null;
  }

  function c(e, n) {
    var t = !1;

    try {
      e(function (e) {
        t || (t = !0, i(n, e));
      }, function (e) {
        t || (t = !0, f(n, e));
      });
    } catch (o) {
      if (t) return;
      t = !0, f(n, o);
    }
  }

  var a = setTimeout;
  o.prototype["catch"] = function (e) {
    return this.then(null, e);
  }, o.prototype.then = function (e, n) {
    var o = new this.constructor(t);
    return r(this, new function (e, n, t) {
      this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof n ? n : null, this.promise = t;
    }(e, n, o)), o;
  }, o.prototype["finally"] = e, o.all = function (e) {
    return new o(function (t, o) {
      function r(e, n) {
        try {
          if (n && ("object" == _typeof(n) || "function" == typeof n)) {
            var u = n.then;
            if ("function" == typeof u) return void u.call(n, function (n) {
              r(e, n);
            }, o);
          }

          i[e] = n, 0 == --f && t(i);
        } catch (c) {
          o(c);
        }
      }

      if (!n(e)) return o(new TypeError("Promise.all accepts an array"));
      var i = Array.prototype.slice.call(e);
      if (0 === i.length) return t([]);

      for (var f = i.length, u = 0; i.length > u; u++) {
        r(u, i[u]);
      }
    });
  }, o.resolve = function (e) {
    return e && "object" == _typeof(e) && e.constructor === o ? e : new o(function (n) {
      n(e);
    });
  }, o.reject = function (e) {
    return new o(function (n, t) {
      t(e);
    });
  }, o.race = function (e) {
    return new o(function (t, r) {
      if (!n(e)) return r(new TypeError("Promise.race accepts an array"));

      for (var i = 0, f = e.length; f > i; i++) {
        o.resolve(e[i]).then(t, r);
      }
    });
  }, o._immediateFn = "function" == typeof setImmediate && function (e) {
    setImmediate(e);
  } || function (e) {
    a(e, 0);
  }, o._unhandledRejectionFn = function (e) {
    void 0 !== console && console && console.warn("Possible Unhandled Promise Rejection:", e);
  };

  var l = function () {
    if ("undefined" != typeof self) return self;
    if ("undefined" != typeof window) return window;
    if ("undefined" != typeof global) return global;
    throw Error("unable to locate global object");
  }();

  "Promise" in l ? l.Promise.prototype["finally"] || (l.Promise.prototype["finally"] = e) : l.Promise = o;
});

var promise_min = /*#__PURE__*/Object.freeze({
  __proto__: null
});

var Control = /*#__PURE__*/function (_Templated) {
  _inherits(Control, _Templated);

  var _super = _createSuper(Control);

  function Control(options) {
    var _this;

    _classCallCheck(this, Control);

    _this = _super.call(this, null, options);
    if (!_this.template) throw new Error("MapBox controls cannot be empty");
    if (_this.template.children.length > 1) throw new Error("MapBox controls should have one root node");
    _this._container = _this.template.children[0];
    return _this;
  }

  _createClass(Control, [{
    key: "onAdd",
    value: function onAdd(map) {
      this._map = map;
      return this._container;
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      this._container.parentNode.removeChild(this._container);

      this._map = undefined;
    }
  }]);

  return Control;
}(Templated);

var Bookmarks = /*#__PURE__*/function (_Control) {
  _inherits(Bookmarks, _Control);

  var _super = _createSuper(Bookmarks);

  function Bookmarks(options) {
    var _this;

    _classCallCheck(this, Bookmarks);

    _this = _super.call(this, options);
    _this._container = _this.Node('root');
    if (!options.items) return _possibleConstructorReturn(_this);
    options.items = options.items.sort(function (a, b) {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    });
    options.items.forEach(function (i) {
      _this.AddBookmark(i);
    });
    return _this;
  }

  _createClass(Bookmarks, [{
    key: "AddBookmark",
    value: function AddBookmark(item) {
      var li = Dom.Create('li', {
        className: "bookmarks-list-item",
        innerHTML: item.label,
        tabIndex: 0
      }, this.Node("ul"));
      li.addEventListener("keydown", this.OnLiKeydown_Handler.bind(this, item));
      li.addEventListener("click", this.OnLiClick_Handler.bind(this, item));
    }
  }, {
    key: "OnLiKeydown_Handler",
    value: function OnLiKeydown_Handler(item, ev) {
      if (ev.keyCode != 13) return;
      ev.preventDefault();
      this.Emit("BookmarkSelected", {
        item: item
      });
    }
  }, {
    key: "OnLiClick_Handler",
    value: function OnLiClick_Handler(item, ev) {
      this.Emit("BookmarkSelected", {
        item: item
      });
    }
  }, {
    key: "Template",
    value: function Template() {
      return "<div handle='root' class='bookmarks'>" + "<div class='bookmarks-header-container'>" + "<img class='bookmarks-header-icon' src='".concat(Core.root, "assets/bookmarks.png'></img>") + "<h2 class='bookmarks-header'>nls(Bookmarks_Header)</h2>" + "</div>" + "<ul handle='ul' class='bookmarks-list'></ul>" + "<div handle='description' class='bookmarks-description'>nls(Bookmarks_Description)</div>" + "</div>";
    }
  }]);

  return Bookmarks;
}(Control);

var Download = /*#__PURE__*/function (_Control) {
  _inherits(Download, _Control);

  var _super = _createSuper(Download);

  function Download(options) {
    var _this;

    _classCallCheck(this, Download);

    _this = _super.call(this, options);
    _this._container = _this.Node('root');
    if (options.link) _this.Node('link').setAttribute('href', options.link);
    return _this;
  }

  _createClass(Download, [{
    key: "Template",
    value: function Template() {
      return "<div handle='root' class='download mapboxgl-ctrl'>" + "<div class='control-label'>" + "<a handle='link' target='_blank' class='link'>nls(Download_Title)</a>" + "</div>" + "</div>";
    }
  }]);

  return Download;
}(Control);

var Fullscreen = /*#__PURE__*/function (_Evented) {
  _inherits(Fullscreen, _Evented);

  var _super = _createSuper(Fullscreen);

  _createClass(Fullscreen, [{
    key: "title",
    set: function set(value) {
      this._fs._controlContainer.firstChild.title = value;
    }
  }, {
    key: "fullscreen",
    get: function get() {
      return this._fs._fullscreen;
    }
  }]);

  function Fullscreen(options) {
    var _this;

    _classCallCheck(this, Fullscreen);

    _this = _super.call(this);
    _this._fs = new mapboxgl.FullscreenControl();
    _this.options = options;
    return _this;
  }

  _createClass(Fullscreen, [{
    key: "onFullscreenClick_Handler",
    value: function onFullscreenClick_Handler(ev) {
      if (!this.fullscreen) this.Emit("enterFullscreen", {});else this.Emit("exitFullscreen", {});
    }
  }, {
    key: "onAdd",
    value: function onAdd(map) {
      this._container = this._fs.onAdd(map);

      this._fs._controlContainer.firstChild.addEventListener("click", this.onFullscreenClick_Handler.bind(this));

      this._fs._controlContainer.firstChild.removeAttribute("aria-label");

      this.title = this.options.title;
      this._map = map;
      return this._container;
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      this._fs.onRemove();

      this._fs._container.parentNode.removeChild(this._fs._container);

      this._map = undefined;
    }
  }]);

  return Fullscreen;
}(Evented);

var Menu = /*#__PURE__*/function (_Control) {
  _inherits(Menu, _Control);

  var _super = _createSuper(Menu);

  function Menu(options) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _super.call(this, options);
    _this.controls = {};

    for (var id in options.controls) {
      _this.AddControl(id, options.controls[id]);
    }

    _this._container = _this.Node('root');
    return _this;
  }

  _createClass(Menu, [{
    key: "AddControl",
    value: function AddControl(id, control) {
      if (this.controls.hasOwnProperty(id)) throw new Error("Control already exists in the group");
      this.controls[id] = control;
      Dom.Place(control._container, this.Node("root"));
    }
  }, {
    key: "Template",
    value: function Template() {
      return "<div handle='root' class='mapboxgl-ctrl mapboxgl-ctrl-group'></div>";
    }
  }]);

  return Menu;
}(Control);

var n = 0;

var Legend = /*#__PURE__*/function (_Control) {
  _inherits(Legend, _Control);

  var _super = _createSuper(Legend);

  function Legend(options) {
    var _this;

    _classCallCheck(this, Legend);

    _this = _super.call(this, options);
    _this._container = _this.Node('root');
    _this.chkBoxes = null;
    _this.chkBoxesState = null;

    _this.Reload(options.legend, options.title, options.banner, options.subtitle);

    return _this;
  }

  _createClass(Legend, [{
    key: "Reload",
    value: function Reload(legend, title, banner, subtitle) {
      this.LoadLegend(legend);
      if (banner) this.Node('banner').innerHTML = banner;
      if (title) this.Node('title').innerHTML = title;
      if (subtitle) this.Node('subtitle').innerHTML = subtitle;
      Dom.ToggleClass(this.Node("banner"), "hidden", !banner);
      Dom.ToggleClass(this.Node("title"), "hidden", !title);
      Dom.ToggleClass(this.Node("subtitle"), "hidden", !subtitle);
    }
  }, {
    key: "LoadLegend",
    value: function LoadLegend(config) {
      var i, legendItem;
      this.chkBoxes = [];
      this.chkBoxesState = [];
      Dom.Empty(this.Node("legend"));

      if (Array.isArray(config)) {
        for (i = 0; i < config.length; i += 1) {
          legendItem = config[i];
          this.AddLegendItem(legendItem);
        }
      }
    }
  }, {
    key: "AddLegendItem",
    value: function AddLegendItem(item) {
      var chkBox, svg, icn, lbl, i, id, div;
      if (!item.label && !item.group) return;
      id = "legend-check-" + ++n;
      div = Dom.Create("div", {
        className: "legend-item legend-item-1"
      }, this.Node("legend")); // Add groups of items if them exist in legend

      if (item.group && item.group.heading) {
        Dom.Create('div', {
          className: "legend-heading",
          innerHTML: item.group.heading
        }, div);

        if (item.group.items) {
          for (i = 0; i < item.group.items.length; i += 1) {
            // Copy item title to group item
            if (!item.group.items[i].title) {
              item.group.items[i].title = item.title;
            } // Add group item to legend


            this.AddLegendItem(item.group.items[i]);
          }
        }
      } else {
        chkBox = Dom.Create("input", {
          id: id,
          title: item.title,
          className: "legend-tickbox",
          type: "checkbox",
          checked: true
        }, div);
        svg = Dom.CreateSVG("svg", {
          width: 15,
          height: 15
        }, div);
        icn = Dom.CreateSVG("rect", {
          width: 15,
          height: 15
        }, svg);
        lbl = Dom.Create("label", {
          innerHTML: item.label
        }, div);
        lbl.setAttribute("for", id);
        this.chkBoxes.push(chkBox);
        chkBox.addEventListener("change", this.OnCheckbox_Checked.bind(this));
        icn.setAttribute('fill', "rgb(".concat(item.color.join(","), ")"));
        this.chkBoxesState.push({
          item: item,
          checkbox: chkBox
        });
        return div;
      }
    }
  }, {
    key: "OnCheckbox_Checked",
    value: function OnCheckbox_Checked(ev) {
      this.Emit("LegendChange", {
        state: this.chkBoxesState
      });
    }
  }, {
    key: "Template",
    value: function Template() {
      return "<div handle='root' class='legend mapboxgl-ctrl'>" + "<div handle='banner' class='control-label legend-banner'></div>" + "<div>" + "<div handle='title' class='control-label'></div>" + "<div handle='subtitle' class='control-label legend-subtitle'></div>" + "</div>" + "<div handle='legend' class='legend-container'></div>" + "</div>";
    }
  }]);

  return Legend;
}(Control);

var MapsList = /*#__PURE__*/function (_Control) {
  _inherits(MapsList, _Control);

  var _super = _createSuper(MapsList);

  function MapsList(options) {
    var _this;

    _classCallCheck(this, MapsList);

    _this = _super.call(this, options);
    _this._container = _this.Node('root'); //this.tooltip = new Tooltip();

    for (var id in options.maps) {
      _this.AddMapItem(id, options.maps[id]);
    }

    return _this;
  }

  _createClass(MapsList, [{
    key: "AddMapItem",
    value: function AddMapItem(id, map) {
      var li = Dom.Create('li', {
        className: "maps-list-item",
        innerHTML: map.title,
        tabIndex: 0
      }, this.Node("ul")); //li.addEventListener("mousemove", this.OnLiMouseMove_Handler.bind(this, id, map));
      //li.addEventListener("mouseleave", this.OnLiMouseLeave_Handler.bind(this, id, map));

      li.addEventListener("click", this.OnLiClick_Handler.bind(this, id, map));
      li.addEventListener("keydown", this.OnLiKeydown_Handler.bind(this, id, map));
    }
    /*
    OnLiMouseMove_Handler(id, map, ev) {	
    	this.tooltip.Node("content").innerHTML = map.description;
    	this.tooltip.Show(ev.pageX - window.scrollX + 20, ev.pageY - window.scrollY);
    }
    
    OnLiMouseLeave_Handler(id, map, ev) {
    	this.tooltip.Hide();
    }
    */

  }, {
    key: "OnLiKeydown_Handler",
    value: function OnLiKeydown_Handler(id, map, ev) {
      // prevent default event on specifically handled keys
      if (ev.keyCode != 13) return;
      ev.preventDefault();
      this.Emit("MapSelected", {
        id: id,
        map: map
      });
    }
  }, {
    key: "OnLiClick_Handler",
    value: function OnLiClick_Handler(id, map, ev) {
      this.Emit("MapSelected", {
        id: id,
        map: map
      });
    }
  }, {
    key: "Template",
    value: function Template() {
      return "<div handle='root' class='maps'>" + "<div class='maps-header-container'>" + "<img class='maps-header-icon' src='".concat(Core.root, "assets/layers.png'></img>") + "<h2 class='maps-header'>nls(Maps_Header)</h2>" + "</div>" + "<ul handle='ul' class='maps-list'></ul>" + // "<div handle='description' class='maps-description'>nls(Maps_Description)</div>" +
      "</div>";
    }
  }]);

  return MapsList;
}(Control);

var Menu$1 = /*#__PURE__*/function (_Control) {
  _inherits(Menu, _Control);

  var _super = _createSuper(Menu);

  function Menu(options) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _super.call(this, options);
    _this._container = _this.Node('root');
    _this.buttons = {};
    return _this;
  }

  _createClass(Menu, [{
    key: "AddButton",
    value: function AddButton(id, icon, title, hClick) {
      if (this.buttons[id]) throw new Error("Button already exists in menu.");
      var root = this.Node("root");
      var btn = Dom.Create("button", {
        "title": title,
        "aria-label": title,
        "type": "button",
        "className": "mapboxgl-ctrl-icon"
      }, root);
      var img = Dom.Create("img", {
        "alt": title,
        "src": icon
      }, btn);
      btn.addEventListener("click", hClick);
      this.buttons[id] = {
        node: btn
      };
      return btn;
    }
  }, {
    key: "AddPopupButton",
    value: function AddPopupButton(id, icon, title, widget, container) {
      var popup = new Popup("modal absolute popup-" + id, container);
      popup.Content = widget.Node("root");
      var button = this.AddButton(id, icon, title, function (ev) {
        popup.Show();
      });
      popup.On("Hide", this.OnPopupHide_Handler.bind(this, button));
      this.buttons[id].popup = popup;
      return popup;
    }
  }, {
    key: "Button",
    value: function Button(id) {
      return this.buttons[id] || null;
    }
  }, {
    key: "OnPopupHide_Handler",
    value: function OnPopupHide_Handler(button, ev) {
      button.focus();
    }
  }, {
    key: "Template",
    value: function Template() {
      return "<div handle='root' class='maps-control mapboxgl-ctrl mapboxgl-ctrl-group'></div>";
    }
  }]);

  return Menu;
}(Control);

var Navigation = /*#__PURE__*/function (_Evented) {
  _inherits(Navigation, _Evented);

  var _super = _createSuper(Navigation);

  _createClass(Navigation, [{
    key: "titleIn",
    set: function set(value) {
      this._n._zoomInButton.title = value;
    }
  }, {
    key: "titleOut",
    set: function set(value) {
      this._n._zoomOutButton.title = value;
    }
  }]);

  function Navigation(options) {
    var _this;

    _classCallCheck(this, Navigation);

    _this = _super.call(this);
    _this._n = new mapboxgl.NavigationControl({
      showCompass: options.showCompass,
      showZoom: options.showZoom
    });
    _this.options = options;
    return _this;
  }

  _createClass(Navigation, [{
    key: "onFullscreenClick_Handler",
    value: function onFullscreenClick_Handler(ev) {
      if (!this.fullscreen) this.Emit("enterFullscreen", {});else this.Emit("exitFullscreen", {});
    }
  }, {
    key: "onAdd",
    value: function onAdd(map) {
      this._container = this._n.onAdd(map);

      this._n._zoomInButton.removeAttribute("aria-label");

      this._n._zoomOutButton.removeAttribute("aria-label");

      this.titleIn = this.options.titleIn;
      this.titleOut = this.options.titleOut;
      this._map = map;
      return this._container;
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      this._n.onRemove();

      this._n._container.parentNode.removeChild(this._n._container);

      this._map = undefined;
    }
  }]);

  return Navigation;
}(Evented);

var Legend$1 = /*#__PURE__*/function (_Control) {
  _inherits(Legend, _Control);

  var _super = _createSuper(Legend);

  _createClass(Legend, [{
    key: "label",
    set: function set(value) {
      Dom.Node(this._container, ".control-label").innerHTML = value;
    }
  }, {
    key: "title",
    set: function set(value) {
      this.Node("slider").title = value;
    }
  }]);

  function Legend(options) {
    var _this;

    _classCallCheck(this, Legend);

    _this = _super.call(this, options);
    _this._container = _this.Node('root');
    _this.opacity = _this.options.opacity == undefined ? 0.75 : _this.options.opacity;
    _this.Node("slider").value = _this.opacity * 100;

    _this.Node('slider').addEventListener("change", _this.onSliderChange_Handler.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(Legend, [{
    key: "onSliderChange_Handler",
    value: function onSliderChange_Handler(ev) {
      this.opacity = this.Node("slider").value / 100;
      this.Emit("OpacityChanged", {
        opacity: this.opacity
      });
    }
  }, {
    key: "Template",
    value: function Template() {
      return "<div handle='root' class='opacity mapboxgl-ctrl'>" + "<label class='control-label'>nls(Toc_Opacity)</label>" + "<input handle='slider' type='range' min='0' max='100' value='100' class='slider'>" + "</div>";
    }
  }]);

  return Legend;
}(Control);

var Search = /*#__PURE__*/function (_Control) {
  _inherits(Search, _Control);

  var _super = _createSuper(Search);

  function Search(options) {
    var _this;

    _classCallCheck(this, Search);

    _this = _super.call(this, options);
    _this._container = _this.Node('root');
    _this.layer = options.layer;
    _this.field = options.field;
    _this.color = options.color; // TODO : This should probably happen outside of the widget.

    _this.Node('typeahead').items = _this.Itemize(options.items);
    _this.Node('typeahead').placeholder = options.placeholder;
    _this.Node('typeahead').title = options.title;

    _this.Node('typeahead').On('Change', _this.onTypeaheadChange_Handler.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(Search, [{
    key: "Itemize",
    value: function Itemize(items) {
      return items.sort(function (a, b) {
        return a.label > b.label ? 1 : -1;
      });
    }
  }, {
    key: "onTypeaheadChange_Handler",
    value: function onTypeaheadChange_Handler(ev) {
      var data = {
        layer: this.layer,
        field: this.field,
        color: this.color,
        item: ev.item
      };
      this.Emit('Change', data);
    }
  }, {
    key: "Template",
    value: function Template() {
      return "<div handle='root' class='search-control mapboxgl-ctrl'>" + "<div handle='typeahead' widget='Basic.Components.Typeahead'></div>" + "</div>";
    }
  }]);

  return Search;
}(Control);

var Toc = /*#__PURE__*/function (_Control) {
  _inherits(Toc, _Control);

  var _super = _createSuper(Toc);

  function Toc(options) {
    var _this;

    _classCallCheck(this, Toc);

    _this = _super.call(this, options);
    _this._container = _this.Node('root');

    _this.Reload(options.toc);

    return _this;
  }

  _createClass(Toc, [{
    key: "HasLayer",
    value: function HasLayer(layerId) {
      return this.radios.hasOwnProperty(layerId);
    }
  }, {
    key: "Reload",
    value: function Reload(toc) {
      var _this2 = this;

      Dom.Empty(this.Node("toc"));
      this.radios = {};
      if (toc) toc.forEach(function (i) {
        return _this2.radios[i.id] = _this2.AddTocItem(i);
      });
    }
  }, {
    key: "SelectItem",
    value: function SelectItem(selected) {
      if (this.current) this.radios[this.current].checked = false;
      if (!this.HasLayer(selected)) return;
      this.current = selected;
      this.radios[selected].checked = true;
    }
  }, {
    key: "onChange_Handler",
    value: function onChange_Handler(item, ev) {
      if (this.current) this.radios[this.current].checked = false;
      this.current = item.id;
      this.Emit('LayerVisibility', {
        layer: this.current
      });
    }
  }, {
    key: "AddTocItem",
    value: function AddTocItem(item) {
      var i = this.Node("toc").children.length + 1;
      var div = Dom.Create("div", {
        className: "toc-item"
      }, this.Node("toc"));
      var ipt = Dom.Create("input", {
        type: "radio",
        name: "toc",
        id: "rd-".concat(i)
      }, div);
      var lbl = Dom.Create("label", {
        innerHTML: item.label
      }, div);
      lbl.setAttribute("for", "rd-".concat(i));
      ipt.addEventListener('change', this.onChange_Handler.bind(this, item));
      return ipt;
    }
  }, {
    key: "Template",
    value: function Template() {
      return "<div handle='root' class='toc mapboxgl-ctrl'>" + "<div class='control-label'>nls(Toc_Instruction)</div>" + "<div handle='toc' class='legend-container toc-container'></div>" + "</div>";
    }
  }]);

  return Toc;
}(Control);

var Map = /*#__PURE__*/function (_Evented) {
  _inherits(Map, _Evented);

  var _super = _createSuper(Map);

  _createClass(Map, [{
    key: "Container",
    // Get the map container
    get: function get() {
      return this.map._container;
    } // Get the center of the map
    // e.g. {lat: 50, lng: -100}

  }, {
    key: "Center",
    get: function get() {
      return this.map.getCenter();
    },
    set: function set(value) {
      this.map.setCenter(value);
    } // Get the current map zoom level (numeric value)

  }, {
    key: "Zoom",
    get: function get() {
      return this.map.getZoom();
    },
    set: function set(value) {
      this.map.setZoom(value);
    } // Get the current map style URL

  }, {
    key: "Style",
    get: function get() {
      return this.style;
    }
  }], [{
    key: "Token",

    /**
     * Set the map box access token
     * @param {string} value - map box access token
     */
    set: function set(value) {
      mapboxgl.accessToken = value;
    } // Get the access token
    ,
    get: function get() {
      return mapboxgl.accessToken;
    }
  }]);

  function Map(options) {
    var _this;

    _classCallCheck(this, Map);

    _this = _super.call(this);
    _this.layers = [];
    _this.original = {};
    _this.style = options.style;
    _this.click = _this.OnLayerClick_Handler.bind(_assertThisInitialized(_this));
    _this.map = new mapboxgl.Map(options);

    _this.map.once('styledata', _this.OnceStyleData_Handler.bind(_assertThisInitialized(_this))); // this.map.on('click', this.click);


    _this.WrapEvent('moveend', 'MoveEnd');

    _this.WrapEvent('zoomend', 'ZoomEnd');

    _this.WrapEvent('load', 'Load');

    _this.map.once('load', function (ev) {
      // Fix for improve this map in french
      _this.map.getContainer().querySelector('.mapbox-improve-map').innerHTML = Core.Nls("Mapbox_Improve");
    });

    return _this;
  }
  /**
   * Add a data source to the map
   * @param {string} name - name of a data source
   * @param {object} data - object containing the details of the data source
   * - Data Source Example:
   * 	{
   * 		type: "geojson",
   * 		data: "https://example.org/mydata.json",
   * 		cluster: true,
   * 		clusterMaxZoom: 14,
   * 		clusterRadius: 50
   * 	}
   */


  _createClass(Map, [{
    key: "AddSource",
    value: function AddSource(name, data) {
      this.map.addSource(name, data);
    }
    /**
     * Add layer to the map
     * @param {object} layer - object containing the details of the layer
     * - Layer Example:
     * 	{
     * 		id: 'mylayer',
     * 		source: 'mydatasource',
     *		type: 'circle',
     *		paint: {
     *			circle-color: "#000000",
     *			circle-radius: 8
     *		}
     * 	}
     */

  }, {
    key: "AddLayer",
    value: function AddLayer(layer) {
      if (layer.id && layer.type) {
        this.map.addLayer(layer);
      }
    }
    /**
     * Add layers for clustering the data.
     * @param {object} definedOpts - an object containing all of the cluster options
     * {
     * 		source: data-source-id, 
     * 		id: cluster-layer-id,
     * 		filter: mapbox-expression,
     * 		circle_paint: object containing the paint properties for the cluster circle,
     * 		circle_layout: object containing the layout properties for the cluster circle,
     * 		label_paint: object containing the paint properties for the cluster label,
     * 		label_layout: object containing the layout properties for the cluster label
     * }
     */

  }, {
    key: "AddClusters",
    value: function AddClusters(definedOpts) {
      var defaultOpts = {
        filter: ['has', 'point_count'],
        circle_paint: {
          'circle-color': '#728399',
          'circle-radius': ['interpolate', ['exponential', 1], ['get', 'point_count'], 1, 12, 1000, 32],
          'circle-stroke-width': 3,
          'circle-stroke-color': 'rgba(114,131,153,0.5)'
        },
        label_paint: {
          'text-color': '#fff',
          'text-halo-color': '#fff',
          'text-halo-width': 0.4
        },
        label_layout: {
          'text-allow-overlap': true,
          'text-field': '{point_count_abbreviated}',
          'text-font': ['Open Sans Regular'],
          'text-size': 12
        }
      };
      var options = Util.Mixin(defaultOpts, definedOpts); // Add clusters layer for source

      this.map.addLayer({
        id: (options.id || options.source) + '_clusters',
        type: 'circle',
        source: options.source,
        filter: options.filter,
        paint: options.circle_paint
      }); // Add cluster count labels layer

      this.map.addLayer({
        id: (options.id || options.source) + '_cluster-count',
        type: 'symbol',
        source: options.source,
        filter: options.filter,
        layout: options.label_layout,
        paint: options.label_paint
      });
    }
    /**
     * Add a specified map control to the map.
     * @param {object} control - map control object
     * @param {string} location - location of the object. e.g. 'top-left'
     */

  }, {
    key: "AddControl",
    value: function AddControl(control, location) {
      this.map.addControl(control, location);
    }
  }, {
    key: "InfoPopup",
    value: function InfoPopup(lngLat, html) {
      var popup = new mapboxgl.Popup({
        closeOnClick: true
      }).setLngLat(lngLat).setHTML(html).addTo(this.map);
      popup._closeButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';

      popup._closeButton.setAttribute('aria-label', Core.Nls('Mapbox_Close_Popup'));

      popup._closeButton.title = Core.Nls('Mapbox_Close_Popup');
    }
  }, {
    key: "Reset",
    value: function Reset(layers) {
      var _this2 = this;

      layers.forEach(function (l) {
        _this2.map.setPaintProperty(l, 'fill-color', _this2.original[l]);
      });
      this.original = {};
    }
    /**
     * Retrieves the layer type 
     * @param {string} layerId - id of the map layer
     */

  }, {
    key: "GetLayerType",
    value: function GetLayerType(layerId) {
      var layer = this.map.getLayer(layerId);
      var layerType;

      if (layer.type) {
        layerType = layer.type;
      }

      return layerType;
    }
    /**
     * Get the layer color paint property name based on layer type
     * @param {string} layerType - The layer type 
     */

  }, {
    key: "GetLayerColorPropertyByType",
    value: function GetLayerColorPropertyByType(layerType) {
      var layerPaintProperty;

      switch (layerType) {
        case 'circle':
          layerPaintProperty = 'circle-color';
          break;

        case 'line':
          layerPaintProperty = 'line-color';
          break;

        case 'fill':
          layerPaintProperty = 'fill-color';
          break;

        case 'symbol':
          layerPaintProperty = 'icon-color';
          break;

        case 'background':
          layerPaintProperty = 'background-color';
          break;

        case 'heatmap':
          layerPaintProperty = 'heatmap-color';
          break;

        case 'fill-extrusion':
          layerPaintProperty = 'fill-extrusion-color';
          break;

        default:
          layerPaintProperty = 'circle-color';
      }

      return layerPaintProperty;
    }
    /**
     * Method to update a style property for a layer
     * @param {string} layerId - Name of the map layer
     * @param {string} paintProperty - Paint Property of the map layer
     * @param {array || string} styleRules - Mapbox expression of style rules or a rgba string value.
     */

  }, {
    key: "SetPaintProperty",
    value: function SetPaintProperty(layerId, paintProperty, styleRules) {
      // Check that layer exists in map
      if (this.map.getLayer(layerId)) {
        this.map.setPaintProperty(layerId, paintProperty, styleRules);
      }
    }
    /**
     * Gets the style data from provided legend item
     * @param {object} legendItem - Object containing the style information 
     * @retruns - An object containing the legendItem color and value if available
     */

  }, {
    key: "GetStylingFromLegendItem",
    value: function GetStylingFromLegendItem(legendItem) {
      var style = {};

      if (legendItem.color) {
        style.color = legendItem.color;

        if (legendItem.value) {
          style.value = legendItem.value;
        }
      }

      return style;
    }
    /**
     * Gets a list of style colours and values defined in the map config legend.
     * @param {array} legendItems - List of legend items containing style rules
     * @returns - A list of style objects containing colours and conditions
     * needed to paint layers with that colour.
     */

  }, {
    key: "GetListOfStyles",
    value: function GetListOfStyles(legendItems) {
      var i, j, legendItem, groupItems;
      var styleCollection = []; // Iterate through legendItems and get styling from each

      if (Array.isArray(legendItems)) {
        for (i = 0; i < legendItems.length; i += 1) {
          legendItem = legendItems[i];

          if (legendItem.group && legendItem.group.items) {
            // If item is a group of items, get styling from all items in group
            groupItems = legendItem.group.items;

            for (j = 0; j < groupItems.length; j += 1) {
              styleCollection.push(this.GetStylingFromLegendItem(groupItems[j]));
            }
          } else {
            styleCollection.push(this.GetStylingFromLegendItem(legendItem));
          }
        }
      }

      return styleCollection;
    }
    /**
     * Generate all style classes defined in the map config file.
     * @param {object} styles - object containing the legend details stored in
     * the map config file.
     * @param {array} opacities - list of opacity values
     * @retruns - A list of colour classes using style data and opacity values.
     */

  }, {
    key: "GenerateColourClasses",
    value: function GenerateColourClasses(styles, opacities) {
      var updatedColor, i, styleItem, defaultColour;
      var styleOpacities = opacities || 1;
      var classes = ['case'];
      var legendStyles = this.GetListOfStyles(styles); // Check that legend items length equals opacity length

      if (legendStyles.length) {
        for (i = 0; i < legendStyles.length; i += 1) {
          styleItem = legendStyles[i]; // Get color for style 

          if (Array.isArray(styleOpacities) && styleOpacities.length) {
            updatedColor = styleItem.color.length == 3 ? "rgba(".concat(styleItem.color.join(','), ",").concat(styleOpacities[i], ")") : "rgba(".concat(styleItem.color.join(','), ")");
          } else {
            updatedColor = styleItem.color.length == 3 ? "rgba(".concat(styleItem.color.join(','), ",").concat(styleOpacities, ")") : "rgba(".concat(styleItem.color.join(','), ")");
          }

          if (styleItem.value && updatedColor) {
            // Add mapbox expression value is defined, add it to classes list
            classes.push(styleItem.value); // Add colour to classes list

            classes.push(updatedColor);
          } else {
            defaultColour = updatedColor;
          }
        } // Add default colour as last item in colour classes
        // This is required by mapbox to in sure errors 
        // don't occur when the last item in the legend config
        // is not the default colour (i.e. the one without a 
        // a defined mapbox expression value)


        classes.push(defaultColour);
      }

      return classes;
    }
    /*This is used with an array of colors and (single opacity or array of opacity values)*/

  }, {
    key: "Choropleth",
    value: function Choropleth(layers, property, legend, opacity) {
      var _this3 = this;

      var classes = this.GenerateColourClasses(legend, opacity);
      layers.forEach(function (l) {
        if (property && _this3.map.getPaintProperty(l, property)) {
          _this3.original[l] = _this3.map.getPaintProperty(l, property);

          _this3.SetPaintProperty(l, property, classes);
        }
      });
    }
    /*This is used with a single color value and an array of opacity values)*/

  }, {
    key: "ChoroplethVarOpac",
    value: function ChoroplethVarOpac(layers, property, legend, opacity) {
      var _this4 = this;

      var color, defaultColour, updatedColor, legendStyles;
      var classes = this.GenerateColourClasses(legend, opacity); // Over-ride classes if the property is 'text-halo-color, text-color,
      // or a circle-stroke-color

      if (property === 'text-halo-color') {
        color = [255, 255, 255];
      } else if (property === 'text-color' || property === 'circle-stroke-color') {
        color = [0, 0, 0];
      } // If an over-ride colour exists, than regenerate style classes


      if (color) {
        classes = ['case'];
        legendStyles = this.GetListOfStyles(legend);
        legendStyles.forEach(function (l, index) {
          updatedColor = "rgba(".concat(color.join(','), ",").concat(opacity[index], ")");

          if (l.value) {
            classes.push(l.value);
            classes.push(updatedColor);
          } else {
            defaultColour = updatedColor;
          }
        }); // Make sure catch-all/default color is at end of mapbox expression
        // represnting the colour classes.

        classes.push(defaultColour);
      }

      layers.forEach(function (l) {
        if (property && _this4.map.getPaintProperty(l, property)) {
          _this4.original[l] = _this4.map.getPaintProperty(l, property);

          _this4.SetPaintProperty(l, property, classes);
        }
      });
    }
  }, {
    key: "ReorderLayers",
    value: function ReorderLayers(layers) {
      var _this5 = this;

      layers.forEach(function (l) {
        return _this5.map.moveLayer(l);
      });
    }
  }, {
    key: "GetLayer",
    value: function GetLayer(layer) {
      return this.map.getLayer(layer) || null;
    }
  }, {
    key: "ShowLayer",
    value: function ShowLayer(layer) {
      this.map.setLayoutProperty(layer, 'visibility', 'visible');
    }
  }, {
    key: "HideLayer",
    value: function HideLayer(layer) {
      this.map.setLayoutProperty(layer, 'visibility', 'none');
    }
  }, {
    key: "HideLayers",
    value: function HideLayers(layers) {
      var _this6 = this;

      layers.forEach(function (l) {
        return _this6.HideLayer(l);
      });
    }
  }, {
    key: "ShowLayers",
    value: function ShowLayers(layers) {
      var _this7 = this;

      layers.forEach(function (l) {
        return _this7.ShowLayer(l);
      });
    }
    /**
     * Set the map bounds for the map.
     * @param {array} bounds - An array containing coordinate pairs for the map bounds.
     * @param {object} options - object containing options when fitting the map bounds 
     */

  }, {
    key: "FitBounds",
    value: function FitBounds(bounds, options) {
      this.map.fitBounds(bounds, options);
    }
    /**
     * Set the maximum bounds of the map
     * @param {array} bounds - An array containing coordinate pairs for the map bounds.
     * e.g. [[x1, y1], [x2, y2]]
     */

  }, {
    key: "SetMaxBounds",
    value: function SetMaxBounds(bounds) {
      this.map.setMaxBounds(bounds);
    }
  }, {
    key: "SetStyle",
    value: function SetStyle(style) {
      this.style = style;
      this.map.once('styledata', this.OnceStyleData_Handler.bind(this));
      this.map.setStyle(style);
    }
  }, {
    key: "SetClickableMap",
    value: function SetClickableMap(layers) {
      this.map.on('click', this.click);
    }
  }, {
    key: "SetClickableLayers",
    value: function SetClickableLayers(layers) {
      var _this8 = this;

      layers.forEach(function (l) {
        return _this8.map.off('click', l, _this8.click);
      });
      this.layers = layers;
      this.layers.forEach(function (l) {
        return _this8.map.on('click', l, _this8.click);
      });
    }
  }, {
    key: "QueryRenderedFeatures",
    value: function QueryRenderedFeatures(point, layers) {
      return this.map.queryRenderedFeatures(point, {
        layers: layers
      });
    }
  }, {
    key: "OnceStyleData_Handler",
    value: function OnceStyleData_Handler(ev) {
      this.Emit('StyleChanged', ev);
    }
    /**
     * Event handler for clicking on the map, and emits a 'Click' event.
     * @param {object} ev - click event object
     */

  }, {
    key: "OnLayerClick_Handler",
    value: function OnLayerClick_Handler(ev) {
      this.Emit('Click', ev);
    }
  }, {
    key: "WrapEvent",
    value: function WrapEvent(oEv, nEv) {
      var _this9 = this;

      var f = function f(ev) {
        return _this9.Emit(nEv, ev);
      };

      this.map.on(oEv, f);
    }
  }]);

  return Map;
}(Evented);

var Factory = /*#__PURE__*/function () {
  function Factory() {
    _classCallCheck(this, Factory);
  }

  _createClass(Factory, null, [{
    key: "Map",
    value: function Map$1(container, token, style, center, zoom) {
      Map.Token = token;
      return new Map({
        container: container,
        style: style,
        center: center,
        zoom: zoom
      });
    }
    /*
    static NavigationControl(showCompass, showZoom) {
    	return new mapboxgl.NavigationControl({ showCompass:showCompass, showZoom:showZoom });
    }
    */

  }, {
    key: "NavigationControl",
    value: function NavigationControl(showCompass, showZoom, titleIn, titleOut) {
      return new Navigation({
        showCompass: showCompass,
        showZoom: showZoom,
        titleIn: titleIn,
        titleOut: titleOut
      });
    }
  }, {
    key: "FullscreenControl",
    value: function FullscreenControl(title) {
      return new Fullscreen({
        title: title
      });
    }
  }, {
    key: "GeolocateControl",
    value: function GeolocateControl() {
      return new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      });
    }
  }, {
    key: "ScaleControl",
    value: function ScaleControl(units) {
      return new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: units
      });
    }
  }, {
    key: "AttributionControl",
    value: function AttributionControl() {
      return new mapboxgl.AttributionControl({
        compact: true
      });
    } // TODO : LegendControl requires too many parameters

  }, {
    key: "LegendControl",
    value: function LegendControl(legend, title, banner, subtitle, hasCheckbox) {
      return new Legend({
        legend: legend,
        title: title,
        banner: banner,
        subtitle: subtitle,
        hasCheckbox: hasCheckbox
      });
    }
  }, {
    key: "TocControl",
    value: function TocControl(toc) {
      return new Toc({
        toc: toc
      });
    }
  }, {
    key: "OpacityControl",
    value: function OpacityControl(opacity) {
      return new Legend$1({
        opacity: opacity
      });
    }
  }, {
    key: "DownloadControl",
    value: function DownloadControl(link) {
      return new Download({
        link: link
      });
    }
  }, {
    key: "MapsListControl",
    value: function MapsListControl(maps) {
      return new MapsList({
        maps: maps
      });
    }
  }, {
    key: "BookmarksControl",
    value: function BookmarksControl(items) {
      return new Bookmarks({
        items: items
      });
    }
  }, {
    key: "MenuControl",
    value: function MenuControl(items) {
      return new Menu$1({
        items: items
      });
    }
  }, {
    key: "SearchControl",
    value: function SearchControl(items, placeholder, title) {
      return new Search({
        items: items,
        placeholder: placeholder,
        title: title
      });
    }
  }, {
    key: "Group",
    value: function Group(controls) {
      return new Menu({
        controls: controls
      });
    }
  }]);

  return Factory;
}();

var Other = /*#__PURE__*/function () {
  function Other() {
    _classCallCheck(this, Other);
  }

  _createClass(Other, null, [{
    key: "Polish",
    value: function Polish(json, exp, d) {
      // exp is formatted as follows [symbol, property 1, property 2]
      var v1 = json[exp[1]];
      var v2 = json[exp[2]];
      var v = null;
      if (exp[0] == "+") v = v1 + v2;
      if (exp[0] == "-") v = v1 - v2;
      if (exp[0] == "*") v = v1 * v2;
      if (exp[0] == "/") v = v1 / v2;
      return v.toFixed(d);
    }
  }, {
    key: "HTMLize",
    value: function HTMLize(json, fields, na) {
      var html = "";
      fields.forEach(function (f) {
        var label = f.label;
        var inner = Core.Nls("Gen_Label_Field", [label, json[f.id]]);
        html += "<li tabIndex=0><label>".concat(inner, "</label></li>");
      });
      return "<ul class='popup-inner'>".concat(html, "</ul>");
    }
  }, {
    key: "LookupProvince",
    value: function LookupProvince(abbr, locale) {
      abbr = abbr.trim(); // Hidden whitespace character at the end, weird.

      if (abbr == 'nl') return locale == "en" ? "Newfoundland and Labrador" : "Terre-Neuve-et-Labrador";
      if (abbr == 'pe') return locale == "en" ? "Prince Edward Island" : "Île-du-Prince-Édouard";
      if (abbr == 'ns') return locale == "en" ? "Nova Scotia" : "Nouvelle-Écosse";
      if (abbr == 'nb') return locale == "en" ? "New Brunswick" : "Nouveau-Brunswick";
      if (abbr == 'qc') return locale == "en" ? "Quebec" : "Québec";
      if (abbr == 'on') return locale == "en" ? "Ontario" : "Ontario";
      if (abbr == 'mb') return locale == "en" ? "Manitoba" : "Manitoba";
      if (abbr == 'sk') return locale == "en" ? "Saskatchewan" : "Saskatchewan";
      if (abbr == 'ab') return locale == "en" ? "Alberta" : "Alberta";
      if (abbr == 'bc') return locale == "en" ? "British Columbia" : "Colombie-Britannique";
      if (abbr == 'yt') return locale == "en" ? "Yukon" : "Yukon";
      if (abbr == 'nt') return locale == "en" ? "Northwest Territories" : "Territoires du Nord-Ouest";
      if (abbr == 'nu') return locale == "en" ? "Nunavut" : "Nunavut";
    }
  }]);

  return Other;
}();

export { Bookmarks, Control, Core, Dom, Download, Evented, Factory, Fullscreen, Menu as Group, Legend, Map, MapsList, Menu$1 as Menu, Navigation, Net, Legend$1 as Opacity, Other, Popup, promise_min as Promise, Search, Templated, Toc, Tooltip, typeahead as Typeahead, Util };
