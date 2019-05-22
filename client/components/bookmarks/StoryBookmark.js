import React from 'react'

class Bookmark extends React.Component {
    constructor(){
        super()
        this.state={
            token:localStorage.getItem('token')
        }
    }
    handleBookmark=() => {
        if(this.state.token){
            console.log('bookmark')
        } else {
            window.alert('please login to bookmark')
        }
    }

    render(){
        return(
            <div>
                <button onClick={this.handleBookmark}>Bookmark</button>
            </div>
        )
    }
}
export default Bookmark