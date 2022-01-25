import React, { Component } from 'react'

export class Loading extends Component {
    _ismounted = false
    state = {
        active: "active",
        activeCounter: 0
    }
componentDidMount(){
    this._ismounted = true
    if (this._ismounted) {
        setInterval(() => {
            if (this.state.activeCounter === 4) {
                this.setState({activeCounter: 0})
                
            }else{
                this.setState({activeCounter: this.state.activeCounter + 1})
            }
        }, 200);        
    }
}
componentWillUnmount(){
    this._ismounted = false
}

    render() {
        return (
            <div className="loading">
            {[...Array(4)].map((key, i)=>{
                const active = i + 1
                return(
                    <div key={i} className={`dots ${active <= this.state.activeCounter ? this.state.active : "black"}`} ></div>
                )
            })}
        </div>
        )
    }
}

export default Loading



