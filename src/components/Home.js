import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import { Code } from '../styles/style';
import s from '../styles/home.style';
import { GoogleLogout } from 'react-google-login';
import { GoogleLogin } from 'react-google-login';
import WelcomeMessage from './WelcomeMessage';


// import entire SDK
var AWS = require('aws-sdk');

const clientId = '736910884720-ntcuf3odqsd0suv9bao9mt73i319fibi.apps.googleusercontent.com'

const repoReadmeLink = text => (
  <Interactive
    as="a"
    {...s.link}
    href="https://github.com/edmundchang/triggerchat/blob/master/README.md"
  >{text}</Interactive>
);

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: ""
    }
    console.log('in constructor');
  }

  successResponse(response) {
    console.log('onSuccess start')
    console.log(response) // eslint-disable-line
    this.setState({ username: response.profileObj.name });
    this.setState({ loggedIn: true });
    console.log('onSuccess finish')
  }

  errorResponse(response) {
    console.log('onError')
    console.error(response) // eslint-disable-line
  }

  loadingResponse(response) {
    console.log('loading') // eslint-disable-line
  }

  logout() {
    console.log('logout') // eslint-disable-line
    this.setState({ loggedIn: false });
    this.setState({ username: "LOGGED OUT USER" });
  }


  componentDidMount() {
    //this.setState({ loggedIn: false });
  }

  componentWillUnmount() {
    //this.setState({ loggedIn: false });
  }


  render() {
    return (
      <div>
        <p style={s.p}>
          This is an example single page app built
          with React and React&nbsp;Router using {' '}
          <Code>BrowserRouter</Code>. Navigate with the links below and
          refresh the page or copy/paste the url to test out the redirect
          functionality deployed to overcome GitHub&nbsp;Pages incompatibility
          with single page apps (like this one).
        </p>
        <p style={s.p}>
          Please see the {repoReadmeLink('repo readme')} for instructions on how to
          use this boilerplate to deploy your own single page app using GitHub Pages.
        </p>
    <style>.bmc-button img{width: 27px !important;margin-bottom: 1px !important;box-shadow: none !important;border: none !important;vertical-align: middle !important;}.bmc-button{line-height: 36px !important;height:37px !important;text-decoration: none !important;display:inline-flex !important;color:#FFFFFF !important;background-color:#FF813F !important;border-radius: 3px !important;border: 1px solid transparent !important;padding: 1px 9px !important;font-size: 22px !important;letter-spacing: 0.6px !important;box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;margin: 0 auto !important;font-family:'Cookie', cursive !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;-o-transition: 0.3s all linear !important;-webkit-transition: 0.3s all linear !important;-moz-transition: 0.3s all linear !important;-ms-transition: 0.3s all linear !important;transition: 0.3s all linear !important;}.bmc-button:hover, .bmc-button:active, .bmc-button:focus {-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;text-decoration: none !important;box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;opacity: 0.85 !important;color:#FFFFFF !important;}</style><link href="https://fonts.googleapis.com/css?family=Cookie" rel="stylesheet"><a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/A2HxJ4D"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">Buy me a coffee</span></a>
        <div style={s.pageLinkContainer}>
          <Interactive
            as={Link}
            {...s.link}
            to="/example"
          >Example page</Interactive>
        </div>
        <div style={s.pageLinkContainer}>
          <Interactive
            as={Link}
            {...s.link}
            to="/example/two-deep?field1=foo&field2=bar#boom!"
          >Example two deep with query and hash</Interactive>
        </div>

        <form method="POST" action="https://formspree.io/changedmund@gmail.com">
          <input type="email" name="email" placeholder="Your email" />
          <textarea name="message" placeholder="Test Message"></textarea>
          <button type="submit">Send Test</button>
        </form>

        <WelcomeMessage username={this.state.username} />

        {this.state.loggedIn ? <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={() => { this.logout() }}
        />
          : <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={(e) => { this.successResponse(e) }}
            onFailure={(e) => { this.errorResponse(e) }}
            onRequest={(e) => { this.loadingResponse(e) }}
            cookiePolicy={'single_host_origin'}
          />}

      </div>
    )
  }

}
