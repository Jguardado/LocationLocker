import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import scriptLoader from 'react-async-script-loader';

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { value: '' };

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.geocoder = null


  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        console.log('script loaded succesfully', window.google.maps)
        this.setState({ geocoder: new window.google.maps.Geocoder() })
        console.log('what is this.geocoder? ', this.geocoder)
      }
      else this.props.onError()
    }
  }

  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }

  handleSubmit(event) {
    event.preventDefault();
    let options = {
      username: event.target.username.value,
      state: event.target.state.value,
      zipcode: event.target.zipcode.value,
      city: event.target.city.value,
      address: event.target.address.value
    }

    const { address, city, state, zipcode, username } = options
    let results;
    // WORKS commented out to preserve API calls
    // this.state.geocoder.geocode({ address: address + ' ' + city + ' ' + state + ' ' + zipcode }, (geoLocationResults, status) => {
    //   console.log('what is status: ', status)
    //   if (status === 'OK') {
    //     results = geoLocationResults
    //     console.log('we have the results!: ', results)
    //     options.lat = results[0].geometry.location.lat()
    //     options.lng = results[0].geometry.location.lng()
    //     console.log('But this is the form: ', options);
    //   }
    // })

    const { userId } = this.props

    fetch('http://localhost:4000/api/locations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        name: username,
        address,
        city,
        state,
        zipcode,
        userId
      })
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username
        <input type="text" name='username' />
        </label>
        <label>
          Street Address
        <input type='text' name="address" />
        </label>
        <label>
          City
        <input type='text' name="city" />
        </label>
        <label>
          State
        <input type='text' name="state" />
        </label>
        <label>
          zipcode
        `<input type='text' name="zipcode" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default scriptLoader(
  [`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}`]
)(AddressForm)
