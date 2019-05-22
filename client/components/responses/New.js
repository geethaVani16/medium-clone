import React from 'react'

class StoryResponse extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            response:'',
            token:localStorage.getItem('token')
        }
        
        this.handleResponseChange = this.handleResponseChange.bind(this)
        this.handleResponseSubmit = this.handleResponseSubmit.bind(this) 
    }
    handleResponseChange (e) {
        if(this.state.token){
            const response = e.target.value
            this.setState( () => ({ response })) 
        }  else {
            window.alert('Please login to comment for story')
        }
    }

    handleResponseSubmit (e) {
        e.preventDefault() 
        const data = {
            response: this.state.response 
        }
        this.props.handleResponseSubmit(data)
    }
    

    render(){
        // console.log(this.props)
        return(
            <div>
                <h4><em>Responses</em></h4>
                <form onSubmit={this.handleResponseSubmit}>
                <label >
                    <input type='text' 
                        value={this.state.response}
                        placeholder='write a Response...' 
                        onChange={this.handleResponseChange}
                    />
                </label><br/>
                <input type='submit' value='publish'/>
                </form>
            </div>
        )
    }
}
export default StoryResponse

