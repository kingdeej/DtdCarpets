import React, { Component } from 'react'
import { Link} from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'


export class Navbar extends Component {
    state = {
        navClass : "",
        burgerMenu: "menu",
        rightNav:"right-nav",
        counter: 0,
        seeOurWork: "",
        navActive: "",
        notNav: "show"
    }
    show = (e) => {
        this.setState({notNav:"not-nav"})
        this.setState({navClass: "show-nav"})
        this.setState({burgerMenu: "show"})
        this.setState({rightNav: "show-nav"})
        this.setState({counter: 1})
    }
    remove = (e) => {
        this.setState({notNav:"show"})
        if(this.state.counter === 1){
            this.setState({navClass: ""})
            this.setState({rightNav: "right-nav"})
            this.setState({burgerMenu: "menu"})
            this.setState({counter: 0})
        }
    }

    checkUrl = () => {
        const url = window.location.href
        if (url.endsWith("useform") !== true) {
                const changeNav = () => {
                if (window.scrollY >= 80) {
                    this.setState({navActive: "nav-active"})
                }else{
                    this.setState({navActive: ""})
                }
            }
            window.addEventListener("scroll", changeNav)
        }else{
            const changeNav = () => {
            this.setState({navActive: ""})
            }
            window.addEventListener("scroll", changeNav)
        }
       
    }
    componentDidMount(){
        setInterval(()=>{this.checkUrl()},1)
    }
    componentWillUnmount(){
        this.checkUrl()
    }

      
    render() {
        return (
            <div className="navbar">
            <div className={`${this.state.navActive} nav cont-spacing-width`}>
                <div className="logo" >
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
                        <li><a className="btn-2" id="btn-2" href="/#footer"><button>Contact us</button></a></li>
                        <li className="nav-spacer"></li>
                        <li><Link className="btn-1" to="/useform"><button className="get-started-btn">Get Started</button></Link></li> 
                        <li><a className="see-our-work" href="https://www.facebook.com/100058473835975">See our work</a></li>
                    </ul>
                </div>
                <div className={`${this.state.burgerMenu}`}>                   
                    <FaBars 
                    size={25}
                    onClick={this.show}
                    />
                </div>
            </div>
            <div className={this.state.notNav} onClick={this.remove}></div>
        </div>
        )
    }
}


export default Navbar

