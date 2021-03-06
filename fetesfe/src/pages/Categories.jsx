import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavComponent from '../components/NavComponent'
import { withRouter } from 'react-router-dom';
import { productList } from '../redux/actions/categoryAction';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class Categories extends Component {
    componentDidMount = () => {
        if (localStorage.getItem('user')) {
            this.props.productList(this.props.match.params.cat)
        }
        else {
            this.props.history.push('/')
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.match.params.cat !== this.props.match.params.cat) {
            this.props.productList(this.props.match.params.cat)
        }
    }
    render() {
        console.log("heyooop",this.props.productdata)
        return (
            <>
                <NavComponent />
                <div className="container pb-5 mb-sm-1">
                    <div className="row">
                        {this.props.productdata ?
                            this.props.productdata.map(el => 
                                <div className="col-md-4 col-sm-6">
                                    <div className="card border-0 mb-grid-gutter">
                                        <div className="card-img-tiles">
                                            <div className="main-img"><img src={`${el.imgUrl}`} alt="Clothing" width='350' height='350' /></div>
                                        </div>
                                        <div className="card-body border mt-n1 py-4 text-center">
                                            <h2 className="h5 mb-1">{el.Category}</h2><span class="d-block mb-3 font-size-xs text-muted">Starting from <span class="font-weight-semibold">${el.price}</span></span>
                                            <Link class="btn btn-pill btn-outline-primary btn-sm" to={`/coupan/${el._id}`}>Get Coupan</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                            : <div>Loading</div>}
                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = (storeState) => {
    return { productdata: storeState.prodState.products }
}

export default withRouter(connect(mapStateToProps, { productList })(Categories))
