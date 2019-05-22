import React from 'react'
import axios from '../../config/axios'

class UserRegister extends React.Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            email:'',
            password:'',
            notice:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        const formData={
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        //todo client side validation

        axios.post("/users/register", formData)
        .then( () => {
            this.setState( ()=> ({
                username:'',email:'',password:'', 
                //once if we are loged in. we have to make input feilds empty and redirect user to login screen
                notice:"successfully registered,taking you to login screen"
            }))

            setTimeout(()=>{
                this.props.history.push('/users/login')
            },2000)
        })
        .catch(err => console.log(err))
    }

    handleChange(e) {
        //console.log(prop,e.target.name ,'in Register')
        //console.log(value,e.target.value,'in Register')
        e.persist()
        this.setState( () => ({
            [e.target.name] : e.target.value
        }))
    }


    render(){
        return(
            <div className='modal-dialog modal-sm'>
               <div className='modal-content'>
                    <div className='modal-header bg-success text-white'>
                        <h2>Register with us</h2>
                    </div>
                    {this.state.notice && <p>{this.state.notice}</p> }
                    <form onSubmit={this.handleSubmit} className='form-group'>
                    <div className='modal-body'>
                       <div className='form-group'>
                            <div >
                                <label htmlFor='name'>username :</label>
                                <input 
                                    type="text" 
                                    value={this.state.username} 
                                    className="form-control" 
                                    id="name" placeholder='name' 
                                    onChange={this.handleChange} 
                                    name='username'
                                />
                            </div>
                            
                            <div>
                                <label htmlFor='email'> email: </label>
                                <input type="text" value={this.state.email} onChange={this.handleChange} name='email' className="form-control" id="email" placeholder='name@email.com' />
                            </div>
                            
                            <div>
                                <label htmlFor='pwd'> password: </label>
                                <input type="password" 
                                    value={this.state.password} 
                                    onChange={this.handleChange} 
                                    name='password' 
                                    placeholder='****' 
                                    className="form-control" 
                                    id="password"
                                />
                            </div><br/>
                       </div>
                       <input type='submit' className="btn btn-success"/>
                    </div>

                    </form>
               </div>
            </div>
        )
    }
}
export default UserRegister