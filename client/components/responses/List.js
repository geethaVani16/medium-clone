import React from 'react'
import axios from '../../config/axios';

class ListResponse extends React.Component {
    constructor(){
        super()
        this.state={
            responses: []
        }
    }
    componentDidMount(){
        axios.get(`/responses/${this.props.storyId}`)
        .then(response => {
            // console.log(response.data)
            this.setState(()=>({responses:response.data}))
        })
    }
    render(){
        // console.log(this.props)
        // console.log(this.state)
        return(
            <div>
                <ul>
                {
                    this.state.responses.map(response => {
                        return  <li key = {response._id}>
                                    {response.body}---{response.user && response.user.username}
                                </li>
                        
                    })
                }
                </ul>
            </div>
        )
    }
}
export default ListResponse