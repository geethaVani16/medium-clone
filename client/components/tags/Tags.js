import React from 'react'
import axios from '../../config/axios'
import Select from 'react-select'

class StoryTags extends React.Component{
    constructor(props){
        super(props)
        this.state={
            tagOptions:[]
        }
        this.handleTagChange=this.handleTagChange.bind(this)
    }
    handleTagChange (e) {
        //console.log(e,"e")
        var values =e.map(tag => tag.id)
        // console.log(values,"values in form.js")
    this.props.handleTagChange(values)
    }
    componentDidMount () {
        let tagOptions = []
        axios.get('/tags')
        .then( response => {
            //console.log(response.data)
            tagOptions=response.data.map(tag => ({
                label:tag.name,
                value:tag.name,
                id:tag._id
            }))
            //console.log(tagOptions,'tagOptions in tags.js file')
            this.setState(()=> ({tagOptions}) )
        })
        .catch(err => console.log(err))
    }
    
    render(){
        return(
            <div>
                <label>tags: </label>
                <Select isMulti
                    onChange={this.handleTagChange}
                    options={this.state.tagOptions} 
                />
            </div>
        )
    }
}
export default StoryTags
