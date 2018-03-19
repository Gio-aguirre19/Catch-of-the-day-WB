import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

export default class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }

  // New way to make refs
  formInput = React.createRef();

  // This syntex is so contructors and binding is not needed
  goToStore = (e) => {
    e.preventDefault();
    // Grab what's inside input
    const storeName = this.formInput.value.value;
    // Check component props for history (for react router) in plug in
    this.props.history.push(`/store/${storeName}`)
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
