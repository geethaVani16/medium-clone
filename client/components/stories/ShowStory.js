import React from "react"
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import ListResponse from '../responses/List'
import StoryResponse from '../responses/New'
import StoryClaps from '../claps/StoryClaps'

class ShowStory extends React.Component { 
    constructor(props){
        super(props)
        this.state = {
            story:{},
            token:localStorage.getItem('token')            
        }
        this.handleDelete=this.handleDelete.bind(this)
    } 

    componentDidMount(){
        const id=this.props.match.params.id
        if(this.state.token) {
            console.log('logged in')
            axios.get(`/public/${id}`)
            .then(response => {
                console.log(response.data,'responsedata afterlogin')
                this.setState( ()=> ({story:response.data}))
            })
        } 
        else {
            console.log('not loged in')
            axios.get(`/public/${id}`)
            .then(response => {
                // console.log(response.data)
                this.setState(() => ({story:response.data}))
            })
        }
    }

    handleBookmark=() => {
        if(this.state.token){
            const storyId=this.state.story._id
            console.log('react', storyId)
            const formData = {
                storyId
            }
            console.log(formData,'formdata')
            axios.post('/users/bookmark', formData)
            .then(response=>console.log(response.data))
            .catch(err=>console.log(err))
        } else {
            window.alert('please login to bookmark')
        }
    }
    
    handleFollow =() => {
        if(this.state.token) {
            console.log('follow clicked')
            const formData={
                id:this.state.story.user._id
            }
            console.log(formData)
            axios.post('/users/follow',formData)
            .then(response =>console.log(response.data,'response data fron show page'))
            .catch(err=>console.log(err))
        } else {
            window.alert('please login to follow story!')
        }
    }

    handleClap =(data) => {
        // console.log(data,'data in show')
        const formData = {
            clap:data.clapCount
        }
        console.log(formData,"formdata")
        axios.post(`/stories/${this.props.match.params.id}/claps`,formData)
        .then(response => {
            console.log(response.data)
        })
        .catch(err=>console.log(err))
    }

    handleResponseSubmit= (data) => {
        console.log(data)
        const formData = {
            body:data.response
        }
        axios.post(`responses/${this.props.match.params.id}`,formData)
        .then(response => {
            console.log(response.data)
        })
        .catch(err=>console.log(err))
    }

    
    handleDelete () {
        const confirmDelete=window.confirm('Are you sure !')
        if(confirmDelete){
            axios.delete(`/stories/${this.props.match.params.id}`)
            .then(response => this.props.history.push('/stories'))
            .catch(err => window.alert(err))
        }
        this.props.history.push('/stories')
    }

    render(){
        // console.log(this.props)
        const html=this.state.story.body
        // console.log(this.state,'state')
        return(
            <div>
                    <h2>story written user--{this.state.story.user &&this .state.story.user._id}</h2>
                    <h3>Title : {this.state.story.title}</h3> 
                    <h4>topic : {this.state.story.topic && this.state.story.topic.name}</h4>
                    <p> tags :
                            {this.state.story.tags && this.state.story.tags.map(tag => {
                            return <li key={tag._id}>{tag.name}</li>
                        })}
                        </p>
                    <h4>Author :{this.state.story.user && this.state.story.user.username}</h4>
                    <div> story :{ ReactHtmlParser(html) }</div><br/>
                    <StoryClaps handleClap={this.handleClap}/> <br/>
                    <button onClick={this.handleBookmark}>bookmark</button>
                        <h4>responses</h4>
                        <ListResponse storyId={this.props.match.params.id}/>
                        
                    <StoryResponse  
                            handleResponseSubmit = {this.handleResponseSubmit}
                            storyId={this.props.match.params.id}
                        />
                    <Link to ='/stories'> Back </Link>
                        {this.state.token && (
                                                <div>
                                                    <button onClick={this.handleDelete}> Delete </button>
                                                    <button onClick={this.handleFollow}>follow</button>
                                                    <Link to={`/stories/edit/${this.state.story._id}`}> Edit </Link>
                                                </div>
                                            )
                        }

            </div>
        )
    }
}
export default ShowStory