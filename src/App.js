import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 
import './App.css';

const MODEL_ID = 'face-detection';

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = '0c110e74cc6540099dce33e4177a9717';
  const USER_ID = 'codersagar007';
  const APP_ID = 'smartbrain-face-detection';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      init: false,
      input: '',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
		    name: '',
		    email: '',
		    entries: 0,
		    joined: ''
      }
    }
  }

  componentDidMount() {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      this.setState({ init: true });
    });
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('http://localhost:3000/imageurl', { // Change to proxy server
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_app_id: {
          user_id: 'codersagar007',
          app_id: 'smartbrain-face-detection'
        },
        inputs: [{
          data: {
            image: { url: this.state.input }
          }
        }]
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.user.id })
          })
            .then(res => res.json())
            .then(count => {
              // Ensure count is a number before updating state
              console.log("Updated count:", count);
              this.setState({ user: { ...this.state.user, entries: parseInt(count, 10) } });
            })
            .catch(err => console.log(err));          
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log('error', err));
  };
  
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
    const options = {
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 3,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 450,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "lines",
        },
        size: {
          value: 10,
        },
      },
      detectRetina: true,
    };

    const {isSignedIn, imageUrl, route, box, init} = this.state;
    
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ?<div>
            <Logo />
            {this.state.user.entries !== undefined && (
                <Rank
                    name={this.state.user.name}
                    entries={this.state.user.entries}
                />
            )}
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition 
            box = {box}
            imageUrl={imageUrl}/>
          </div>
          : (
            route === 'signin' || route === 'signout'
            ? <SignIn onRouteChange = {this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange = {this.onRouteChange} loadUser={this.loadUser} />
          )
        }
        {init && (
          <Particles
            id="tsparticles"
            particlesLoaded={this.particlesLoaded}
            options={options}
          />
        )}
      </div>
    );
  }
}

export default App;
