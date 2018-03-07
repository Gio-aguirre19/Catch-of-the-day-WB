import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // New way to make refs
  formInput = React.createRef();

  // This syntex is so contructors and binding is not needed
  goToStore = (e) => {
    e.preventDefault();
    console.log(this)
  }

  render(){
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref={this.formInput} required defaultValue={getFunName()} />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

export default StorePicker;
