import React, { Component } from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import { withRouter } from 'react-router-dom';
import SubscriptionComponent from '../../components/Subscription/Subscription';
import Classes from '../PlayerAndCorousel/views/ClasslistView/ClasslistView';


class OnDemandPage extends Component {

  render() {
    return (
        <div className="App">
        <Classes/> 
                 {/* {this.props.location.pathname !== '/ondemand/player' &&    
                         <SubscriptionComponent></SubscriptionComponent>
                 } */}
        </div>
    );
  }
}

export default withRouter(OnDemandPage);
