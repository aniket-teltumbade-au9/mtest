import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavComponent from '../components/NavComponent'

class HomePage extends Component {
    render() {
        return (
           <NavComponent />
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
