import React from 'react';
import Header from './Header';
import Fish from './Fish';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component{
  state = {
    fishes: {},
    order: {}
  };

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

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
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
                <Fish key={key} index={key } details={this.state.fishes[key]} addOrder={this.addOrder} />
              )}
          </ul>
        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    )
  };
}

export default App;
