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
// Set the Region and creds
AWS.config.update({ "accessKeyId": "AKIA4CIEUDFRYQYYOC36", "secretAccessKey": "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", "region": "us-west-2" });
// only works server side, https://stackoverflow.com/questions/49185271/aws-filesystemcredentials-is-not-a-constructor
// AWS.config.loadFromPath('../../credentials.json');
// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

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
    
    var params = {
      TableName: 'refcode_users',
      Key: {'user_id': response.googleId}
     };
     
     docClient.get(params, function(err, data) {
       if (err) {
         console.log("Error", err);
       } else {
         console.log("Success", data.Item);
       }
     });

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

        <br></br>
        <a href="https://www.buymeacoffee.com/A2HxJ4D" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/yellow_img.png" alt="Buy Me A Coffee" /></a>

      </div>
    )
  }

}
