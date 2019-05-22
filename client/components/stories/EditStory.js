import React from "react"
import axios from '../../config/axios'
import StoryForm from './Form'

class StoryEdit extends React.Component {
    constructor(props){
        super(props)
        this.state={
            story:{}
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    componentDidMount(){
        const { id } =this.props.match.params
        axios.get(`/stories/${id}`)
        .then( response => {
            this.setState( ()=> ({story:response.data}))
        })
    }
    handleSubmit(formData){
        axios.put(`/stories/${this.state.story._id}`,formData)
        .then(response => console.log(response.data))
        .catch(err=>console.log(err))
    }
    

    render(){
        console.log(this.state)
        return(
            <div>
                <h3>Edit your Story</h3>
               
                   <StoryForm 
                   story={this.state.story} 
                   handleSubmit={this.handleSubmit}/>
               

            </div>
        )
    }
}
export default StoryEdit
