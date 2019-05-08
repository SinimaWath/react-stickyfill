import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Sticker from '../../lib/';

class Comp extends Component {
	render() {
		return (
			<div className={this.props.className}>Sticky Component </div>
		)
	}
}

class App extends Component {
	static defaultProps = {
		media: "(max-width: 767px) and (orientation: portrait), (max-width: 1023px) and (orientation: landscape)"
	};
	constructor(props) {
		super(props);
		this.state = {
			stickerActive: false,
			height: false
		};

		this.myRef = React.createRef();
	}

	componentDidMount() {
		this.cont = document.querySelector('.overlay');
		console.log(this.cont);
	}

	render() {
		return (
			<React.Fragment>
				<div className={'header'}/>
				<div className={'overlay'} ref={this.myRef}>
					<div className={'block'}/>
					<div className={'list'}>
						<Sticker
							forcePolyfill={true}
							scrollContainer={'.overlay'}
						>
							<div className={'sticky'}/>
						</Sticker>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

if(typeof document !== 'undefined') {
	ReactDOM.render(
		(
			<App />
		),
		document.getElementById('app')
	);
}
