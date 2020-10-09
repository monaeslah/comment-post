import React, {Component} from 'react';

class Search extends Component {
    render() {
        return (
            <>
                <div className="item-input">
                    <p>{this.props.label}</p>
                    <input className="input-search"
                           type="text"
                           value={(Object.keys(this.props.default).includes(this.props.name)) ? this.props.default?.[this.props.name] : ''}
                           onChange={(e) => this.props.getFilter(e.target.value, this.props.name)}
                    />
                </div>
            </>
        );
    }
}

export default Search;