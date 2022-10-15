import React, { Component } from 'react'
import ImgMediaCard from '../../Card/Card'
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

class LayoutContent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            book: [],
        }
    }

    componentDidMount() {
        this.props.getBook()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.book !== this.props.book) {
            this.setState({
                book: this.props.book,
            })
        }
    }

    render() {
        let book = this.state.book
        console.log(book)
        return (
            <div>
                {book?.map((item, index) => {
                    return (<ImgMediaCard book={item} key={index} />)
                })}
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        book: state.manager.book,
        category: state.manager.category,
        catalog: state.manager.catalog,
        type: state.manager.type,
        categoryByName: state.manager.categoryByName,
        catalogByName: state.manager.catalogByName,
        typeByName: state.manager.typeByName,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBook: () => dispatch(actions.getBook("ALL")),
        getCategory: () => dispatch(actions.getCategory("ALL")),
        getCatalog: () => dispatch(actions.getCatalog("ALL")),
        getType: () => dispatch(actions.getType("ALL")),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContent);


