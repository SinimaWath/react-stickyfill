import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Sticker from '../../dist/bundle';

class Comp extends Component {
	render() {
		return (
			<div className={this.props.className}>Sticky Component </div>
		)
	}
}

class App extends Component {
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
			<div className="root">
				<div className="section before">
					<h2>Scroll down</h2>
				</div>
				<div className="section parent cf">
					<Sticker>
						<div className="child">
							<h2>Sticky box</h2>
						</div>
					</Sticker>
				</div>
			</div>
		)
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
