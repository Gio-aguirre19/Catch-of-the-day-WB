import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import {firebaseApp} from '../base'
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';

export default class Inventory extends React.Component{
  static propTypes = {
    fish: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  }

  authHandler = async (authData) => {
    console.log(authData);
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler) ;
  }

  render(){
    return <Login authenticate={this.authenticate} />
    return(
      <div className="inventory">
        <h2>Inventory</h2>
        {Object.keys(this.props.fish).map(key =>
          <EditFishForm key={key} index={key} fish={this.props.fish[key]} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish} />)
        }
        {/* Passing prop "addfish" from parent element to form component */}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Fish Samples</button>
      </div>
    )
  }
}
