import React from 'react';
//import './App.css';
import { BrowserRouter,Route,Link,Switch } from "react-router-dom"
import Axios from './config/axios'

import Home from './components/layout/Home'
import UserRegister from  './components/authentication/Register'
import UserLogin from './components/authentication/Login'
import StoriesList from './components/stories/StoriesList'
import CreateStory from './components/stories/CreateStory'
import ShowStory from './components/stories/ShowStory'
import StoryEdit from './components/stories/EditStory'


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: !!localStorage.getItem('token')
    }
    this.handleIsAuthenticated=this.handleIsAuthenticated.bind(this)
  }

  handleIsAuthenticated(bool){
    this.setState( () => ({
      isAuthenticated:bool
    }))
  }

  render() {
    return (
      <BrowserRouter>
        <div>
         
          <nav className='navbar nav-success bg-success navbar-expand-sm'>

              <div className='container'>
                <Link to='/' className="text-dark"><h4>Home</h4></Link> <br/>
                  
                  {
                    this.state.isAuthenticated && (<Link to='/users/logout' className="text-dark" > logout</Link>)
                  }
                  {
                    !this.state.isAuthenticated && (
                                                    <div>
                                                      <Link to='/users/register'className="text-dark" >Register</Link> |
                                                      <Link to='/users/login'className="text-dark"> Login</Link>
                                                    </div>
                                                  )
                  }

                  <Link to='/stories' className="text-dark" >Stories</Link>
              </div>

          </nav>
              <Switch>
                <Route path='/' component={Home} exact={true}/>
                <Route path='/stories' component={StoriesList} exact={true}/>
                <Route path='/stories/create' component={CreateStory} />
                <Route path='/stories/edit/:id' component={StoryEdit} exact={true}/>
                <Route path='/stories/:id' component={ShowStory} exact={true}/>
                <Route path='/users/register' component={UserRegister} exact={true}/>
                <Route path='/users/login' render={ () => <UserLogin handleIsAuthenticated={this.handleIsAuthenticated}/>}/>
                <Route path='/users/logout' component={() => {
                                      localStorage.clear()
                                      Axios.defaults.headers['X-auth']= null
                                          return (
                                            <div>
                                              <p>you have successfully logged out</p>
                                            </div>
                                          )
                            }} />
              </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
