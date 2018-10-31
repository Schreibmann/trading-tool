import React, { Component } from 'react';

class Balance extends Component {

	constructor(props) {

    super(props);

}

componentWillMount() {
  console.log("Balance.jsx will mount");
}

  render() {

    let balanceData = данные из апи.map( (val, key) => <BalanceItem data={val} key={key}/> );

    return (



    );
  }
}

export default App;
