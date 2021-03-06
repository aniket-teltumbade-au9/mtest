import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactFacebookLogin from 'react-facebook-login'
import { fbLogin, fbLogout, fbProfile } from '../redux/actions/authAction'
import { withRouter } from 'react-router-dom'

class NavComponent extends Component {
    responseFacebook = (response) => {
        this.props.fbLogin(response)
    }
    handleLogout = () => {
        this.props.fbLogout()
    }
    componentDidMount = () => {
        if (localStorage.getItem('user')) {
            this.props.fbProfile()
        }
    }
    handleCategory=(name)=>{
        this.props.history.push(`/category/${name}`)
    }
    componentDidUpdate = (prevProps, prevSate) => {
        if (this.props.userdata === prevProps.userdata) {
            this.props.fbProfile()
        }
    }
    render() {
        return (
            <nav className="navbar navbar-light bg-light justify-content-between">
                <div className="navbar-brand">Navbar</div>
                {localStorage.getItem('user') ?
                    <>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Category
  </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button  className="dropdown-item" >Select Category</button>
                                <button className="dropdown-item" onClick={()=>this.handleCategory('Electronics')}>Electronics</button>
                                <button className="dropdown-item" onClick={()=>this.handleCategory('Clothes')}>Clothes</button>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={this.handleLogout}>FB Logout</button>
                    </> :
                    <ReactFacebookLogin
                        appId="436637997570202"
                        fields="name,email,picture"
                        scope="public_profile"
                        callback={this.responseFacebook}
                    />
                }
            </nav>
        )
    }
}
const mapStateToProps = (storeState) => {
    return { userdata: storeState.authState.user }
}


export default withRouter(connect(mapStateToProps, { fbLogin, fbLogout, fbProfile })(NavComponent))
