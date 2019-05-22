import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import unemojify from 'node-emojify'
import draftToHtml from 'draftjs-to-html'; 
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import TopicStory from '../topics/Topics'
import StoryTags from '../tags/Tags'


class StoryForm extends React.Component {
  constructor(props){
    super(props)
    // console.log('props in story form',props)
    this.state = {
      editorState: EditorState.createEmpty(),
      title:'',
      selectedTopic:'',
      body: '',
      tagOptions:[],
    }
    this.handleTitleChange=this.handleTitleChange.bind(this)
    this.handleTopicChange=this.handleTopicChange.bind(this)
    this.handleTagChange=this.handleTagChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }
  
  onEditorStateChange = (editorState) => {
    const newValue = unemojify(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    )
    // console.log(newValue ,"newValue")
    // if (value !== newValue) {
    //   onChange
    // }
    this.setState({
      editorState, body: newValue
    })
  }

  handleTitleChange (e) { //this we getting from props and that we will be setting in the state
    //console.log(e.target.value)
    const title=e.target.value
    this.setState(() => ({title}))
  }
  handleTopicChange (selectedTopic) { //this we getting from props and that we will be setting in the state
    this.setState( () => ({selectedTopic}))
  }
  handleTagChange (tagOptions) { //this we getting from props and that we will be setting in the state
    this.setState( () => ({tagOptions}))
  }


  componentWillReceiveProps(nextProps) {
    console.log(nextProps,'nextProps')
    const { title,body,selectedTopic,tagOptions,editorState } = nextProps.story
    this.setState(() => ({title,body,selectedTopic,editorState,tagOptions}))
  }
  
  handleSubmit (e) {
    e.preventDefault()
    const formData = {
      title:this.state.title,
      selectedTopic:this.state.selectedTopic,
      tagOptions:this.state.tagOptions,
      body:this.state.body
    }
    // console.log(formData.selectedTopic,'formdata in form.js')
    this.props.handleSubmit(formData)
    this.setState( () => ({
      title:'',
      editorState : '',
      tagOptions:''
    }))
  }

  render() {
    // console.log(this.props,'props')
  // console.log(this.state.selectedTopic,"state topic")
    const { editorState } = this.state;
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
            <label>Title</label>
            <input type='text' value={this.state.title}  onChange={this.handleTitleChange}/><br/>
            <TopicStory handleTopicChange={this.handleTopicChange}/>  
            <StoryTags handleTagChange={this.handleTagChange}/>
            <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                  // onChange={this.onChange}
            />
          <input type='submit'/>
        </form>
      </div>
    )
  }
}
 export default StoryForm