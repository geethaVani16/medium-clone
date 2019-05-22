import React from 'react' 
import axios from '../../config/axios';
import {Link} from 'react-router-dom'

class Home extends React.Component {
    constructor(){
        super()
        this.state={
            stories:[]
        }
    }
    componentDidMount(){
        axios.get('/public')
        .then(response =>{
            this.setState(()=>({stories:response.data}))
        })
            
        .catch(err=>console.log(err))
    }
    render () {
        console.log(this.state)
        return(
            <div>
                <h2>Welcome to Medium </h2>
                {this.state.stories.map(story =>{
                    return (
                        <div key={story._id}>
                         <Link to={`/stories/${story._id}`}> <h2>title: {story.title} </h2> </Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Home