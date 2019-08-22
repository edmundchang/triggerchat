import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import { Code } from '../styles/style';
import s from '../styles/home.style';
import { GoogleLogout } from 'react-google-login';
import { GoogleLogin } from 'react-google-login';


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
      loggedIn: false
    }
    console.log('in constructor');
  }

  successResponse(response) {
    console.log('onSuccess')
    console.log(response) // eslint-disable-line
    this.setState({loggedIn: true});
  }

  errorResponse(response) {
    console.log('onError')
    console.error(response) // eslint-disable-line
  }

  loadingResponse(response) {
    console.log('loading...') // eslint-disable-line
  }

  logout() {
    console.log('logout') // eslint-disable-line
    this.setState({loggedIn: false});
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
