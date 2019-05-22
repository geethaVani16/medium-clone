import React from 'react'
import axios from '../../config/axios'
import {Redirect} from 'react-router-dom'

class UserLogin extends React.Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            notice:'',
            redirect:false

        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        e.preventDefault()
        const formData={
            email:this.state.email,
            password:this.state.password
        }
        axios.post('/users/login',formData)
        .then(response => {
            axios.defaults.headers['x-auth'] = response.data.token
            localStorage.setItem('token', response.data.token) //the reason why we are setting taken to the localstorage is even if the page reloads our authentication still exits
            this.props.handleIsAuthenticated(true)
            this.setState(() => ({redirect:true}))
        })
        .catch(err => {
            this.setState(() => ({
                notice:err.response.data.notice
            }))
        })
    }
    handleChange(e){
        e.persist()
        this.setState(()=> ({
            [e.target.name]:e.target.value
        }))
    }
    render(){
        if(this.state.redirect){
            return <Redirect to='/stories'/>
        }
        return(
            <div className='modal-dialog modal-sm'>
                <div className='modal-content'>
                    <div className='modal-header bg-success text-white'>
                        <h2>login</h2>
                    </div>
                    
                    {this.state.notice && <p>{this.state.notice}</p>}
                    <form onSubmit={this.handleSubmit} className='form-group' >
                        <div className='modal-body'>
                            <div className='form-group'>
                                <div>
                                    <label htmlFor='email'> email: </label>
                                    <input type='text' 
                                        value={this.state.email} 
                                        className="form-control" 
                                        id="email" placeholder='name@email.com' 
                                        onChange={this.handleChange} 
                                        name='email'
                                    />
                                </div>
                                <div>
                                    <label htmlFor='pwd'> password:</label>
                                    <input type="password" 
                                        value={this.state.password} 
                                        className="form-control" 
                                        id="password" 
                                        placeholder='****' 
                                        onChange={this.handleChange} 
                                        name='password'
                                    />
                                </div><br/>
                                
                                <input type='submit' className="btn btn-success"/>
                            </div>

                        </div>
                    </form>
                </div>
                
            </div>
        )
    }
}

export default UserLogin