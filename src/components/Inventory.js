import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component{
  render(){
    return(
      <div className="inventory">
        <h2>Inventory</h2>
        {/* Passing prop "addfish" from parent element to form component */}
        <AddFishForm addFish={this.props.addFish} />
      </div>
    )
  }
}

export default Inventory;
