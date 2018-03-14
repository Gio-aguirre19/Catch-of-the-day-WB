import React from 'react';
import Header from './Header';
import Fish from './Fish';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component{
  // glamorous-long-men
  state = {
    fishes: {},
    order: {}
  };

  // The seconds the site is loaded (lesson 18)
  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef){
      this.setState({order: JSON.parse(localStorageRef)})
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    )
  }

  // When you disconnect from this page (Memory leaks)
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // Take copy of state
    const fishesCopy = {...this.state.fishes};
    // Add new fish to fishes variable
    fishesCopy[`fish${Date.now()}`] = fish;
    // Set new fishes object to state
    this.setState({
      fishes: fishesCopy
    })
  };

  updateFish = (key, updateFish) => {
    const fishesCopy = {...this.state.fishes};
    fishesCopy[key] = updateFish;
    this.setState({fishes: fishesCopy});
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  deleteFish = (key) => {
    const fishesCopy = {...this.state.fishes};
    fishesCopy[key] = null;
    this.setState({fishes: fishesCopy});
  }

  addOrder = (key) => {
    // Take copy of state
    const orderCopy = {...this.state.order};
    // Add new fish to fishes variable
    orderCopy[key] = orderCopy[key] + 1 || 1;
    // Set new fishes object to state
    this.setState({order: orderCopy})
  }

  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes)
              .map(key =>
                <Fish key={key} index={key} details={this.state.fishes[key]} addOrder={this.addOrder} />
              )}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          deleteFish={this.deleteFish}
          fish={this.state.fishes}
        />
      </div>
    )
  };
}

export default App;
