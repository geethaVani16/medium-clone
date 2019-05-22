import React from 'react'
import axios from '../../config/axios'

class TopicStory extends React.Component{
    constructor(props){
        //console.log('props in topic',props)
        super(props)
        this.state = {
            topics:[]
        }
        this.handleTopicChange=this.handleTopicChange.bind(this)
    }
    handleTopicChange (e) {
        const selectedTopic=e.target.value
        this.props.handleTopicChange(selectedTopic)
    }
    componentDidMount(){
        axios.get('/topics')
        .then(response => {
            //console.log(response.data)
            this.setState( () => ({topics:response.data}))
        })
    }
    render(){
        return(
            <div>
                <label>Topics</label>
                <select onChange={this.handleTopicChange}>
                    <option value=''> select </option>
                    {
                        this.state.topics.map(topic => {
                            return (
                                <option key={topic._id} value={topic._id}>{topic.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        )
    }
}
export default TopicStory