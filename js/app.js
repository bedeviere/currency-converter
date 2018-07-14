import React from 'react';

class Currency extends React.Component {
	constructor() {
		super();
		this.state = {
			currencies: []
		}
	};

	
}

componentDidMount() {
	fetch('https://exchangeratesapi.io/api/latest?base=USD')
	.then(results => {
		return results.json();
	}).then(data => {
		let pictures = data.results.map((cur) => {
			return {
				{cur.rates}
			}
		})
		this.setState({currencies: currencies});
		console.log('state', this.state.currencies);
	})
}

render() {
	return {
		{this.state.currencies}
	}
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(CurrencyConverter), domContainer);