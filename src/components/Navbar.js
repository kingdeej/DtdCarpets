import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'


export class Navbar extends Component {
    state = {
        navClass : "",
        burgerMenu: "menu",
        rightNav:"right-nav",
        counter: 0
    }
    show = (e) => {
        this.setState({navClass: "show-nav"})
        this.setState({burgerMenu: "show"})
        this.setState({rightNav: "show-nav"})
        this.setState({counter: 1})
    }
    remove = (e) => {
        if(this.state.counter === 1){
            this.setState({navClass: ""})
            this.setState({rightNav: "right-nav"})
            this.setState({burgerMenu: "menu"})
            this.setState({counter: 0})
        }
    }
    render() {
        return (
            <div className="navbar">
            <div className="nav margin-container">
                <div className="logo">
                    <Link to="/"><img src="./images/icons/dico and tanny's logo.svg" alt=""></img></Link>
                </div>
                <div className={`${this.state.navClass} ${this.state.rightNav}`}>
                    <div className="menu-x">                   
                        <FaTimes 
                        size={25}
                        onClick={this.remove}
                        />
                    </div>
                    <ul>
                        <li><Link to="/reviews" className="btn-2"><button>Reviews</button></Link></li>
                        <li><a className="btn-2" id="btn-2" href="/#about-us"><button>About us</button></a></li>
                        <li><Link className="btn-1" to="/useform"><button className="get-started-btn">Get Started</button></Link></li> 
                    </ul>
                </div>
                <div className={`${this.state.burgerMenu}`}>                   
                    <FaBars 
                    size={25}
                    onClick={this.show}
                    />
                </div>
            </div>
        </div>
        )
    }
}


export default Navbar

