import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class GetStartedFloating extends Component {
    state = {
        show: "show",
        trans: "",
    }

    getScrollFunc = () => {
        const getScroll = () => {
            if (window.scrollY >= 524) {
                this.setState({show: "get-started-float"})
                this.setState({trans: "get-started-float-tran"})
                var counter = 0
                var interval = setInterval(() => {
                    counter = counter + 1
                    if (counter === 2) {
                        clearInterval(interval)
                        this.setState({trans: ""})
                    }
                }, 300); 
            }else{
                this.setState({show: "show"})
            }                
        }
        window.addEventListener("scroll", getScroll)
    }

    componentDidMount(){
        this.getScrollFunc()
    }
    componentWillUnmount(){
        this.getScrollFunc()
    }
    render() {
        return (
            <div className="get-started-float">
                <Link className="btn-1" to="/useform"><button className={`${this.state.show} ${this.state.trans}`}>Get Started</button></Link>
            </div>
        )
    }
}
