var Chronos =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(9);
	
	// base components
	__webpack_require__(7);
	__webpack_require__(8);
	
	// pages
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	
	function app(element) {
	  function addHeaderAndFooter(page) {
	    return {
	      controller: function () {},
	      view: function () {
	        return m(".container.main-content", [m("base/header"), m(page), m("base/footer")]);
	      }
	    };
	  }
	
	  return m.route(element, "/", {
	    "/": addHeaderAndFooter("pages/index"),
	    "/login": addHeaderAndFooter("pages/login"),
	    "/create-chronicle": addHeaderAndFooter("pages/create-chronicle"),
	    "/journal/:chronicle": addHeaderAndFooter("pages/journal"),
	
	    "/403": addHeaderAndFooter("pages/403")
	  });
	}
	
	var chronos = app(document.getElementById("js--main-content"));
	var hoodie = new window.Hoodie();
	
	module.exports = chronos;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(9);
	
	var index = m.element("pages/index", {
	  view: function (ctrl) {
	    return [m("h1", "This is the index page")];
	  }
	});
	
	module.exports = index;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(9);
	
	var _403 = m.element("pages/403", {
	  view: function (ctrl) {
	    return [m("h1", "Authorization required!"), m("p", "You have insufficient rights to view that content. If something is amiss ask a group administrator."), m("a[href=\"/\"]", { config: m.route }, "back to index")];
	  }
	});
	
	module.exports = _403;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(9);
	var hoodie = __webpack_require__(11);
	var User = __webpack_require__(12);
	
	var vm = (function () {
	  var vm = {};
	  vm.init = function () {
	    vm.user = new User();
	  };
	  vm.saveUser = function () {
	    hoodie.account.signUp(vm.user.name(), vm.user.password()).done(function () {
	      console.log("[Signup] New user \"", vm.user.name(), "\" created!");
	    }).fail(function (error) {
	      console.log("[Signup] Error! ", error);
	    });
	  };
	  vm.login = function () {
	    hoodie.account.signIn(vm.user.name(), vm.user.password()).done(function (name) {
	      console.log("[SignIn] Successfully logged in as " + name + "!");
	    }).fail(function (error) {
	      console.log("[SignIn] Something broke...", error);
	    });
	  };
	  vm.logout = function () {
	    hoodie.account.signOut().done(function () {
	      console.log("[SignOut] Success!");
	    }).fail(function () {
	      console.log("[SignOut] Something broke...");
	    });
	  };
	  return vm;
	})();
	
	var login = m.element("pages/login", {
	  controller: function () {
	    vm.init();
	  },
	  view: function (ctrl) {
	    return [m("h1", "Login or sign up"), m(".row", [m(".col-md-6", [m(".form-group", [m("label", {
	      for: "user-name"
	    }, "Name"), m("input", {
	      id: "user-name",
	      type: "text",
	      class: "form-control",
	      onchange: m.withAttr("value", vm.user.name),
	      value: vm.user.name()
	    })])]), m(".col-md-6", [m(".form-group", [m("label", {
	      for: "user-password"
	    }, "Password"), m("input", {
	      id: "user-password",
	      type: "password",
	      class: "form-control",
	      onchange: m.withAttr("value", vm.user.password),
	      value: vm.user.password()
	    })])])]), m(".row", [m(".col-md-6.col-md-offset-5", [m("button", {
	      type: "button",
	      class: "btn btn-success btn-lg",
	      onclick: function () {
	        vm.saveUser();
	      }
	    }, "Signup"), m("button", {
	      type: "button",
	      class: "btn btn-success btn-lg",
	      onclick: function () {
	        vm.login();
	      }
	    }, "Login"), m("button", {
	      type: "button",
	      class: "btn btn-success btn-lg",
	      onclick: function () {
	        vm.logout();
	      }
	    }, "Logout")])])];
	  }
	});
	
	module.exports = login;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(9);
	
	// register all needed components
	__webpack_require__(10);
	
	var journal = m.element("pages/journal", {
	  controller: function () {
	    this.chronicle = m.route.param("chronicle");
	  },
	  view: function (ctrl) {
	    if (!window.Chronos || !window.Chronos.chronicle) {
	      m.route("/403");
	    }
	
	    return [m("h1", "Welcome to the chronicle \"" + ctrl.chronicle + "\""), m(".row", [m(".col-md-12", [m("journal/editor")])])];
	  }
	});
	
	module.exports = journal;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(9);
	var hoodie = __webpack_require__(11);
	var Chronicle = __webpack_require__(14);
	// register component
	__webpack_require__(15);
	
	var chronicleStore = hoodie.store("chronicle");
	
	var vm = (function () {
	  var vm = {};
	  vm.init = function () {
	    vm.chronicle = new Chronicle();
	  };
	  vm.saveChronicle = function () {
	    if (!vm.chronicle.name() && !vm.chronicle.system()) {
	      console.log("[SaveChronicle] Not sufficient data given!");
	      return false;
	    }
	
	    console.log(vm.chronicle.toPojo());
	
	    if (!vm.chronicle.id()) {
	      chronicleStore.add(vm.chronicle.toPojo()).done(function (chronicle) {
	        vm.chronicle.id(chronicle.id); // save the id for later reference
	        window.Chronos = window.Chronos || {};
	        window.Chronos.chronicle = vm.chronicle; // save it globally
	
	        vm.chronicle = new Chronicle(); // empty all fields
	      }).fail(function (error) {
	        console.log("[SaveChronicle] ", error);
	      });
	    }
	  };
	  return vm;
	})();
	
	var overwriteChronicleModal = m.element("modal-overwrite-chonicle", {
	  controller: function () {
	    // provide a boolean trigger for the dialog to
	    // read open / closed state
	    this.trigger = m.prop(false);
	
	    this.save = function () {
	      setTimeout(function () {
	        window.alert("saved");
	      }, 100);
	    };
	  },
	  view: function (ctrl, content) {
	    return [m("button.btn.btn-primary.btn-lg[type=\"button\"]", {
	      onclick: ctrl.trigger.bind(ctrl, true)
	    }, "Launch demo modal"), m("modal", {
	      state: {
	        trigger: ctrl.trigger
	      }
	    }, function () {
	      return {
	        title: "A Modal Title",
	        body: ["Another fine example...", m("p", " of a work in progress")],
	        cancel: "Cancel",
	        ok: m(".save", {
	          onclick: ctrl.save.bind(ctrl)
	        }, "Save Changes")
	      };
	    })];
	  }
	});
	
	var index = m.element("pages/create-chronicle", {
	  vm: vm,
	  controller: function () {
	    vm.init();
	  },
	  view: function (ctrl) {
	    return [m("h1", "Create a chronicle"), m(".row", [m(".col-md-6", [m(".form-group", [m("label", {
	      for: "chronicle-name"
	    }, "Name"), m("input[type=text]", {
	      id: "chronicle-name",
	      class: "form-control",
	      onchange: m.withAttr("value", vm.chronicle.name),
	      value: vm.chronicle.name()
	    })])]), m(".col-md-6", [m(".form-group", [m("label", {
	      for: "chronicle-system"
	    }, "System"), m("input[type=text]", {
	      id: "chronicle-system",
	      class: "form-control",
	      onchange: m.withAttr("value", vm.chronicle.system),
	      value: vm.chronicle.system()
	    })])])]), m(".row", [m(".col-md-12", [m(".form-group", [m("label", {
	      for: "chronicle-description"
	    }, "Description"), m("textarea", {
	      id: "chronicle-description",
	      rows: 5,
	      class: "form-control",
	      onchange: m.withAttr("value", vm.chronicle.description),
	      value: vm.chronicle.description()
	    })])]), m("div", {
	      class: "col-md-6 col-md-offset-5"
	    }, [m("button", {
	      type: "button",
	      class: "btn btn-success btn-lg",
	      onclick: function () {
	        vm.saveChronicle();
	      }
	    }, "Save"), m("button", {
	      type: "button",
	      class: "btn btn-success btn-lg",
	      onclick: function () {
	        chronicleStore.findAll().done(function (chronicles) {
	          console.log(chronicles.length + " chronicles found.");
	          chronicles.map(function (chronicle, index) {
	            console.log("______ Chronicle #", index, " ______");
	            console.log("ID: ", chronicle.id);
	            console.log("Name: ", chronicle.name);
	            console.log("System: ", chronicle.system);
	            console.log("Description: ", chronicle.description);
	          });
	        });
	      }
	    }, "Find all")])]), m(overwriteChronicleModal.instance())];
	  }
	});
	
	module.exports = index;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(9);
	
	// register elements
	__webpack_require__(13);
	
	var header = m.element("base/header", {
	  view: function (ctrl) {
	    return m("nav", {
	      class: "navbar navbar-inverse"
	    }, [m(".container-fluid", [m(".navbar-header", [m("a[href=\"/\"]", {
	      class: "navbar-brand",
	      config: m.route
	    }, "Chronos")]), m("ul", {
	      class: "nav navbar-nav"
	    }, [m("li", {
	      class: "dropdown"
	    }, [m("a[href=\"/create-chronicle\"]", {
	      config: m.route, // TODO: remove this when the nav items are done
	      class: "dropdown-toggle",
	      role: "button",
	      ariaExpanded: "false"
	    }, ["Chronicle", m("span.caret")]), m("ul", {
	      class: "dropdown-menu",
	      role: "menu"
	    }, [m("li", [m("a[href=\"/create-chronicle\"]", {
	      config: m.route
	    }, ["Create"])])])])]), m("a[href=\"/login\"]", {
	      config: m.route
	    }, "Login or sign up"), m("a[href=\"/journal/test\"]", {
	      config: m.route
	    }, "Journal"), m("a[href=\"/journal/" + (window.Chronos && window.Chronos.chronicle ? window.Chronos.chronicle.name() : "_____undefined_____") + "\"]", {
	      config: m.route
	    }, "Journal"), m("login/login")])]);
	  }
	});
	
	module.exports = header;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(9);
	
	var footer = m.element("base/footer", {
	  view: function (ctrl) {
	    return m("footer", [m("p", ["Brought to you by ", m("a[href=\"https://github.com/Draggha\"]", "this guy")])]);
	  }
	});
	
	module.exports = footer;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/*
	 * Mithril.Elements
	 * Copyright (c) 2014 Phil Toms (@PhilToms3).
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE.txt file in the root directory of this source tree.
	 */
	
	'use strict';
	var m = (function app(window, mithril) {
	
	  var OBJECT = '[object Object]', ARRAY = '[object Array]', STRING = '[object String]', FUNCTION = "[object Function]";
	  var type = {}.toString;
	
	  // save the mithril API
	  mithril = mithril || __webpack_require__(18);
	  var redraw = mithril.redraw;
	  var strategy = redraw.strategy;
	
	  function merge(obj1,obj2,filter){
	    var classAttrName = 'class' in obj1 ? 'class' : 'className';
	    var classes = obj1[classAttrName]|| '';
	    Object.keys(obj2).forEach(function(k){
	      if (k.indexOf('class')>=0){
	        classes += ' ' + obj2[k];
	      } else if ((filter||' ').indexOf(k)<0) {
	        obj1[k] = obj2[k];
	      }
	    }); 
	    if (classes && classes.trim()) {
	      obj1[classAttrName]=classes.trim();
	    }
	    return obj1;
	  }
	
	  mithril.redraw = function(force) { 
	    // key into mithril page lifecycle
	    if (strategy()==='all'){ 
	      controllers={}; 
	    } 
	    lastId=0;
	    return redraw(force); 
	  }; 
	
	  mithril.redraw.strategy = strategy;
	
	  var elements = {}, controllers={},lastId=0;
	  var m = function(module, attrs, children) { 
	    var tag = module.tag || module;
	    var args = [tag].concat([].slice.call(arguments,1));
	    var cell = mithril.apply(null,args);
	    var element = elements[cell.tag];
	    // pass through if not registered or escaped
	    if (element && tag[0]!=='$') {
	      attrs = merge(module.attrs || {}, cell.attrs);
	      var state = attrs.state;
	      var id = module.id || (state && state.id!==undefined? state.id : (attrs.key!==undefined? attrs.key : (attrs.id!==undefined? attrs.id :undefined)));
	      id = cell.tag + (id===undefined? lastId++ : id);
	      // once-only element initialization. But note:
	      //  module.id - singleton
	      //  controllers[id] - cached
	      //  default - new instance
	      var ctrl = (module.id && module) || controllers[id] || new element.controller(state);
	      controllers[id]=ctrl;
	      var inner = cell.children.length==1? cell.children[0]:cell.children;
	      var c_cell = element.view(ctrl, inner);
	      if (c_cell){
	        cell=c_cell;
	        if (type.call(cell) !== ARRAY) {
	          merge(cell.attrs,attrs,'state');
	        }
	      }
	    }
	    // merge outer over inner
	    else if (module.attrs){
	      merge(cell.attrs, module.attrs);
	    }
	
	    // tidy up tag
	    if (cell.tag && cell.tag[0]==='$'){
	      cell.tag=cell.tag.substr(1);
	    }
	    return cell;
	  };
	
	  function DefaultController(state){
	    this.state = state;
	  }
	  
	  var sId=0;
	  m.element = function(root, module){
	    if (type.call(root) !== STRING) throw new Error('selector m.element(selector, module) should be a string');
	
	    // all elements have controllers
	    module.controller = module.controller || DefaultController;
	
	    // add a programmable interface to the element
	    module.instance = function(state){
	      var ctrl = new module.controller(state);
	      ctrl.tag = root;
	      ctrl.id = '$ctrl_' + root + sId++;
	      return ctrl;
	    };
	
	    // nothing more to do here, element initialization is lazily
	    // deferred to first redraw
	    return (elements[root] = module);
	  };
	
	  // build the new API
	  return merge(m,mithril);
	
	})(typeof window != "undefined" ? window : {},m);
	
	if (typeof module != "undefined" && module !== null && module.exports) module.exports = m;
	else if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {return m}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)(module)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(9);
	
	function createEditor($element) {
	  var nicEditor = __webpack_require__(16).nicEditor;
	  console.log(nicEditor);
	  console.log($element);
	
	  var journal = new nicEditor({
	    fullPanel: true
	  }).panelInstance("js--journal-editor", {
	    hasPanel: true
	  });
	}
	
	
	var texteditor = m.element("journal/editor", {
	  view: function (ctrl) {
	    return m("textarea.journal.shadow", {
	      id: "js--journal-editor",
	      config: createEditor
	    });
	  }
	});
	
	module.exports = texteditor;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// initialize Hoodie
	var hoodie = new window.Hoodie();
	
	module.exports = hoodie;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(9);
	
	function User() {
	  this.name = m.prop("");
	  this.password = m.prop("");
	}
	
	module.exports = User;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// TODO: refactor all hoodie login code into mithril component functions and events
	
	var m = __webpack_require__(9);
	
	function modifyDOM() {
	  "use strict";
	
	  var $ = window.jQuery;
	
	  // extend Hoodie with Hoodstrap module
	  Hoodie.extend(function (hoodie) {
	    // Constructor
	    function Hoodstrap(hoodie) {
	      this.hoodie = hoodie;
	
	      // all about authentication and stuff
	      this.hoodifyAccountBar();
	    }
	
	    Hoodstrap.prototype = {
	
	      //
	      hoodifyAccountBar: function () {
	        this.subscribeToHoodieEvents();
	        this.hoodie.account.authenticate().then(this.handleUserAuthenticated.bind(this), this.handleUserUnauthenticated.bind(this));
	      },
	
	      subscribeToHoodieEvents: function () {
	        this.hoodie.account.on("signup changeusername signin reauthenticated", this.handleUserAuthenticated.bind(this));
	        this.hoodie.account.on("signout", this.handleUserUnauthenticated.bind(this));
	        this.hoodie.on("account:error:unauthenticated remote:error:unauthenticated", this.handleUserAuthenticationError.bind(this));
	      },
	
	      //
	      handleUserAuthenticated: function (username) {
	        $("html").attr("data-hoodie-account-status", "signedin");
	        $(".hoodie-accountbar").find(".hoodie-username").text(username);
	      },
	
	      //
	      handleUserUnauthenticated: function () {
	        if (this.hoodie.account.username) {
	          return this.handleUserAuthenticationError();
	        }
	        $("html").attr("data-hoodie-account-status", "signedout");
	      },
	      handleUserAuthenticationError: function () {
	        $(".hoodie-accountbar").find(".hoodie-username").text(this.hoodie.account.username);
	        $("html").attr("data-hoodie-account-status", "error");
	      }
	    };
	
	    new Hoodstrap(hoodie);
	  });
	
	  /* Hoodie DATA-API
	   * =============== */
	
	  $(function () {
	    // bind to click events
	    $("body").on("click.hoodie.data-api", "[data-hoodie-action]", function (event) {
	      var $element = $(event.target),
	          action = $element.data("hoodie-action"),
	          $form;
	
	      switch (action) {
	        case "signup":
	          $form = $.modalForm({
	            fields: ["username", "password", "password_confirmation"],
	            submit: "Sign Up"
	          });
	          break;
	        case "signin":
	          $form = $.modalForm({
	            fields: ["username", "password"],
	            submit: "Sign in"
	          });
	          break;
	        case "resetpassword":
	          $form = $.modalForm({
	            fields: ["username"],
	            submit: "Reset Password"
	          });
	          break;
	        case "changepassword":
	          $form = $.modalForm({
	            fields: ["current_password", "new_password"],
	            submit: "Change Password"
	          });
	          break;
	        case "changeusername":
	          $form = $.modalForm({
	            fields: ["current_password", "new_username"],
	            submit: "Change Username"
	          });
	          break;
	        case "signout":
	          window.hoodie.account.signOut();
	          break;
	        case "destroy":
	          if (window.confirm("you sure?")) {
	            window.hoodie.account.destroy();
	          }
	          break;
	      }
	
	      if ($form) {
	        $form.on("submit", handleSubmit(action));
	      }
	    });
	
	    var handleSubmit = function (action) {
	      return function (event, inputs) {
	        var $modal = $(event.target);
	        var magic;
	
	        switch (action) {
	          case "signin":
	            magic = window.hoodie.account.signIn(inputs.username, inputs.password);
	            break;
	          case "signup":
	            magic = window.hoodie.account.signUp(inputs.username, inputs.password);
	            break;
	          case "changepassword":
	            magic = window.hoodie.account.changePassword(null, inputs.new_password);
	            break;
	          case "changeusername":
	            magic = window.hoodie.account.changeUsername(inputs.current_password, inputs.new_username);
	            break;
	          case "resetpassword":
	            magic = window.hoodie.account.resetPassword(inputs.email).done(function () {
	              window.alert("send new password to " + inputs.email);
	            });
	            break;
	        }
	
	        magic.done(function () {
	          $modal.find(".alert").remove();
	          $modal.modal("hide");
	        });
	        magic.fail(function (error) {
	          $modal.find(".alert").remove();
	          $modal.trigger("error", error);
	        });
	      };
	    };
	  });
	}
	
	var login = m.element("login/login", {
	  view: function (ctrl) {
	    return m(".hoodie-accountbar", {
	      config: modifyDOM
	    }, [m(".hoodie-account-signedout", [m(".btn-group", [m("button.btn.btn-small.btn-primary", {
	      dataHoodieAction: "signup"
	    }, "Sign Up"), m("button.btn.btn-small.dropdown-toggle.btn-primary", {
	      dataToggle: "dropdown"
	    }, [m("span.caret")]), m("ul.dropdown-menu.pull-right", [m("li", [m("a[href=\"#\"]", {
	      dataHoodieAction: "signin"
	    }, "Sign In")]), m("li", [m("a[href=\"#\"]", {
	      dataHoodieAction: "resetpassword"
	    }, "Reset Password")]), m("li", [m("a[href=\"#\"]", {
	      dataHoodieAction: "destroy"
	    }, "Clear local data")])])])]), m(".hoodie-account-signedin", ["Hello, ", m("span.hoodie-username"), m(".btn-group", [m("button.btn.btn-small.btn-primary", {
	      dataHoodieAction: "signout"
	    }, "Sign Out"), m("button.btn.btn-small.dropdown-toggle.btn-primary", {
	      dataToggle: "dropdown"
	    }, [m("span.caret")]), m("ul.dropdown-menu.pull-right", [m("li", [m("a[href=\"#\"]", {
	      dataHoodieAction: "changepassword"
	    }, "Change Password")]), m("li", [m("a[href=\"#\"]", {
	      dataHoodieAction: "changeusername"
	    }, "Change Username")]), m("li", [m("a[href=\"#\"]", {
	      dataHoodieAction: "destroy"
	    }, "Destroy Account")])])])]), m(".hoodie-account-error", ["Hello, ", m("span.hoodie-username"), m(".btn-group", [m("button.btn.btn-small.btn-danger", {
	      dataHoodieAction: "signin"
	    }, "Authentication error: Sign in again"), m("button.btn.btn-small.dropdown-toggle.btn-danger", {
	      dataToggle: "dropdown"
	    }, [m("span.caret")]), m("ul.dropdown-menu.pull-right", [m("li", [m("a[href=\"#\"]", {
	      dataHoodieAction: "signout"
	    }, "Sign out")])])])])]);
	  }
	});
	
	module.exports = login;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(9);
	
	function Chronicle() {
	  this.id = m.prop(); // will be filled later
	  this.name = m.prop("");
	  this.system = m.prop("");
	  this.description = m.prop("");
	  this.gamemaster = m.prop("");
	}
	
	Chronicle.prototype.toPojo = function () {
	  var self = this;
	
	  return {
	    name: self.name(),
	    system: self.system(),
	    description: self.description(),
	    gamemaster: self.gamemaster()
	  };
	};
	
	module.exports = Chronicle;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var m = __webpack_require__(9);
	
	var modal = m.element("modal", {
	  controller: function (options) {
	    var open,
	        backdrop,
	        saveBodyClass = "";
	
	    function close(e) {
	      open = false;
	      options.trigger(false);
	      document.body.className = saveBodyClass;
	      if (e) m.redraw();
	    }
	    this.close = {
	      onclick: function () {
	        close();
	      }
	    };
	    this.state = options.trigger;
	    this.bind = function (element) {
	      if (!open && options.trigger()) {
	        open = element;
	        saveBodyClass = document.body.className;
	        document.body.className += " modal-open";
	        backdrop = element.getElementsByClassName("modal-backdrop")[0];
	        backdrop.setAttribute("style", "height:" + document.documentElement.clientHeight + "px");
	        backdrop.addEventListener("click", close);
	      }
	    };
	  },
	
	  view: function (ctrl, inner) {
	    inner = inner();
	    var isOpen = ctrl.state();
	    return m(isOpen ? ".is-open" : ".modal.fade", {
	      config: ctrl.bind
	    }, [isOpen ? m(".modal-backdrop.fade.in") : "", m(".modal-dialog", [m(".modal-content", [m(".modal-header", [m("button.close[type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\"]", m("span[aria-hidden=true]", ctrl.close, m.trust("&times;"))), m("h4.modal-title", inner.title)]), m(".modal-body", inner.body), m(".modal-footer", [m("button.btn.btn-default[type=\"button\" data-dismiss=\"modal\"]", ctrl.close, inner.cancel || "Close"), inner.ok ? m("button.btn.btn-primary[type=\"button\"]", ctrl.close, inner.ok) : ""])])])]);
	  }
	});
	
	module.exports = modal;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* NicEdit - Micro Inline WYSIWYG
	 * Copyright 2007-2008 Brian Kirchoff
	 *
	 * NicEdit is distributed under the terms of the MIT license
	 * For more information visit http://nicedit.com/
	 * Do not remove this copyright message
	 */
	var bkExtend = function () {
	  var A = arguments;if (A.length == 1) {
	    A = [this, A[0]];
	  }for (var B in A[1]) {
	    A[0][B] = A[1][B];
	  }return A[0];
	};function bkClass() {}bkClass.prototype.construct = function () {};bkClass.extend = function (C) {
	  var A = function () {
	    if (arguments[0] !== bkClass) {
	      return this.construct.apply(this, arguments);
	    }
	  };var B = new this(bkClass);bkExtend(B, C);A.prototype = B;A.extend = this.extend;return A;
	};var bkElement = bkClass.extend({ construct: function (B, A) {
	    if (typeof B == "string") {
	      B = (A || document).createElement(B);
	    }B = $BK(B);return B;
	  }, appendTo: function (A) {
	    A.appendChild(this);return this;
	  }, appendBefore: function (A) {
	    A.parentNode.insertBefore(this, A);return this;
	  }, addEvent: function (B, A) {
	    bkLib.addEvent(this, B, A);return this;
	  }, setContent: function (A) {
	    this.innerHTML = A;return this;
	  }, pos: function () {
	    var C = curtop = 0;var B = obj = this;if (obj.offsetParent) {
	      do {
	        C += obj.offsetLeft;curtop += obj.offsetTop;
	      } while (obj = obj.offsetParent);
	    }var A = !window.opera ? parseInt(this.getStyle("border-width") || this.style.border) || 0 : 0;return [C + A, curtop + A + this.offsetHeight];
	  }, noSelect: function () {
	    bkLib.noSelect(this);return this;
	  }, parentTag: function (A) {
	    var B = this;do {
	      if (B && B.nodeName && B.nodeName.toUpperCase() == A) {
	        return B;
	      }B = B.parentNode;
	    } while (B);return false;
	  }, hasClass: function (A) {
	    return this.className.match(new RegExp("(\\s|^)nicEdit-" + A + "(\\s|$)"));
	  }, addClass: function (A) {
	    if (!this.hasClass(A)) {
	      this.className += " nicEdit-" + A;
	    }return this;
	  }, removeClass: function (A) {
	    if (this.hasClass(A)) {
	      this.className = this.className.replace(new RegExp("(\\s|^)nicEdit-" + A + "(\\s|$)"), " ");
	    }return this;
	  }, setStyle: function (A) {
	    var B = this.style;for (var C in A) {
	      switch (C) {case "float":
	          B.cssFloat = B.styleFloat = A[C];break;case "opacity":
	          B.opacity = A[C];B.filter = "alpha(opacity=" + Math.round(A[C] * 100) + ")";break;case "className":
	          this.className = A[C];break;default:
	          B[C] = A[C];}
	    }return this;
	  }, getStyle: function (A, C) {
	    var B = !C ? document.defaultView : C;if (this.nodeType == 1) {
	      return B && B.getComputedStyle ? B.getComputedStyle(this, null).getPropertyValue(A) : this.currentStyle[bkLib.camelize(A)];
	    }
	  }, remove: function () {
	    this.parentNode.removeChild(this);return this;
	  }, setAttributes: function (A) {
	    for (var B in A) {
	      this[B] = A[B];
	    }return this;
	  } });var bkLib = { isMSIE: navigator.appVersion.indexOf("MSIE") != -1, addEvent: function (C, B, A) {
	    C.addEventListener ? C.addEventListener(B, A, false) : C.attachEvent("on" + B, A);
	  }, toArray: function (C) {
	    var B = C.length,
	        A = new Array(B);while (B--) {
	      A[B] = C[B];
	    }return A;
	  }, noSelect: function (B) {
	    if (B.setAttribute && B.nodeName.toLowerCase() != "input" && B.nodeName.toLowerCase() != "textarea") {
	      B.setAttribute("unselectable", "on");
	    }for (var A = 0; A < B.childNodes.length; A++) {
	      bkLib.noSelect(B.childNodes[A]);
	    }
	  }, camelize: function (A) {
	    return A.replace(/\-(.)/g, function (B, C) {
	      return C.toUpperCase();
	    });
	  }, inArray: function (A, B) {
	    return bkLib.search(A, B) != null;
	  }, search: function (A, C) {
	    for (var B = 0; B < A.length; B++) {
	      if (A[B] == C) {
	        return B;
	      }
	    }return null;
	  }, cancelEvent: function (A) {
	    A = A || window.event;if (A.preventDefault && A.stopPropagation) {
	      A.preventDefault();A.stopPropagation();
	    }return false;
	  }, domLoad: [], domLoaded: function () {
	    if (arguments.callee.done) {
	      return;
	    }arguments.callee.done = true;for (i = 0; i < bkLib.domLoad.length; i++) {
	      bkLib.domLoad[i]();
	    }
	  }, onDomLoaded: function (A) {
	    this.domLoad.push(A);if (document.addEventListener) {
	      document.addEventListener("DOMContentLoaded", bkLib.domLoaded, null);
	    } else {
	      if (bkLib.isMSIE) {
	        document.write("<style>.nicEdit-main p { margin: 0; }</style><script id=__ie_onload defer " + (location.protocol == "https:" ? "src='javascript:void(0)'" : "src=//0") + "></script>");$BK("__ie_onload").onreadystatechange = function () {
	          if (this.readyState == "complete") {
	            bkLib.domLoaded();
	          }
	        };
	      }
	    }window.onload = bkLib.domLoaded;
	  } };function $BK(A) {
	  if (typeof A == "string") {
	    A = document.getElementById(A);
	  }return A && !A.appendTo ? bkExtend(A, bkElement.prototype) : A;
	}var bkEvent = { addEvent: function (A, B) {
	    if (B) {
	      this.eventList = this.eventList || {};this.eventList[A] = this.eventList[A] || [];this.eventList[A].push(B);
	    }return this;
	  }, fireEvent: function () {
	    var A = bkLib.toArray(arguments),
	        C = A.shift();if (this.eventList && this.eventList[C]) {
	      for (var B = 0; B < this.eventList[C].length; B++) {
	        this.eventList[C][B].apply(this, A);
	      }
	    }
	  } };function __(A) {
	  return A;
	}Function.prototype.closure = function () {
	  var A = this,
	      B = bkLib.toArray(arguments),
	      C = B.shift();return function () {
	    if (typeof bkLib != "undefined") {
	      return A.apply(C, B.concat(bkLib.toArray(arguments)));
	    }
	  };
	};Function.prototype.closureListener = function () {
	  var A = this,
	      C = bkLib.toArray(arguments),
	      B = C.shift();return function (E) {
	    E = E || window.event;if (E.target) {
	      var D = E.target;
	    } else {
	      var D = E.srcElement;
	    }return A.apply(B, [E, D].concat(C));
	  };
	};
	
	
	
	var nicEditorConfig = bkClass.extend({
	  buttons: {
	    "bold": { name: __("Click to Bold"), command: "Bold", tags: ["B", "STRONG"], css: { "font-weight": "bold" }, key: "b" },
	    "italic": { name: __("Click to Italic"), command: "Italic", tags: ["EM", "I"], css: { "font-style": "italic" }, key: "i" },
	    "underline": { name: __("Click to Underline"), command: "Underline", tags: ["U"], css: { "text-decoration": "underline" }, key: "u" },
	    "left": { name: __("Left Align"), command: "justifyleft", noActive: true },
	    "center": { name: __("Center Align"), command: "justifycenter", noActive: true },
	    "right": { name: __("Right Align"), command: "justifyright", noActive: true },
	    "justify": { name: __("Justify Align"), command: "justifyfull", noActive: true },
	    "ol": { name: __("Insert Ordered List"), command: "insertorderedlist", tags: ["OL"] },
	    "ul": { name: __("Insert Unordered List"), command: "insertunorderedlist", tags: ["UL"] },
	    "subscript": { name: __("Click to Subscript"), command: "subscript", tags: ["SUB"] },
	    "superscript": { name: __("Click to Superscript"), command: "superscript", tags: ["SUP"] },
	    "strikethrough": { name: __("Click to Strike Through"), command: "strikeThrough", css: { "text-decoration": "line-through" } },
	    "removeformat": { name: __("Remove Formatting"), command: "removeformat", noActive: true },
	    "indent": { name: __("Indent Text"), command: "indent", noActive: true },
	    "outdent": { name: __("Remove Indent"), command: "outdent", noActive: true },
	    "hr": { name: __("Horizontal Rule"), command: "insertHorizontalRule", noActive: true }
	  },
	  iconsPath: "/assets/img/nicEditorIcons.gif",
	  buttonList: ["save", "bold", "italic", "underline", "left", "center", "right", "justify", "ol", "ul", "fontSize", "fontFamily", "fontFormat", "indent", "outdent", "image", "upload", "link", "unlink", "forecolor", "bgcolor"],
	  iconList: { "bgcolor": 1, "forecolor": 2, "bold": 3, "center": 4, "hr": 5, "indent": 6, "italic": 7, "justify": 8, "left": 9, "ol": 10, "outdent": 11, "removeformat": 12, "right": 13, "save": 24, "strikethrough": 15, "subscript": 16, "superscript": 17, "ul": 18, "underline": 19, "image": 20, "link": 21, "unlink": 22, "close": 23, "arrow": 25 }
	
	});
	;
	var nicEditors = { nicPlugins: [], editors: [], registerPlugin: function (B, A) {
	    this.nicPlugins.push({ p: B, o: A });
	  }, allTextAreas: function (C) {
	    var A = document.getElementsByTagName("textarea");for (var B = 0; B < A.length; B++) {
	      nicEditors.editors.push(new nicEditor(C).panelInstance(A[B]));
	    }return nicEditors.editors;
	  }, findEditor: function (C) {
	    var B = nicEditors.editors;for (var A = 0; A < B.length; A++) {
	      if (B[A].instanceById(C)) {
	        return B[A].instanceById(C);
	      }
	    }
	  } };var nicEditor = bkClass.extend({ construct: function (C) {
	    this.options = new nicEditorConfig();bkExtend(this.options, C);this.nicInstances = new Array();this.loadedPlugins = new Array();var A = nicEditors.nicPlugins;for (var B = 0; B < A.length; B++) {
	      this.loadedPlugins.push(new A[B].p(this, A[B].o));
	    }nicEditors.editors.push(this);bkLib.addEvent(document.body, "mousedown", this.selectCheck.closureListener(this));
	  }, panelInstance: function (B, C) {
	    B = this.checkReplace($BK(B));var A = new bkElement("DIV").setStyle({ width: (parseInt(B.getStyle("width")) || B.clientWidth) + "px" }).appendBefore(B);this.setPanel(A);return this.addInstance(B, C);
	  }, checkReplace: function (B) {
	    var A = nicEditors.findEditor(B);if (A) {
	      A.removeInstance(B);A.removePanel();
	    }return B;
	  }, addInstance: function (B, C) {
	    B = this.checkReplace($BK(B));if (B.contentEditable || !!window.opera) {
	      var A = new nicEditorInstance(B, C, this);
	    } else {
	      var A = new nicEditorIFrameInstance(B, C, this);
	    }this.nicInstances.push(A);return this;
	  }, removeInstance: function (C) {
	    C = $BK(C);var B = this.nicInstances;for (var A = 0; A < B.length; A++) {
	      if (B[A].e == C) {
	        B[A].remove();this.nicInstances.splice(A, 1);
	      }
	    }
	  }, removePanel: function (A) {
	    if (this.nicPanel) {
	      this.nicPanel.remove();this.nicPanel = null;
	    }
	  }, instanceById: function (C) {
	    C = $BK(C);var B = this.nicInstances;for (var A = 0; A < B.length; A++) {
	      if (B[A].e == C) {
	        return B[A];
	      }
	    }
	  }, setPanel: function (A) {
	    this.nicPanel = new nicEditorPanel($BK(A), this.options, this);this.fireEvent("panel", this.nicPanel);return this;
	  }, nicCommand: function (B, A) {
	    if (this.selectedInstance) {
	      this.selectedInstance.nicCommand(B, A);
	    }
	  }, getIcon: function (D, A) {
	    var C = this.options.iconList[D];var B = A.iconFiles ? A.iconFiles[D] : "";return { backgroundImage: "url('" + (C ? this.options.iconsPath : B) + "')", backgroundPosition: (C ? (C - 1) * -18 : 0) + "px 0px" };
	  }, selectCheck: function (C, A) {
	    var B = false;do {
	      if (A.className && A.className.indexOf("nicEdit") != -1) {
	        return false;
	      }
	    } while (A = A.parentNode);this.fireEvent("blur", this.selectedInstance, A);this.lastSelectedInstance = this.selectedInstance;this.selectedInstance = null;return false;
	  } });nicEditor = nicEditor.extend(bkEvent);
	var nicEditorInstance = bkClass.extend({ isSelected: false, construct: function (G, D, C) {
	    this.ne = C;this.elm = this.e = G;this.options = D || {};newX = parseInt(G.getStyle("width")) || G.clientWidth;newY = parseInt(G.getStyle("height")) || G.clientHeight;this.initialHeight = newY - 8;var H = G.nodeName.toLowerCase() == "textarea";if (H || this.options.hasPanel) {
	      var B = bkLib.isMSIE && !(typeof document.body.style.maxHeight != "undefined" && document.compatMode == "CSS1Compat");var E = { width: newX + "px", border: "1px solid #ccc", borderTop: 0, overflowY: "auto", overflowX: "hidden" };E[B ? "height" : "maxHeight"] = this.ne.options.maxHeight ? this.ne.options.maxHeight + "px" : null;this.editorContain = new bkElement("DIV").setStyle(E).appendBefore(G);var A = new bkElement("DIV").setStyle({ width: newX - 8 + "px", margin: "4px", minHeight: newY + "px" }).addClass("main").appendTo(this.editorContain);G.setStyle({ display: "none" });A.innerHTML = G.innerHTML;if (H) {
	        A.setContent(G.value);this.copyElm = G;var F = G.parentTag("FORM");if (F) {
	          bkLib.addEvent(F, "submit", this.saveContent.closure(this));
	        }
	      }A.setStyle(B ? { height: newY + "px" } : { overflow: "hidden" });this.elm = A;
	    }this.ne.addEvent("blur", this.blur.closure(this));this.init();this.blur();
	  }, init: function () {
	    this.elm.setAttribute("contentEditable", "true");if (this.getContent() == "") {
	      this.setContent("<br />");
	    }this.instanceDoc = document.defaultView;this.elm.addEvent("mousedown", this.selected.closureListener(this)).addEvent("keypress", this.keyDown.closureListener(this)).addEvent("focus", this.selected.closure(this)).addEvent("blur", this.blur.closure(this)).addEvent("keyup", this.selected.closure(this));this.ne.fireEvent("add", this);
	  }, remove: function () {
	    this.saveContent();if (this.copyElm || this.options.hasPanel) {
	      this.editorContain.remove();this.e.setStyle({ display: "block" });this.ne.removePanel();
	    }this.disable();this.ne.fireEvent("remove", this);
	  }, disable: function () {
	    this.elm.setAttribute("contentEditable", "false");
	  }, getSel: function () {
	    return window.getSelection ? window.getSelection() : document.selection;
	  }, getRng: function () {
	    var A = this.getSel();if (!A || A.rangeCount === 0) {
	      return;
	    }return A.rangeCount > 0 ? A.getRangeAt(0) : A.createRange();
	  }, selRng: function (A, B) {
	    if (window.getSelection) {
	      B.removeAllRanges();B.addRange(A);
	    } else {
	      A.select();
	    }
	  }, selElm: function () {
	    var C = this.getRng();if (!C) {
	      return;
	    }if (C.startContainer) {
	      var D = C.startContainer;if (C.cloneContents().childNodes.length == 1) {
	        for (var B = 0; B < D.childNodes.length; B++) {
	          var A = D.childNodes[B].ownerDocument.createRange();A.selectNode(D.childNodes[B]);if (C.compareBoundaryPoints(Range.START_TO_START, A) != 1 && C.compareBoundaryPoints(Range.END_TO_END, A) != -1) {
	            return $BK(D.childNodes[B]);
	          }
	        }
	      }return $BK(D);
	    } else {
	      return $BK(this.getSel().type == "Control" ? C.item(0) : C.parentElement());
	    }
	  }, saveRng: function () {
	    this.savedRange = this.getRng();this.savedSel = this.getSel();
	  }, restoreRng: function () {
	    if (this.savedRange) {
	      this.selRng(this.savedRange, this.savedSel);
	    }
	  }, keyDown: function (B, A) {
	    if (B.ctrlKey) {
	      this.ne.fireEvent("key", this, B);
	    }
	  }, selected: function (C, A) {
	    if (!A && !(A = this.selElm)) {
	      A = this.selElm();
	    }if (!C.ctrlKey) {
	      var B = this.ne.selectedInstance;if (B != this) {
	        if (B) {
	          this.ne.fireEvent("blur", B, A);
	        }this.ne.selectedInstance = this;this.ne.fireEvent("focus", B, A);
	      }this.ne.fireEvent("selected", B, A);this.isFocused = true;this.elm.addClass("selected");
	    }return false;
	  }, blur: function () {
	    this.isFocused = false;this.elm.removeClass("selected");
	  }, saveContent: function () {
	    if (this.copyElm || this.options.hasPanel) {
	      this.ne.fireEvent("save", this);this.copyElm ? this.copyElm.value = this.getContent() : this.e.innerHTML = this.getContent();
	    }
	  }, getElm: function () {
	    return this.elm;
	  }, getContent: function () {
	    this.content = this.getElm().innerHTML;this.ne.fireEvent("get", this);return this.content;
	  }, setContent: function (A) {
	    this.content = A;this.ne.fireEvent("set", this);this.elm.innerHTML = this.content;
	  }, nicCommand: function (B, A) {
	    document.execCommand(B, false, A);
	  } });
	var nicEditorIFrameInstance = nicEditorInstance.extend({ savedStyles: [], init: function () {
	    var B = this.elm.innerHTML.replace(/^\s+|\s+$/g, "");this.elm.innerHTML = "";!B ? B = "<br />" : B;this.initialContent = B;this.elmFrame = new bkElement("iframe").setAttributes({ src: "javascript:;", frameBorder: 0, allowTransparency: "true", scrolling: "no" }).setStyle({ height: "100px", width: "100%" }).addClass("frame").appendTo(this.elm);if (this.copyElm) {
	      this.elmFrame.setStyle({ width: this.elm.offsetWidth - 4 + "px" });
	    }var A = ["font-size", "font-family", "font-weight", "color"];for (itm in A) {
	      this.savedStyles[bkLib.camelize(itm)] = this.elm.getStyle(itm);
	    }setTimeout(this.initFrame.closure(this), 50);
	  }, disable: function () {
	    this.elm.innerHTML = this.getContent();
	  }, initFrame: function () {
	    var B = $BK(this.elmFrame.contentWindow.document);B.designMode = "on";B.open();var A = this.ne.options.externalCSS;B.write("<html><head>" + (A ? "<link href=\"" + A + "\" rel=\"stylesheet\" type=\"text/css\" />" : "") + "</head><body id=\"nicEditContent\" style=\"margin: 0 !important; background-color: transparent !important;\">" + this.initialContent + "</body></html>");B.close();this.frameDoc = B;this.frameWin = $BK(this.elmFrame.contentWindow);this.frameContent = $BK(this.frameWin.document.body).setStyle(this.savedStyles);this.instanceDoc = this.frameWin.document.defaultView;this.heightUpdate();this.frameDoc.addEvent("mousedown", this.selected.closureListener(this)).addEvent("keyup", this.heightUpdate.closureListener(this)).addEvent("keydown", this.keyDown.closureListener(this)).addEvent("keyup", this.selected.closure(this));this.ne.fireEvent("add", this);
	  }, getElm: function () {
	    return this.frameContent;
	  }, setContent: function (A) {
	    this.content = A;this.ne.fireEvent("set", this);this.frameContent.innerHTML = this.content;this.heightUpdate();
	  }, getSel: function () {
	    return this.frameWin ? this.frameWin.getSelection() : this.frameDoc.selection;
	  }, heightUpdate: function () {
	    this.elmFrame.style.height = Math.max(this.frameContent.offsetHeight, this.initialHeight) + "px";
	  }, nicCommand: function (B, A) {
	    this.frameDoc.execCommand(B, false, A);setTimeout(this.heightUpdate.closure(this), 100);
	  } });
	var nicEditorPanel = bkClass.extend({ construct: function (E, B, A) {
	    this.elm = E;this.options = B;this.ne = A;this.panelButtons = new Array();this.buttonList = bkExtend([], this.ne.options.buttonList);this.panelContain = new bkElement("DIV").setStyle({ overflow: "hidden", width: "100%", border: "1px solid #cccccc", backgroundColor: "#efefef" }).addClass("panelContain");this.panelElm = new bkElement("DIV").setStyle({ margin: "2px", marginTop: "0px", zoom: 1, overflow: "hidden" }).addClass("panel").appendTo(this.panelContain);this.panelContain.appendTo(E);var C = this.ne.options;var D = C.buttons;for (button in D) {
	      this.addButton(button, C, true);
	    }this.reorder();E.noSelect();
	  }, addButton: function (buttonName, options, noOrder) {
	    var button = options.buttons[buttonName];var type = button.type ? eval("(typeof(" + button.type + ") == \"undefined\") ? null : " + button.type + ";") : nicEditorButton;var hasButton = bkLib.inArray(this.buttonList, buttonName);if (type && (hasButton || this.ne.options.fullPanel)) {
	      this.panelButtons.push(new type(this.panelElm, buttonName, options, this.ne));if (!hasButton) {
	        this.buttonList.push(buttonName);
	      }
	    }
	  }, findButton: function (B) {
	    for (var A = 0; A < this.panelButtons.length; A++) {
	      if (this.panelButtons[A].name == B) {
	        return this.panelButtons[A];
	      }
	    }
	  }, reorder: function () {
	    var C = this.buttonList;for (var B = 0; B < C.length; B++) {
	      var A = this.findButton(C[B]);if (A) {
	        this.panelElm.appendChild(A.margin);
	      }
	    }
	  }, remove: function () {
	    this.elm.remove();
	  } });
	var nicEditorButton = bkClass.extend({ construct: function (D, A, C, B) {
	    this.options = C.buttons[A];this.name = A;this.ne = B;this.elm = D;this.margin = new bkElement("DIV").setStyle({ "float": "left", marginTop: "2px" }).appendTo(D);this.contain = new bkElement("DIV").setStyle({ width: "20px", height: "20px" }).addClass("buttonContain").appendTo(this.margin);this.border = new bkElement("DIV").setStyle({ backgroundColor: "#efefef", border: "1px solid #efefef" }).appendTo(this.contain);this.button = new bkElement("DIV").setStyle({ width: "18px", height: "18px", overflow: "hidden", zoom: 1, cursor: "pointer" }).addClass("button").setStyle(this.ne.getIcon(A, C)).appendTo(this.border);this.button.addEvent("mouseover", this.hoverOn.closure(this)).addEvent("mouseout", this.hoverOff.closure(this)).addEvent("mousedown", this.mouseClick.closure(this)).noSelect();if (!window.opera) {
	      this.button.onmousedown = this.button.onclick = bkLib.cancelEvent;
	    }B.addEvent("selected", this.enable.closure(this)).addEvent("blur", this.disable.closure(this)).addEvent("key", this.key.closure(this));this.disable();this.init();
	  }, init: function () {}, hide: function () {
	    this.contain.setStyle({ display: "none" });
	  }, updateState: function () {
	    if (this.isDisabled) {
	      this.setBg();
	    } else {
	      if (this.isHover) {
	        this.setBg("hover");
	      } else {
	        if (this.isActive) {
	          this.setBg("active");
	        } else {
	          this.setBg();
	        }
	      }
	    }
	  }, setBg: function (A) {
	    switch (A) {case "hover":
	        var B = { border: "1px solid #666", backgroundColor: "#ddd" };break;case "active":
	        var B = { border: "1px solid #666", backgroundColor: "#ccc" };break;default:
	        var B = { border: "1px solid #efefef", backgroundColor: "#efefef" };}this.border.setStyle(B).addClass("button-" + A);
	  }, checkNodes: function (A) {
	    var B = A;do {
	      if (this.options.tags && bkLib.inArray(this.options.tags, B.nodeName)) {
	        this.activate();return true;
	      }
	    } while (B = B.parentNode && B.className != "nicEdit");B = $BK(A);while (B.nodeType == 3) {
	      B = $BK(B.parentNode);
	    }if (this.options.css) {
	      for (itm in this.options.css) {
	        if (B.getStyle(itm, this.ne.selectedInstance.instanceDoc) == this.options.css[itm]) {
	          this.activate();return true;
	        }
	      }
	    }this.deactivate();return false;
	  }, activate: function () {
	    if (!this.isDisabled) {
	      this.isActive = true;this.updateState();this.ne.fireEvent("buttonActivate", this);
	    }
	  }, deactivate: function () {
	    this.isActive = false;this.updateState();if (!this.isDisabled) {
	      this.ne.fireEvent("buttonDeactivate", this);
	    }
	  }, enable: function (A, B) {
	    this.isDisabled = false;this.contain.setStyle({ opacity: 1 }).addClass("buttonEnabled");this.updateState();this.checkNodes(B);
	  }, disable: function (A, B) {
	    this.isDisabled = true;this.contain.setStyle({ opacity: 0.6 }).removeClass("buttonEnabled");this.updateState();
	  }, toggleActive: function () {
	    this.isActive ? this.deactivate() : this.activate();
	  }, hoverOn: function () {
	    if (!this.isDisabled) {
	      this.isHover = true;this.updateState();this.ne.fireEvent("buttonOver", this);
	    }
	  }, hoverOff: function () {
	    this.isHover = false;this.updateState();this.ne.fireEvent("buttonOut", this);
	  }, mouseClick: function () {
	    if (this.options.command) {
	      this.ne.nicCommand(this.options.command, this.options.commandArgs);if (!this.options.noActive) {
	        this.toggleActive();
	      }
	    }this.ne.fireEvent("buttonClick", this);
	  }, key: function (A, B) {
	    if (this.options.key && B.ctrlKey && String.fromCharCode(B.keyCode || B.charCode).toLowerCase() == this.options.key) {
	      this.mouseClick();if (B.preventDefault) {
	        B.preventDefault();
	      }
	    }
	  } });
	var nicPlugin = bkClass.extend({ construct: function (B, A) {
	    this.options = A;this.ne = B;this.ne.addEvent("panel", this.loadPanel.closure(this));this.init();
	  }, loadPanel: function (C) {
	    var B = this.options.buttons;for (var A in B) {
	      C.addButton(A, this.options);
	    }C.reorder();
	  }, init: function () {} });
	
	
	var nicPaneOptions = {};
	
	var nicEditorPane = bkClass.extend({ construct: function (D, C, B, A) {
	    this.ne = C;this.elm = D;this.pos = D.pos();this.contain = new bkElement("div").setStyle({ zIndex: "99999", overflow: "hidden", position: "absolute", left: this.pos[0] + "px", top: this.pos[1] + "px" });this.pane = new bkElement("div").setStyle({ fontSize: "12px", border: "1px solid #ccc", overflow: "hidden", padding: "4px", textAlign: "left", backgroundColor: "#ffffc9" }).addClass("pane").setStyle(B).appendTo(this.contain);if (A && !A.options.noClose) {
	      this.close = new bkElement("div").setStyle({ "float": "right", height: "16px", width: "16px", cursor: "pointer" }).setStyle(this.ne.getIcon("close", nicPaneOptions)).addEvent("mousedown", A.removePane.closure(this)).appendTo(this.pane);
	    }this.contain.noSelect().appendTo(document.body);this.position();this.init();
	  }, init: function () {}, position: function () {
	    if (this.ne.nicPanel) {
	      var B = this.ne.nicPanel.elm;var A = B.pos();var C = A[0] + parseInt(B.getStyle("width")) - (parseInt(this.pane.getStyle("width")) + 8);if (C < this.pos[0]) {
	        this.contain.setStyle({ left: C + "px" });
	      }
	    }
	  }, toggle: function () {
	    this.isVisible = !this.isVisible;this.contain.setStyle({ display: this.isVisible ? "block" : "none" });
	  }, remove: function () {
	    if (this.contain) {
	      this.contain.remove();this.contain = null;
	    }
	  }, append: function (A) {
	    A.appendTo(this.pane);
	  }, setContent: function (A) {
	    this.pane.setContent(A);
	  } });
	
	var nicEditorAdvancedButton = nicEditorButton.extend({ init: function () {
	    this.ne.addEvent("selected", this.removePane.closure(this)).addEvent("blur", this.removePane.closure(this));
	  }, mouseClick: function () {
	    if (!this.isDisabled) {
	      if (this.pane && this.pane.pane) {
	        this.removePane();
	      } else {
	        this.pane = new nicEditorPane(this.contain, this.ne, { width: this.width || "270px", backgroundColor: "#fff" }, this);this.addPane();this.ne.selectedInstance.saveRng();
	      }
	    }
	  }, addForm: function (C, G) {
	    this.form = new bkElement("form").addEvent("submit", this.submit.closureListener(this));this.pane.append(this.form);this.inputs = {};for (itm in C) {
	      var D = C[itm];var F = "";if (G) {
	        F = G.getAttribute(itm);
	      }if (!F) {
	        F = D.value || "";
	      }var A = C[itm].type;if (A == "title") {
	        new bkElement("div").setContent(D.txt).setStyle({ fontSize: "14px", fontWeight: "bold", padding: "0px", margin: "2px 0" }).appendTo(this.form);
	      } else {
	        var B = new bkElement("div").setStyle({ overflow: "hidden", clear: "both" }).appendTo(this.form);if (D.txt) {
	          new bkElement("label").setAttributes({ "for": itm }).setContent(D.txt).setStyle({ margin: "2px 4px", fontSize: "13px", width: "50px", lineHeight: "20px", textAlign: "right", "float": "left" }).appendTo(B);
	        }switch (A) {case "text":
	            this.inputs[itm] = new bkElement("input").setAttributes({ id: itm, value: F, type: "text" }).setStyle({ margin: "2px 0", fontSize: "13px", "float": "left", height: "20px", border: "1px solid #ccc", overflow: "hidden" }).setStyle(D.style).appendTo(B);break;case "select":
	            this.inputs[itm] = new bkElement("select").setAttributes({ id: itm }).setStyle({ border: "1px solid #ccc", "float": "left", margin: "2px 0" }).appendTo(B);for (opt in D.options) {
	              var E = new bkElement("option").setAttributes({ value: opt, selected: opt == F ? "selected" : "" }).setContent(D.options[opt]).appendTo(this.inputs[itm]);
	            }break;case "content":
	            this.inputs[itm] = new bkElement("textarea").setAttributes({ id: itm }).setStyle({ border: "1px solid #ccc", "float": "left" }).setStyle(D.style).appendTo(B);this.inputs[itm].value = F;}
	      }
	    }new bkElement("input").setAttributes({ type: "submit" }).setStyle({ backgroundColor: "#efefef", border: "1px solid #ccc", margin: "3px 0", "float": "left", clear: "both" }).appendTo(this.form);this.form.onsubmit = bkLib.cancelEvent;
	  }, submit: function () {}, findElm: function (B, A, E) {
	    var D = this.ne.selectedInstance.getElm().getElementsByTagName(B);for (var C = 0; C < D.length; C++) {
	      if (D[C].getAttribute(A) == E) {
	        return $BK(D[C]);
	      }
	    }
	  }, removePane: function () {
	    if (this.pane) {
	      this.pane.remove();this.pane = null;this.ne.selectedInstance.restoreRng();
	    }
	  } });
	
	var nicButtonTips = bkClass.extend({ construct: function (A) {
	    this.ne = A;A.addEvent("buttonOver", this.show.closure(this)).addEvent("buttonOut", this.hide.closure(this));
	  }, show: function (A) {
	    this.timer = setTimeout(this.create.closure(this, A), 400);
	  }, create: function (A) {
	    this.timer = null;if (!this.pane) {
	      this.pane = new nicEditorPane(A.button, this.ne, { fontSize: "12px", marginTop: "5px" });this.pane.setContent(A.options.name);
	    }
	  }, hide: function (A) {
	    if (this.timer) {
	      clearTimeout(this.timer);
	    }if (this.pane) {
	      this.pane = this.pane.remove();
	    }
	  } });nicEditors.registerPlugin(nicButtonTips);
	
	
	var nicSelectOptions = {
	  buttons: {
	    "fontSize": { name: __("Select Font Size"), type: "nicEditorFontSizeSelect", command: "fontsize" },
	    "fontFamily": { name: __("Select Font Family"), type: "nicEditorFontFamilySelect", command: "fontname" },
	    "fontFormat": { name: __("Select Font Format"), type: "nicEditorFontFormatSelect", command: "formatBlock" }
	  }
	};
	
	var nicEditorSelect = bkClass.extend({ construct: function (D, A, C, B) {
	    this.options = C.buttons[A];this.elm = D;this.ne = B;this.name = A;this.selOptions = new Array();this.margin = new bkElement("div").setStyle({ "float": "left", margin: "2px 1px 0 1px" }).appendTo(this.elm);this.contain = new bkElement("div").setStyle({ width: "90px", height: "20px", cursor: "pointer", overflow: "hidden" }).addClass("selectContain").addEvent("click", this.toggle.closure(this)).appendTo(this.margin);this.items = new bkElement("div").setStyle({ overflow: "hidden", zoom: 1, border: "1px solid #ccc", paddingLeft: "3px", backgroundColor: "#fff" }).appendTo(this.contain);this.control = new bkElement("div").setStyle({ overflow: "hidden", "float": "right", height: "18px", width: "16px" }).addClass("selectControl").setStyle(this.ne.getIcon("arrow", C)).appendTo(this.items);this.txt = new bkElement("div").setStyle({ overflow: "hidden", "float": "left", width: "66px", height: "14px", marginTop: "1px", fontFamily: "sans-serif", textAlign: "center", fontSize: "12px" }).addClass("selectTxt").appendTo(this.items);if (!window.opera) {
	      this.contain.onmousedown = this.control.onmousedown = this.txt.onmousedown = bkLib.cancelEvent;
	    }this.margin.noSelect();this.ne.addEvent("selected", this.enable.closure(this)).addEvent("blur", this.disable.closure(this));this.disable();this.init();
	  }, disable: function () {
	    this.isDisabled = true;this.close();this.contain.setStyle({ opacity: 0.6 });
	  }, enable: function (A) {
	    this.isDisabled = false;this.close();this.contain.setStyle({ opacity: 1 });
	  }, setDisplay: function (A) {
	    this.txt.setContent(A);
	  }, toggle: function () {
	    if (!this.isDisabled) {
	      this.pane ? this.close() : this.open();
	    }
	  }, open: function () {
	    this.pane = new nicEditorPane(this.items, this.ne, { width: "88px", padding: "0px", borderTop: 0, borderLeft: "1px solid #ccc", borderRight: "1px solid #ccc", borderBottom: "0px", backgroundColor: "#fff" });for (var C = 0; C < this.selOptions.length; C++) {
	      var B = this.selOptions[C];var A = new bkElement("div").setStyle({ overflow: "hidden", borderBottom: "1px solid #ccc", width: "88px", textAlign: "left", overflow: "hidden", cursor: "pointer" });var D = new bkElement("div").setStyle({ padding: "0px 4px" }).setContent(B[1]).appendTo(A).noSelect();D.addEvent("click", this.update.closure(this, B[0])).addEvent("mouseover", this.over.closure(this, D)).addEvent("mouseout", this.out.closure(this, D)).setAttributes("id", B[0]);this.pane.append(A);if (!window.opera) {
	        D.onmousedown = bkLib.cancelEvent;
	      }
	    }
	  }, close: function () {
	    if (this.pane) {
	      this.pane = this.pane.remove();
	    }
	  }, over: function (A) {
	    A.setStyle({ backgroundColor: "#ccc" });
	  }, out: function (A) {
	    A.setStyle({ backgroundColor: "#fff" });
	  }, add: function (B, A) {
	    this.selOptions.push(new Array(B, A));
	  }, update: function (A) {
	    this.ne.nicCommand(this.options.command, A);this.close();
	  } });var nicEditorFontSizeSelect = nicEditorSelect.extend({ sel: { 1: "1&nbsp;(8pt)", 2: "2&nbsp;(10pt)", 3: "3&nbsp;(12pt)", 4: "4&nbsp;(14pt)", 5: "5&nbsp;(18pt)", 6: "6&nbsp;(24pt)" }, init: function () {
	    this.setDisplay("Font&nbsp;Size...");for (itm in this.sel) {
	      this.add(itm, "<font size=\"" + itm + "\">" + this.sel[itm] + "</font>");
	    }
	  } });var nicEditorFontFamilySelect = nicEditorSelect.extend({ sel: { arial: "Arial", "comic sans ms": "Comic Sans", "courier new": "Courier New", georgia: "Georgia", helvetica: "Helvetica", impact: "Impact", "times new roman": "Times", "trebuchet ms": "Trebuchet", verdana: "Verdana" }, init: function () {
	    this.setDisplay("Font&nbsp;Family...");for (itm in this.sel) {
	      this.add(itm, "<font face=\"" + itm + "\">" + this.sel[itm] + "</font>");
	    }
	  } });var nicEditorFontFormatSelect = nicEditorSelect.extend({ sel: { p: "Paragraph", pre: "Pre", h6: "Heading&nbsp;6", h5: "Heading&nbsp;5", h4: "Heading&nbsp;4", h3: "Heading&nbsp;3", h2: "Heading&nbsp;2", h1: "Heading&nbsp;1" }, init: function () {
	    this.setDisplay("Font&nbsp;Format...");for (itm in this.sel) {
	      var A = itm.toUpperCase();this.add("<" + A + ">", "<" + itm + " style=\"padding: 0px; margin: 0px;\">" + this.sel[itm] + "</" + A + ">");
	    }
	  } });nicEditors.registerPlugin(nicPlugin, nicSelectOptions);
	
	
	var nicLinkOptions = {
	  buttons: {
	    "link": { name: "Add Link", type: "nicLinkButton", tags: ["A"] },
	    "unlink": { name: "Remove Link", command: "unlink", noActive: true }
	  }
	};
	
	var nicLinkButton = nicEditorAdvancedButton.extend({ addPane: function () {
	    this.ln = this.ne.selectedInstance.selElm().parentTag("A");this.addForm({ "": { type: "title", txt: "Add/Edit Link" }, href: { type: "text", txt: "URL", value: "http://", style: { width: "150px" } }, title: { type: "text", txt: "Title" }, target: { type: "select", txt: "Open In", options: { "": "Current Window", _blank: "New Window" }, style: { width: "100px" } } }, this.ln);
	  }, submit: function (C) {
	    var A = this.inputs.href.value;if (A == "http://" || A == "") {
	      alert("You must enter a URL to Create a Link");return false;
	    }this.removePane();if (!this.ln) {
	      var B = "javascript:nicTemp();";this.ne.nicCommand("createlink", B);this.ln = this.findElm("A", "href", B);
	    }if (this.ln) {
	      this.ln.setAttributes({ href: this.inputs.href.value, title: this.inputs.title.value, target: this.inputs.target.options[this.inputs.target.selectedIndex].value });
	    }
	  } });nicEditors.registerPlugin(nicPlugin, nicLinkOptions);
	
	
	var nicColorOptions = {
	  buttons: {
	    "forecolor": { name: __("Change Text Color"), type: "nicEditorColorButton", noClose: true },
	    "bgcolor": { name: __("Change Background Color"), type: "nicEditorBgColorButton", noClose: true }
	  }
	};
	
	var nicEditorColorButton = nicEditorAdvancedButton.extend({ addPane: function () {
	    var D = { 0: "00", 1: "33", 2: "66", 3: "99", 4: "CC", 5: "FF" };var H = new bkElement("DIV").setStyle({ width: "270px" });for (var A in D) {
	      for (var F in D) {
	        for (var E in D) {
	          var I = "#" + D[A] + D[E] + D[F];var C = new bkElement("DIV").setStyle({ cursor: "pointer", height: "15px", "float": "left" }).appendTo(H);var G = new bkElement("DIV").setStyle({ border: "2px solid " + I }).appendTo(C);var B = new bkElement("DIV").setStyle({ backgroundColor: I, overflow: "hidden", width: "11px", height: "11px" }).addEvent("click", this.colorSelect.closure(this, I)).addEvent("mouseover", this.on.closure(this, G)).addEvent("mouseout", this.off.closure(this, G, I)).appendTo(G);if (!window.opera) {
	            C.onmousedown = B.onmousedown = bkLib.cancelEvent;
	          }
	        }
	      }
	    }this.pane.append(H.noSelect());
	  }, colorSelect: function (A) {
	    this.ne.nicCommand("foreColor", A);this.removePane();
	  }, on: function (A) {
	    A.setStyle({ border: "2px solid #000" });
	  }, off: function (A, B) {
	    A.setStyle({ border: "2px solid " + B });
	  } });var nicEditorBgColorButton = nicEditorColorButton.extend({ colorSelect: function (A) {
	    this.ne.nicCommand("hiliteColor", A);this.removePane();
	  } });nicEditors.registerPlugin(nicPlugin, nicColorOptions);
	
	
	var nicImageOptions = {
	  buttons: {
	    "image": { name: "Add Image", type: "nicImageButton", tags: ["IMG"] }
	  }
	
	};
	
	var nicImageButton = nicEditorAdvancedButton.extend({ addPane: function () {
	    this.im = this.ne.selectedInstance.selElm().parentTag("IMG");this.addForm({ "": { type: "title", txt: "Add/Edit Image" }, src: { type: "text", txt: "URL", value: "http://", style: { width: "150px" } }, alt: { type: "text", txt: "Alt Text", style: { width: "100px" } }, align: { type: "select", txt: "Align", options: { none: "Default", left: "Left", right: "Right" } } }, this.im);
	  }, submit: function (B) {
	    var C = this.inputs.src.value;if (C == "" || C == "http://") {
	      alert("You must enter a Image URL to insert");return false;
	    }this.removePane();if (!this.im) {
	      var A = "javascript:nicImTemp();";this.ne.nicCommand("insertImage", A);this.im = this.findElm("IMG", "src", A);
	    }if (this.im) {
	      this.im.setAttributes({ src: this.inputs.src.value, alt: this.inputs.alt.value, align: this.inputs.align.value });
	    }
	  } });nicEditors.registerPlugin(nicPlugin, nicImageOptions);
	
	
	var nicSaveOptions = {
	  buttons: {
	    "save": { name: __("Save this content"), type: "nicEditorSaveButton" }
	  }
	};
	
	var nicEditorSaveButton = nicEditorButton.extend({ init: function () {
	    if (!this.ne.options.onSave) {
	      this.margin.setStyle({ display: "none" });
	    }
	  }, mouseClick: function () {
	    var B = this.ne.options.onSave;var A = this.ne.selectedInstance;B(A.getContent(), A.elm.id, A);
	  } });nicEditors.registerPlugin(nicPlugin, nicSaveOptions);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {var m = (function app(window, undefined) {
		var OBJECT = "[object Object]", ARRAY = "[object Array]", STRING = "[object String]", FUNCTION = "function";
		var type = {}.toString;
		var parser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g, attrParser = /\[(.+?)(?:=("|'|)(.*?)\2)?\]/;
		var voidElements = /^(AREA|BASE|BR|COL|COMMAND|EMBED|HR|IMG|INPUT|KEYGEN|LINK|META|PARAM|SOURCE|TRACK|WBR)$/;
	
		// caching commonly used variables
		var $document, $location, $requestAnimationFrame, $cancelAnimationFrame;
	
		// self invoking function needed because of the way mocks work
		function initialize(window){
			$document = window.document;
			$location = window.location;
			$cancelAnimationFrame = window.cancelAnimationFrame || window.clearTimeout;
			$requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
		}
	
		initialize(window);
	
	
		/*
		 * @typedef {String} Tag
		 * A string that looks like -> div.classname#id[param=one][param2=two]
		 * Which describes a DOM node
		 */
	
		/*
		 *
		 * @param {Tag} The DOM node tag
		 * @param {Object=[]} optional key-value pairs to be mapped to DOM attrs
		 * @param {...mNode=[]} Zero or more Mithril child nodes. Can be an array, or splat (optional)
		 *
		 */
		function m() {
			var args = [].slice.call(arguments);
			var hasAttrs = args[1] != null && type.call(args[1]) === OBJECT && !("tag" in args[1]) && !("subtree" in args[1]);
			var attrs = hasAttrs ? args[1] : {};
			var classAttrName = "class" in attrs ? "class" : "className";
			var cell = {tag: "div", attrs: {}};
			var match, classes = [];
			if (type.call(args[0]) != STRING) throw new Error("selector in m(selector, attrs, children) should be a string")
			while (match = parser.exec(args[0])) {
				if (match[1] === "" && match[2]) cell.tag = match[2];
				else if (match[1] === "#") cell.attrs.id = match[2];
				else if (match[1] === ".") classes.push(match[2]);
				else if (match[3][0] === "[") {
					var pair = attrParser.exec(match[3]);
					cell.attrs[pair[1]] = pair[3] || (pair[2] ? "" :true)
				}
			}
			if (classes.length > 0) cell.attrs[classAttrName] = classes.join(" ");
	
	
			var children = hasAttrs ? args[2] : args[1];
			if (type.call(children) === ARRAY) {
				cell.children = children
			}
			else {
				cell.children = hasAttrs ? args.slice(2) : args.slice(1)
			}
	
			for (var attrName in attrs) {
				if (attrName === classAttrName) cell.attrs[attrName] = (cell.attrs[attrName] || "") + " " + attrs[attrName];
				else cell.attrs[attrName] = attrs[attrName]
			}
			return cell
		}
		function build(parentElement, parentTag, parentCache, parentIndex, data, cached, shouldReattach, index, editable, namespace, configs) {
			//`build` is a recursive function that manages creation/diffing/removal of DOM elements based on comparison between `data` and `cached`
			//the diff algorithm can be summarized as this:
			//1 - compare `data` and `cached`
			//2 - if they are different, copy `data` to `cached` and update the DOM based on what the difference is
			//3 - recursively apply this algorithm for every array and for the children of every virtual element
	
			//the `cached` data structure is essentially the same as the previous redraw's `data` data structure, with a few additions:
			//- `cached` always has a property called `nodes`, which is a list of DOM elements that correspond to the data represented by the respective virtual element
			//- in order to support attaching `nodes` as a property of `cached`, `cached` is *always* a non-primitive object, i.e. if the data was a string, then cached is a String instance. If data was `null` or `undefined`, cached is `new String("")`
			//- `cached also has a `configContext` property, which is the state storage object exposed by config(element, isInitialized, context)
			//- when `cached` is an Object, it represents a virtual element; when it's an Array, it represents a list of elements; when it's a String, Number or Boolean, it represents a text node
	
			//`parentElement` is a DOM element used for W3C DOM API calls
			//`parentTag` is only used for handling a corner case for textarea values
			//`parentCache` is used to remove nodes in some multi-node cases
			//`parentIndex` and `index` are used to figure out the offset of nodes. They're artifacts from before arrays started being flattened and are likely refactorable
			//`data` and `cached` are, respectively, the new and old nodes being diffed
			//`shouldReattach` is a flag indicating whether a parent node was recreated (if so, and if this node is reused, then this node must reattach itself to the new parent)
			//`editable` is a flag that indicates whether an ancestor is contenteditable
			//`namespace` indicates the closest HTML namespace as it cascades down from an ancestor
			//`configs` is a list of config functions to run after the topmost `build` call finishes running
	
			//there's logic that relies on the assumption that null and undefined data are equivalent to empty strings
			//- this prevents lifecycle surprises from procedural helpers that mix implicit and explicit return statements (e.g. function foo() {if (cond) return m("div")}
			//- it simplifies diffing code
			//data.toString() is null if data is the return value of Console.log in Firefox
			if (data == null || data.toString() == null) data = "";
			if (data.subtree === "retain") return cached;
			var cachedType = type.call(cached), dataType = type.call(data);
			if (cached == null || cachedType !== dataType) {
				if (cached != null) {
					if (parentCache && parentCache.nodes) {
						var offset = index - parentIndex;
						var end = offset + (dataType === ARRAY ? data : cached.nodes).length;
						clear(parentCache.nodes.slice(offset, end), parentCache.slice(offset, end))
					}
					else if (cached.nodes) clear(cached.nodes, cached)
				}
				cached = new data.constructor;
				if (cached.tag) cached = {}; //if constructor creates a virtual dom element, use a blank object as the base cached node instead of copying the virtual el (#277)
				cached.nodes = []
			}
	
			if (dataType === ARRAY) {
				//recursively flatten array
				for (var i = 0, len = data.length; i < len; i++) {
					if (type.call(data[i]) === ARRAY) {
						data = data.concat.apply([], data);
						i-- //check current index again and flatten until there are no more nested arrays at that index
					}
				}
				
				var nodes = [], intact = cached.length === data.length, subArrayCount = 0;
	
				//keys algorithm: sort elements without recreating them if keys are present
				//1) create a map of all existing keys, and mark all for deletion
				//2) add new keys to map and mark them for addition
				//3) if key exists in new list, change action from deletion to a move
				//4) for each key, handle its corresponding action as marked in previous steps
				//5) copy unkeyed items into their respective gaps
				var DELETION = 1, INSERTION = 2 , MOVE = 3;
				var existing = {}, unkeyed = [], shouldMaintainIdentities = false;
				for (var i = 0; i < cached.length; i++) {
					if (cached[i] && cached[i].attrs && cached[i].attrs.key != null) {
						shouldMaintainIdentities = true;
						existing[cached[i].attrs.key] = {action: DELETION, index: i}
					}
				}
				if (shouldMaintainIdentities) {
					if (data.indexOf(null) > -1) data = data.filter(function(x) {return x != null})
					
					var keysDiffer = false
					if (data.length != cached.length) keysDiffer = true
					else for (var i = 0, cachedCell, dataCell; cachedCell = cached[i], dataCell = data[i]; i++) {
						if (cachedCell.attrs && dataCell.attrs && cachedCell.attrs.key != dataCell.attrs.key) {
							keysDiffer = true
							break
						}
					}
					
					if (keysDiffer) {
						for (var i = 0, len = data.length; i < len; i++) {
							if (data[i] && data[i].attrs) {
								if (data[i].attrs.key != null) {
									var key = data[i].attrs.key;
									if (!existing[key]) existing[key] = {action: INSERTION, index: i};
									else existing[key] = {
										action: MOVE,
										index: i,
										from: existing[key].index,
										element: parentElement.childNodes[existing[key].index] || $document.createElement("div")
									}
								}
								else unkeyed.push({index: i, element: parentElement.childNodes[i] || $document.createElement("div")})
							}
						}
						var actions = []
						for (var prop in existing) actions.push(existing[prop])
						var changes = actions.sort(sortChanges);
						var newCached = new Array(cached.length)
	
						for (var i = 0, change; change = changes[i]; i++) {
							if (change.action === DELETION) {
								clear(cached[change.index].nodes, cached[change.index]);
								newCached.splice(change.index, 1)
							}
							if (change.action === INSERTION) {
								var dummy = $document.createElement("div");
								dummy.key = data[change.index].attrs.key;
								parentElement.insertBefore(dummy, parentElement.childNodes[change.index] || null);
								newCached.splice(change.index, 0, {attrs: {key: data[change.index].attrs.key}, nodes: [dummy]})
							}
	
							if (change.action === MOVE) {
								if (parentElement.childNodes[change.index] !== change.element && change.element !== null) {
									parentElement.insertBefore(change.element, parentElement.childNodes[change.index] || null)
								}
								newCached[change.index] = cached[change.from]
							}
						}
						for (var i = 0, len = unkeyed.length; i < len; i++) {
							var change = unkeyed[i];
							parentElement.insertBefore(change.element, parentElement.childNodes[change.index] || null);
							newCached[change.index] = cached[change.index]
						}
						cached = newCached;
						cached.nodes = new Array(parentElement.childNodes.length);
						for (var i = 0, child; child = parentElement.childNodes[i]; i++) cached.nodes[i] = child
					}
				}
				//end key algorithm
	
				for (var i = 0, cacheCount = 0, len = data.length; i < len; i++) {
					//diff each item in the array
					var item = build(parentElement, parentTag, cached, index, data[i], cached[cacheCount], shouldReattach, index + subArrayCount || subArrayCount, editable, namespace, configs);
					if (item === undefined) continue;
					if (!item.nodes.intact) intact = false;
					if (item.$trusted) {
						//fix offset of next element if item was a trusted string w/ more than one html element
						//the first clause in the regexp matches elements
						//the second clause (after the pipe) matches text nodes
						subArrayCount += (item.match(/<[^\/]|\>\s*[^<]/g) || []).length
					}
					else subArrayCount += type.call(item) === ARRAY ? item.length : 1;
					cached[cacheCount++] = item
				}
				if (!intact) {
					//diff the array itself
					
					//update the list of DOM nodes by collecting the nodes from each item
					for (var i = 0, len = data.length; i < len; i++) {
						if (cached[i] != null) nodes.push.apply(nodes, cached[i].nodes)
					}
					//remove items from the end of the array if the new array is shorter than the old one
					//if errors ever happen here, the issue is most likely a bug in the construction of the `cached` data structure somewhere earlier in the program
					for (var i = 0, node; node = cached.nodes[i]; i++) {
						if (node.parentNode != null && nodes.indexOf(node) < 0) clear([node], [cached[i]])
					}
					if (data.length < cached.length) cached.length = data.length;
					cached.nodes = nodes
				}
			}
			else if (data != null && dataType === OBJECT) {
				if (!data.attrs) data.attrs = {};
				if (!cached.attrs) cached.attrs = {};
	
				var dataAttrKeys = Object.keys(data.attrs)
				var hasKeys = dataAttrKeys.length > ("key" in data.attrs ? 1 : 0)
				//if an element is different enough from the one in cache, recreate it
				if (data.tag != cached.tag || dataAttrKeys.join() != Object.keys(cached.attrs).join() || data.attrs.id != cached.attrs.id) {
					if (cached.nodes.length) clear(cached.nodes);
					if (cached.configContext && typeof cached.configContext.onunload === FUNCTION) cached.configContext.onunload()
				}
				if (type.call(data.tag) != STRING) return;
	
				var node, isNew = cached.nodes.length === 0;
				if (data.attrs.xmlns) namespace = data.attrs.xmlns;
				else if (data.tag === "svg") namespace = "http://www.w3.org/2000/svg";
				else if (data.tag === "math") namespace = "http://www.w3.org/1998/Math/MathML";
				if (isNew) {
					if (data.attrs.is) node = namespace === undefined ? $document.createElement(data.tag, data.attrs.is) : $document.createElementNS(namespace, data.tag, data.attrs.is);
					else node = namespace === undefined ? $document.createElement(data.tag) : $document.createElementNS(namespace, data.tag);
					cached = {
						tag: data.tag,
						//set attributes first, then create children
						attrs: hasKeys ? setAttributes(node, data.tag, data.attrs, {}, namespace) : data.attrs,
						children: data.children != null && data.children.length > 0 ?
							build(node, data.tag, undefined, undefined, data.children, cached.children, true, 0, data.attrs.contenteditable ? node : editable, namespace, configs) :
							data.children,
						nodes: [node]
					};
					if (cached.children && !cached.children.nodes) cached.children.nodes = [];
					//edge case: setting value on <select> doesn't work before children exist, so set it again after children have been created
					if (data.tag === "select" && data.attrs.value) setAttributes(node, data.tag, {value: data.attrs.value}, {}, namespace);
					parentElement.insertBefore(node, parentElement.childNodes[index] || null)
				}
				else {
					node = cached.nodes[0];
					if (hasKeys) setAttributes(node, data.tag, data.attrs, cached.attrs, namespace);
					cached.children = build(node, data.tag, undefined, undefined, data.children, cached.children, false, 0, data.attrs.contenteditable ? node : editable, namespace, configs);
					cached.nodes.intact = true;
					if (shouldReattach === true && node != null) parentElement.insertBefore(node, parentElement.childNodes[index] || null)
				}
				//schedule configs to be called. They are called after `build` finishes running
				if (typeof data.attrs["config"] === FUNCTION) {
					var context = cached.configContext = cached.configContext || {};
	
					// bind
					var callback = function(data, args) {
						return function() {
							return data.attrs["config"].apply(data, args)
						}
					};
					configs.push(callback(data, [node, !isNew, context, cached]))
				}
			}
			else if (typeof dataType != FUNCTION) {
				//handle text nodes
				var nodes;
				if (cached.nodes.length === 0) {
					if (data.$trusted) {
						nodes = injectHTML(parentElement, index, data)
					}
					else {
						nodes = [$document.createTextNode(data)];
						if (!parentElement.nodeName.match(voidElements)) parentElement.insertBefore(nodes[0], parentElement.childNodes[index] || null)
					}
					cached = "string number boolean".indexOf(typeof data) > -1 ? new data.constructor(data) : data;
					cached.nodes = nodes
				}
				else if (cached.valueOf() !== data.valueOf() || shouldReattach === true) {
					nodes = cached.nodes;
					if (!editable || editable !== $document.activeElement) {
						if (data.$trusted) {
							clear(nodes, cached);
							nodes = injectHTML(parentElement, index, data)
						}
						else {
							//corner case: replacing the nodeValue of a text node that is a child of a textarea/contenteditable doesn't work
							//we need to update the value property of the parent textarea or the innerHTML of the contenteditable element instead
							if (parentTag === "textarea") parentElement.value = data;
							else if (editable) editable.innerHTML = data;
							else {
								if (nodes[0].nodeType === 1 || nodes.length > 1) { //was a trusted string
									clear(cached.nodes, cached);
									nodes = [$document.createTextNode(data)]
								}
								parentElement.insertBefore(nodes[0], parentElement.childNodes[index] || null);
								nodes[0].nodeValue = data
							}
						}
					}
					cached = new data.constructor(data);
					cached.nodes = nodes
				}
				else cached.nodes.intact = true
			}
	
			return cached
		}
		function sortChanges(a, b) {return a.action - b.action || a.index - b.index}
		function setAttributes(node, tag, dataAttrs, cachedAttrs, namespace) {
			for (var attrName in dataAttrs) {
				var dataAttr = dataAttrs[attrName];
				var cachedAttr = cachedAttrs[attrName];
				if (!(attrName in cachedAttrs) || (cachedAttr !== dataAttr)) {
					cachedAttrs[attrName] = dataAttr;
					try {
						//`config` isn't a real attributes, so ignore it
						if (attrName === "config" || attrName == "key") continue;
						//hook event handlers to the auto-redrawing system
						else if (typeof dataAttr === FUNCTION && attrName.indexOf("on") === 0) {
							node[attrName] = autoredraw(dataAttr, node)
						}
						//handle `style: {...}`
						else if (attrName === "style" && dataAttr != null && type.call(dataAttr) === OBJECT) {
							for (var rule in dataAttr) {
								if (cachedAttr == null || cachedAttr[rule] !== dataAttr[rule]) node.style[rule] = dataAttr[rule]
							}
							for (var rule in cachedAttr) {
								if (!(rule in dataAttr)) node.style[rule] = ""
							}
						}
						//handle SVG
						else if (namespace != null) {
							if (attrName === "href") node.setAttributeNS("http://www.w3.org/1999/xlink", "href", dataAttr);
							else if (attrName === "className") node.setAttribute("class", dataAttr);
							else node.setAttribute(attrName, dataAttr)
						}
						//handle cases that are properties (but ignore cases where we should use setAttribute instead)
						//- list and form are typically used as strings, but are DOM element references in js
						//- when using CSS selectors (e.g. `m("[style='']")`), style is used as a string, but it's an object in js
						else if (attrName in node && !(attrName === "list" || attrName === "style" || attrName === "form" || attrName === "type")) {
							//#348 don't set the value if not needed otherwise cursor placement breaks in Chrome
							if (tag !== "input" || node[attrName] !== dataAttr) node[attrName] = dataAttr
						}
						else node.setAttribute(attrName, dataAttr)
					}
					catch (e) {
						//swallow IE's invalid argument errors to mimic HTML's fallback-to-doing-nothing-on-invalid-attributes behavior
						if (e.message.indexOf("Invalid argument") < 0) throw e
					}
				}
				//#348 dataAttr may not be a string, so use loose comparison (double equal) instead of strict (triple equal)
				else if (attrName === "value" && tag === "input" && node.value != dataAttr) {
					node.value = dataAttr
				}
			}
			return cachedAttrs
		}
		function clear(nodes, cached) {
			for (var i = nodes.length - 1; i > -1; i--) {
				if (nodes[i] && nodes[i].parentNode) {
					try {nodes[i].parentNode.removeChild(nodes[i])}
					catch (e) {} //ignore if this fails due to order of events (see http://stackoverflow.com/questions/21926083/failed-to-execute-removechild-on-node)
					cached = [].concat(cached);
					if (cached[i]) unload(cached[i])
				}
			}
			if (nodes.length != 0) nodes.length = 0
		}
		function unload(cached) {
			if (cached.configContext && typeof cached.configContext.onunload === FUNCTION) cached.configContext.onunload();
			if (cached.children) {
				if (type.call(cached.children) === ARRAY) {
					for (var i = 0, child; child = cached.children[i]; i++) unload(child)
				}
				else if (cached.children.tag) unload(cached.children)
			}
		}
		function injectHTML(parentElement, index, data) {
			var nextSibling = parentElement.childNodes[index];
			if (nextSibling) {
				var isElement = nextSibling.nodeType != 1;
				var placeholder = $document.createElement("span");
				if (isElement) {
					parentElement.insertBefore(placeholder, nextSibling || null);
					placeholder.insertAdjacentHTML("beforebegin", data);
					parentElement.removeChild(placeholder)
				}
				else nextSibling.insertAdjacentHTML("beforebegin", data)
			}
			else parentElement.insertAdjacentHTML("beforeend", data);
			var nodes = [];
			while (parentElement.childNodes[index] !== nextSibling) {
				nodes.push(parentElement.childNodes[index]);
				index++
			}
			return nodes
		}
		function autoredraw(callback, object) {
			return function(e) {
				e = e || event;
				m.redraw.strategy("diff");
				m.startComputation();
				try {return callback.call(object, e)}
				finally {
					endFirstComputation()
				}
			}
		}
	
		var html;
		var documentNode = {
			appendChild: function(node) {
				if (html === undefined) html = $document.createElement("html");
				if ($document.documentElement && $document.documentElement !== node) {
					$document.replaceChild(node, $document.documentElement)
				}
				else $document.appendChild(node);
				this.childNodes = $document.childNodes
			},
			insertBefore: function(node) {
				this.appendChild(node)
			},
			childNodes: []
		};
		var nodeCache = [], cellCache = {};
		m.render = function(root, cell, forceRecreation) {
			var configs = [];
			if (!root) throw new Error("Please ensure the DOM element exists before rendering a template into it.");
			var id = getCellCacheKey(root);
			var isDocumentRoot = root === $document;
			var node = isDocumentRoot || root === $document.documentElement ? documentNode : root;
			if (isDocumentRoot && cell.tag != "html") cell = {tag: "html", attrs: {}, children: cell};
			if (cellCache[id] === undefined) clear(node.childNodes);
			if (forceRecreation === true) reset(root);
			cellCache[id] = build(node, null, undefined, undefined, cell, cellCache[id], false, 0, null, undefined, configs);
			for (var i = 0, len = configs.length; i < len; i++) configs[i]()
		};
		function getCellCacheKey(element) {
			var index = nodeCache.indexOf(element);
			return index < 0 ? nodeCache.push(element) - 1 : index
		}
	
		m.trust = function(value) {
			value = new String(value);
			value.$trusted = true;
			return value
		};
	
		function gettersetter(store) {
			var prop = function() {
				if (arguments.length) store = arguments[0];
				return store
			};
	
			prop.toJSON = function() {
				return store
			};
	
			return prop
		}
	
		m.prop = function (store) {
			//note: using non-strict equality check here because we're checking if store is null OR undefined
			if (((store != null && type.call(store) === OBJECT) || typeof store === FUNCTION) && typeof store.then === FUNCTION) {
				return propify(store)
			}
	
			return gettersetter(store)
		};
	
		var roots = [], modules = [], controllers = [], lastRedrawId = null, lastRedrawCallTime = 0, computePostRedrawHook = null, prevented = false, topModule;
		var FRAME_BUDGET = 16; //60 frames per second = 1 call per 16 ms
		m.module = function(root, module) {
			if (!root) throw new Error("Please ensure the DOM element exists before rendering a template into it.");
			var index = roots.indexOf(root);
			if (index < 0) index = roots.length;
			var isPrevented = false;
			if (controllers[index] && typeof controllers[index].onunload === FUNCTION) {
				var event = {
					preventDefault: function() {isPrevented = true}
				};
				controllers[index].onunload(event)
			}
			if (!isPrevented) {
				m.redraw.strategy("all");
				m.startComputation();
				roots[index] = root;
				var currentModule = topModule = module;
				var controller = new module.controller;
				//controllers may call m.module recursively (via m.route redirects, for example)
				//this conditional ensures only the last recursive m.module call is applied
				if (currentModule === topModule) {
					controllers[index] = controller;
					modules[index] = module
				}
				endFirstComputation();
				return controllers[index]
			}
		};
		m.redraw = function(force) {
			//lastRedrawId is a positive number if a second redraw is requested before the next animation frame
			//lastRedrawID is null if it's the first redraw and not an event handler
			if (lastRedrawId && force !== true) {
				//when setTimeout: only reschedule redraw if time between now and previous redraw is bigger than a frame, otherwise keep currently scheduled timeout
				//when rAF: always reschedule redraw
				if (new Date - lastRedrawCallTime > FRAME_BUDGET || $requestAnimationFrame === window.requestAnimationFrame) {
					if (lastRedrawId > 0) $cancelAnimationFrame(lastRedrawId);
					lastRedrawId = $requestAnimationFrame(redraw, FRAME_BUDGET)
				}
			}
			else {
				redraw();
				lastRedrawId = $requestAnimationFrame(function() {lastRedrawId = null}, FRAME_BUDGET)
			}
		};
		m.redraw.strategy = m.prop();
		function redraw() {
			var forceRedraw = m.redraw.strategy() === "all";
			for (var i = 0, root; root = roots[i]; i++) {
				if (controllers[i]) {
					m.render(root, modules[i].view(controllers[i]), forceRedraw)
				}
			}
			//after rendering within a routed context, we need to scroll back to the top, and fetch the document title for history.pushState
			if (computePostRedrawHook) {
				computePostRedrawHook();
				computePostRedrawHook = null
			}
			lastRedrawId = null;
			lastRedrawCallTime = new Date;
			m.redraw.strategy("diff")
		}
	
		var pendingRequests = 0;
		m.startComputation = function() {pendingRequests++};
		m.endComputation = function() {
			pendingRequests = Math.max(pendingRequests - 1, 0);
			if (pendingRequests === 0) m.redraw()
		};
		var endFirstComputation = function() {
			if (m.redraw.strategy() == "none") {
				pendingRequests--
				m.redraw.strategy("diff")
			}
			else m.endComputation();
		}
	
		m.withAttr = function(prop, withAttrCallback) {
			return function(e) {
				e = e || event;
				var currentTarget = e.currentTarget || this;
				withAttrCallback(prop in currentTarget ? currentTarget[prop] : currentTarget.getAttribute(prop))
			}
		};
	
		//routing
		var modes = {pathname: "", hash: "#", search: "?"};
		var redirect = function() {}, routeParams, currentRoute;
		m.route = function() {
			//m.route()
			if (arguments.length === 0) return currentRoute;
			//m.route(el, defaultRoute, routes)
			else if (arguments.length === 3 && type.call(arguments[1]) === STRING) {
				var root = arguments[0], defaultRoute = arguments[1], router = arguments[2];
				redirect = function(source) {
					var path = currentRoute = normalizeRoute(source);
					if (!routeByValue(root, router, path)) {
						m.route(defaultRoute, true)
					}
				};
				var listener = m.route.mode === "hash" ? "onhashchange" : "onpopstate";
				window[listener] = function() {
					if (currentRoute != normalizeRoute($location[m.route.mode])) {
						redirect($location[m.route.mode])
					}
				};
				computePostRedrawHook = setScroll;
				window[listener]()
			}
			//config: m.route
			else if (arguments[0].addEventListener) {
				var element = arguments[0];
				var isInitialized = arguments[1];
				var context = arguments[2];
				element.href = (m.route.mode !== 'pathname' ? $location.pathname : '') + modes[m.route.mode] + this.attrs.href;
				element.removeEventListener("click", routeUnobtrusive);
				element.addEventListener("click", routeUnobtrusive)
			}
			//m.route(route, params)
			else if (type.call(arguments[0]) === STRING) {
				currentRoute = arguments[0];
				var args = arguments[1] || {}
				var queryIndex = currentRoute.indexOf("?")
				var params = queryIndex > -1 ? parseQueryString(currentRoute.slice(queryIndex + 1)) : {}
				for (var i in args) params[i] = args[i]
				var querystring = buildQueryString(params)
				var currentPath = queryIndex > -1 ? currentRoute.slice(0, queryIndex) : currentRoute
				if (querystring) currentRoute = currentPath + (currentPath.indexOf("?") === -1 ? "?" : "&") + querystring;
	
				var shouldReplaceHistoryEntry = (arguments.length === 3 ? arguments[2] : arguments[1]) === true;
	
				if (window.history.pushState) {
					computePostRedrawHook = function() {
						window.history[shouldReplaceHistoryEntry ? "replaceState" : "pushState"](null, $document.title, modes[m.route.mode] + currentRoute);
						setScroll()
					};
					redirect(modes[m.route.mode] + currentRoute)
				}
				else $location[m.route.mode] = currentRoute
			}
		};
		m.route.param = function(key) {
			if (!routeParams) throw new Error("You must call m.route(element, defaultRoute, routes) before calling m.route.param()")
			return routeParams[key]
		};
		m.route.mode = "search";
		function normalizeRoute(route) {return route.slice(modes[m.route.mode].length)}
		function routeByValue(root, router, path) {
			routeParams = {};
	
			var queryStart = path.indexOf("?");
			if (queryStart !== -1) {
				routeParams = parseQueryString(path.substr(queryStart + 1, path.length));
				path = path.substr(0, queryStart)
			}
	
			for (var route in router) {
				if (route === path) {
					m.module(root, router[route]);
					return true
				}
	
				var matcher = new RegExp("^" + route.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$");
	
				if (matcher.test(path)) {
					path.replace(matcher, function() {
						var keys = route.match(/:[^\/]+/g) || [];
						var values = [].slice.call(arguments, 1, -2);
						for (var i = 0, len = keys.length; i < len; i++) routeParams[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
						m.module(root, router[route])
					});
					return true
				}
			}
		}
		function routeUnobtrusive(e) {
			e = e || event;
			if (e.ctrlKey || e.metaKey || e.which === 2) return;
			if (e.preventDefault) e.preventDefault();
			else e.returnValue = false;
			var currentTarget = e.currentTarget || this;
			var args = m.route.mode === "pathname" && currentTarget.search ? parseQueryString(currentTarget.search.slice(1)) : {};
			m.route(currentTarget[m.route.mode].slice(modes[m.route.mode].length), args)
		}
		function setScroll() {
			if (m.route.mode != "hash" && $location.hash) $location.hash = $location.hash;
			else window.scrollTo(0, 0)
		}
		function buildQueryString(object, prefix) {
			var str = [];
			for(var prop in object) {
				var key = prefix ? prefix + "[" + prop + "]" : prop, value = object[prop];
				str.push(value != null && type.call(value) === OBJECT ? buildQueryString(value, key) : encodeURIComponent(key) + "=" + encodeURIComponent(value))
			}
			return str.join("&")
		}
		function parseQueryString(str) {
			var pairs = str.split("&"), params = {};
			for (var i = 0, len = pairs.length; i < len; i++) {
				var pair = pairs[i].split("=");
				params[decodeSpace(pair[0])] = pair[1] ? decodeSpace(pair[1]) : ""
			}
			return params
		}
		function decodeSpace(string) {
			return decodeURIComponent(string.replace(/\+/g, " "))
		}
		function reset(root) {
			var cacheKey = getCellCacheKey(root);
			clear(root.childNodes, cellCache[cacheKey]);
			cellCache[cacheKey] = undefined
		}
	
		m.deferred = function () {
			var deferred = new Deferred();
			deferred.promise = propify(deferred.promise);
			return deferred
		};
		function propify(promise) {
			var prop = m.prop();
			promise.then(prop);
			prop.then = function(resolve, reject) {
				return propify(promise.then(resolve, reject))
			};
			return prop
		}
		//Promiz.mithril.js | Zolmeister | MIT
		//a modified version of Promiz.js, which does not conform to Promises/A+ for two reasons:
		//1) `then` callbacks are called synchronously (because setTimeout is too slow, and the setImmediate polyfill is too big
		//2) throwing subclasses of Error cause the error to be bubbled up instead of triggering rejection (because the spec does not account for the important use case of default browser error handling, i.e. message w/ line number)
		function Deferred(successCallback, failureCallback) {
			var RESOLVING = 1, REJECTING = 2, RESOLVED = 3, REJECTED = 4;
			var self = this, state = 0, promiseValue = 0, next = [];
	
			self["promise"] = {};
	
			self["resolve"] = function(value) {
				if (!state) {
					promiseValue = value;
					state = RESOLVING;
	
					fire()
				}
				return this
			};
	
			self["reject"] = function(value) {
				if (!state) {
					promiseValue = value;
					state = REJECTING;
	
					fire()
				}
				return this
			};
	
			self.promise["then"] = function(successCallback, failureCallback) {
				var deferred = new Deferred(successCallback, failureCallback);
				if (state === RESOLVED) {
					deferred.resolve(promiseValue)
				}
				else if (state === REJECTED) {
					deferred.reject(promiseValue)
				}
				else {
					next.push(deferred)
				}
				return deferred.promise
			};
	
			function finish(type) {
				state = type || REJECTED;
				next.map(function(deferred) {
					state === RESOLVED && deferred.resolve(promiseValue) || deferred.reject(promiseValue)
				})
			}
	
			function thennable(then, successCallback, failureCallback, notThennableCallback) {
				if (((promiseValue != null && type.call(promiseValue) === OBJECT) || typeof promiseValue === FUNCTION) && typeof then === FUNCTION) {
					try {
						// count protects against abuse calls from spec checker
						var count = 0;
						then.call(promiseValue, function(value) {
							if (count++) return;
							promiseValue = value;
							successCallback()
						}, function (value) {
							if (count++) return;
							promiseValue = value;
							failureCallback()
						})
					}
					catch (e) {
						m.deferred.onerror(e);
						promiseValue = e;
						failureCallback()
					}
				} else {
					notThennableCallback()
				}
			}
	
			function fire() {
				// check if it's a thenable
				var then;
				try {
					then = promiseValue && promiseValue.then
				}
				catch (e) {
					m.deferred.onerror(e);
					promiseValue = e;
					state = REJECTING;
					return fire()
				}
				thennable(then, function() {
					state = RESOLVING;
					fire()
				}, function() {
					state = REJECTING;
					fire()
				}, function() {
					try {
						if (state === RESOLVING && typeof successCallback === FUNCTION) {
							promiseValue = successCallback(promiseValue)
						}
						else if (state === REJECTING && typeof failureCallback === "function") {
							promiseValue = failureCallback(promiseValue);
							state = RESOLVING
						}
					}
					catch (e) {
						m.deferred.onerror(e);
						promiseValue = e;
						return finish()
					}
	
					if (promiseValue === self) {
						promiseValue = TypeError();
						finish()
					}
					else {
						thennable(then, function () {
							finish(RESOLVED)
						}, finish, function () {
							finish(state === RESOLVING && RESOLVED)
						})
					}
				})
			}
		}
		m.deferred.onerror = function(e) {
			if (type.call(e) === "[object Error]" && !e.constructor.toString().match(/ Error/)) throw e
		};
	
		m.sync = function(args) {
			var method = "resolve";
			function synchronizer(pos, resolved) {
				return function(value) {
					results[pos] = value;
					if (!resolved) method = "reject";
					if (--outstanding === 0) {
						deferred.promise(results);
						deferred[method](results)
					}
					return value
				}
			}
	
			var deferred = m.deferred();
			var outstanding = args.length;
			var results = new Array(outstanding);
			if (args.length > 0) {
				for (var i = 0; i < args.length; i++) {
					args[i].then(synchronizer(i, true), synchronizer(i, false))
				}
			}
			else deferred.resolve([]);
	
			return deferred.promise
		};
		function identity(value) {return value}
	
		function ajax(options) {
			if (options.dataType && options.dataType.toLowerCase() === "jsonp") {
				var callbackKey = "mithril_callback_" + new Date().getTime() + "_" + (Math.round(Math.random() * 1e16)).toString(36);
				var script = $document.createElement("script");
	
				window[callbackKey] = function(resp) {
					$document.body.removeChild(script);
					options.onload({
						type: "load",
						target: {
							responseText: resp
						}
					});
					window[callbackKey] = undefined
				};
	
				script.onerror = function(e) {
					$document.body.removeChild(script);
	
					options.onerror({
						type: "error",
						target: {
							status: 500,
							responseText: JSON.stringify({error: "Error making jsonp request"})
						}
					});
					window[callbackKey] = undefined;
	
					return false
				};
	
				script.onload = function(e) {
					return false
				};
	
				script.src = options.url
					+ (options.url.indexOf("?") > 0 ? "&" : "?")
					+ (options.callbackKey ? options.callbackKey : "callback")
					+ "=" + callbackKey
					+ "&" + buildQueryString(options.data || {});
				$document.body.appendChild(script)
			}
			else {
				var xhr = new window.XMLHttpRequest;
				xhr.open(options.method, options.url, true, options.user, options.password);
				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4) {
						if (xhr.status >= 200 && xhr.status < 300) options.onload({type: "load", target: xhr});
						else options.onerror({type: "error", target: xhr})
					}
				};
				if (options.serialize === JSON.stringify && options.data && options.method !== "GET") {
					xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
				}
				if (options.deserialize === JSON.parse) {
					xhr.setRequestHeader("Accept", "application/json, text/*");
				}
				if (typeof options.config === FUNCTION) {
					var maybeXhr = options.config(xhr, options);
					if (maybeXhr != null) xhr = maybeXhr
				}
	
				var data = options.method === "GET" || !options.data ? "" : options.data
				if (data && (type.call(data) != STRING && data.constructor != window.FormData)) {
					throw "Request data should be either be a string or FormData. Check the `serialize` option in `m.request`";
				}
				xhr.send(data);
				return xhr
			}
		}
		function bindData(xhrOptions, data, serialize) {
			if (xhrOptions.method === "GET" && xhrOptions.dataType != "jsonp") {
				var prefix = xhrOptions.url.indexOf("?") < 0 ? "?" : "&";
				var querystring = buildQueryString(data);
				xhrOptions.url = xhrOptions.url + (querystring ? prefix + querystring : "")
			}
			else xhrOptions.data = serialize(data);
			return xhrOptions
		}
		function parameterizeUrl(url, data) {
			var tokens = url.match(/:[a-z]\w+/gi);
			if (tokens && data) {
				for (var i = 0; i < tokens.length; i++) {
					var key = tokens[i].slice(1);
					url = url.replace(tokens[i], data[key]);
					delete data[key]
				}
			}
			return url
		}
	
		m.request = function(xhrOptions) {
			if (xhrOptions.background !== true) m.startComputation();
			var deferred = m.deferred();
			var isJSONP = xhrOptions.dataType && xhrOptions.dataType.toLowerCase() === "jsonp";
			var serialize = xhrOptions.serialize = isJSONP ? identity : xhrOptions.serialize || JSON.stringify;
			var deserialize = xhrOptions.deserialize = isJSONP ? identity : xhrOptions.deserialize || JSON.parse;
			var extract = xhrOptions.extract || function(xhr) {
				return xhr.responseText.length === 0 && deserialize === JSON.parse ? null : xhr.responseText
			};
			xhrOptions.url = parameterizeUrl(xhrOptions.url, xhrOptions.data);
			xhrOptions = bindData(xhrOptions, xhrOptions.data, serialize);
			xhrOptions.onload = xhrOptions.onerror = function(e) {
				try {
					e = e || event;
					var unwrap = (e.type === "load" ? xhrOptions.unwrapSuccess : xhrOptions.unwrapError) || identity;
					var response = unwrap(deserialize(extract(e.target, xhrOptions)));
					if (e.type === "load") {
						if (type.call(response) === ARRAY && xhrOptions.type) {
							for (var i = 0; i < response.length; i++) response[i] = new xhrOptions.type(response[i])
						}
						else if (xhrOptions.type) response = new xhrOptions.type(response)
					}
					deferred[e.type === "load" ? "resolve" : "reject"](response)
				}
				catch (e) {
					m.deferred.onerror(e);
					deferred.reject(e)
				}
				if (xhrOptions.background !== true) m.endComputation()
			};
			ajax(xhrOptions);
			deferred.promise(xhrOptions.initialValue);
			return deferred.promise
		};
	
		//testing API
		m.deps = function(mock) {
			initialize(window = mock || window);
			return window;
		};
		//for internal testing only, do not use `m.deps.factory`
		m.deps.factory = app;
	
		return m
	})(typeof window != "undefined" ? window : {});
	
	if (typeof module != "undefined" && module !== null && module.exports) module.exports = m;
	else if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {return m}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)(module)))

/***/ }
/******/ ])
//# sourceMappingURL=chronos.js.map