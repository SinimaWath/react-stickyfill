"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _stickyfill = require("stickyfilljs-fork/dist/stickyfill.es6");

var _stickyfill2 = _interopRequireDefault(_stickyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sticker = function (_Component) {
	_inherits(Sticker, _Component);

	function Sticker(props) {
		_classCallCheck(this, Sticker);

		var _this = _possibleConstructorReturn(this, (Sticker.__proto__ || Object.getPrototypeOf(Sticker)).call(this, props));

		console.log(props.scrollContainer);
		_this.state = {
			isSticky: false
		};
		return _this;
	}

	_createClass(Sticker, [{
		key: "sticky",
		value: function sticky(stick) {
			_stickyfill2.default.add(stick);
			this.setState({
				isSticky: true
			});
		}
	}, {
		key: "unsticky",
		value: function unsticky(stick) {
			_stickyfill2.default.remove(stick);
			this.setState({
				isSticky: false
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _props = this.props,
			    _props$scrollContaine = _props.scrollContainerSelector,
			    scrollContainerSelector = _props$scrollContaine === undefined ? null : _props$scrollContaine,
			    _props$forcePolyfill = _props.forcePolyfill,
			    forcePolyfill = _props$forcePolyfill === undefined ? false : _props$forcePolyfill;


			this.stick = _reactDom2.default.findDOMNode(this);

			var scrollContainer = document.querySelector(scrollContainerSelector);

			if (scrollContainer) {
				createScrollable(scrollContainer);
				var offset = getOffsetTop(scrollContainer);

				_stickyfill2.default.setTopOffset(offset);
				_stickyfill2.default.setScrollContainer(scrollContainer);
			}

			if (forcePolyfill) {
				_stickyfill2.default.forceSticky();
			}

			this.sticky(this.stick);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.unsticky(this.stick);
		}
	}, {
		key: "render",
		value: function render() {
			var _props2 = this.props,
			    children = _props2.children,
			    otherProps = _objectWithoutProperties(_props2, ["children"]);

			return typeof children.type === "function" ? _react2.default.cloneElement(this.props.children, _extends({}, otherProps)) : children;
		}
	}]);

	return Sticker;
}(_react.Component);

Sticker.propTypes = {
	forcePolyfill: _propTypes2.default.bool,
	scrollContainer: _propTypes2.default.string,
	children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func])
};
exports.default = Sticker;


function createScrollable(el) {
	if (!el) {
		return;
	}

	if (el.pageYOffset && el.pageXOffset) {
		Object.defineProperty(el, 'scrollTop', {
			get: function get() {
				return this.pageYOffset;
			}
		});

		Object.defineProperty(el, 'scrollLeft', {
			get: function get() {
				return this.pageXOffset;
			}
		});
	}
}

function getOffsetTop(el) {
	if (el && (el.offsetTop || el.offsetTop === 0)) {
		return el.offsetTop;
	}
}