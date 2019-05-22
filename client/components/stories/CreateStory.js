import React from 'react';
import StoryForm from './Form'
import axios from '../../config/axios';

class CreateStory extends React.Component{
    constructor(){
        super()
        this.handleSubmit=this.handleSubmit.bind(this)
        
    }
    handleSubmit(formData) {
        console.log(formData,'formdata in createStory.js')
        axios.post('/stories', formData)
        .then( () => {
            //console.log(response.data ,'responsedata')
            this.props.history.push('/stories')
        })
        .catch(err => console.log(err))
    }
    render(){
        return(
            <div>
                <h3>Create Story</h3>
              <StoryForm  
                    handleSubmit={this.handleSubmit} 
                    onChange={this.props}  
                />  
            </div>
        )
    }
}
 export default CreateStory;