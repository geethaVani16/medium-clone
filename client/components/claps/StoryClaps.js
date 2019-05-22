import React from 'react'

class StoryClaps extends React.Component {
    constructor(){
        super()
        this.state ={
            token:localStorage.getItem('token'),
            clapCount:0
        }
    }
    handleClap = () => {
        if(this.state.token){
            console.log('clap clicked')
            this.setState((prevState)=>({clapCount:prevState.clapCount+1}))
            const data={
                clapCount:this.state.clapCount
            }
            // console.log(data,'clap ')
            this.props.handleClap(data)
        } else {
            window.alert('please login to clap!!')
        }
    }
    render(){
        return(
            <div>
                <button onClick={this.handleClap} className="btn btn-success btn-sm"> 
                    clap {this.state.clapCount}
                </button>
            </div>
        )
    }
}

export default StoryClaps