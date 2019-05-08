import React, {Component} from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import Stickyfill from 'stickyfilljs-fork/dist/stickyfill.es6';

export default class Sticker extends Component {
	static propTypes = {
		forcePolyfill: PropTypes.bool,
		scrollContainer: PropTypes.string,
		children: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.func
		])
	};

	constructor(props) {
		super(props);

		console.log(props.scrollContainer);
		this.state = {
			isSticky: false
		};
	}

	sticky(stick) {
		Stickyfill.add(stick);
		this.setState({
			isSticky: true
		});
	}

	unsticky(stick) {
		Stickyfill.remove(stick);
		this.setState({
			isSticky: false
		});
	}

	componentDidMount(){
		const {
			scrollContainerSelector = null,
			forcePolyfill = false,
		} = this.props;

		this.stick = ReactDOM.findDOMNode(this);

		const scrollContainer = document.querySelector(scrollContainerSelector);

		if (scrollContainer) {
			createScrollable(scrollContainer);
			const offset = getOffsetTop(scrollContainer);

			Stickyfill.setTopOffset(offset);
			Stickyfill.setScrollContainer(scrollContainer);
		}

		if (forcePolyfill) {
			Stickyfill.forceSticky();
		}

		this.sticky(this.stick);
	}

	componentWillUnmount() {
		this.unsticky(this.stick);
	}

	render() {
		let { children, ...otherProps } = this.props;

		return typeof children.type === "function" ? React.cloneElement(this.props.children, { ...otherProps }) : children;
	}

}

function createScrollable(el) {
	if (!el) {
		return;
	}

	if (el.pageYOffset && el.pageXOffset) {
		Object.defineProperty(el, 'scrollTop', {
			get() {
				return this.pageYOffset;
			}
		});

		Object.defineProperty(el, 'scrollLeft', {
			get() {
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
