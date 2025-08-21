import React from 'react';
import { API_URL } from '../../config';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }
    
  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitRegister = () => {
    console.log('Registering with:', this.state); // ✅ Debug log
    fetch(`${API_URL}/register`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
    .then(res => {
      console.log('Response status:', res.status); // ✅ Debug response status
      if (!res.ok) {
        return res.text().then(text => {
          console.log('Error response:', text); // ✅ Debug error response
          throw new Error(`HTTP ${res.status}: ${text}`);
        });
      }
      return res.json();
    })
    .then(user => {
      console.log('Success response:', user); // ✅ Debug success response
      if(user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home')
      }
    })
    .catch(error => {
      console.error('Registration error:', error); // ✅ Debug any errors
    })
  }

  render() {
    return(
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
              <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f1 fw6 ph0 mh0">Register</legend>
                  <div className="mt3">
                      <label className="db fw6 lh-copy f3" htmlFor="name">Name</label>
                      <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                      type="text" 
                      name="name"  
                      id="name" 
                      onChange={this.onNameChange}
                      />
                  </div>
                  <div className="mt3">
                    <label className="db fw6 lh-copy f3" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="email" 
                    name="email-address"  
                    id="email-address" 
                    onChange={this.onEmailChange}
                    />
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f3" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password" 
                    name="password" 
                    id="password" 
                    onChange={this.onPasswordChange}
                    />
                  </div>
                </fieldset>
                <div className="">
                  <input 
                  onClick={this.onSubmitRegister}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib pointer" 
                  type="submit" 
                  value="Register"/>
                </div>
              </div>
          </main>
      </article>
    );
  }
}

export default Register;