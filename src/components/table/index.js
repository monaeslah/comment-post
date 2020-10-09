import React, {Component} from 'react';
import data from 'assets/data/data.json';
import Search from "components/table/search";
import {connect} from "react-redux";
import {listStar} from "redux/pages/action";


class Index extends Component {
    state = {
        initialData: [],
        data: [],
        filter: '',
        queryParam: {
            sort: 'name',
            current:1,
            offset:100,
            total:100000,
            filter: {}
        }
    }

    componentDidMount() {

        if (this.props.location?.search) {
            let queryParam = (this.props.location?.search) &&
                JSON.parse(decodeURIComponent(this.props.location?.search)?.replace('?', ''));
            this.setState({
                queryParam
            })
        }


        this.setState({
            initialData: data,
            data: data
        }, () => {
            this.getFilter((this.state.queryParam?.filter?.value), this.state.queryParam?.filter?.name || 'name')
        })

    }

    Sort = (item = 'name') => {
        this.props.history.push({
            pathname: '/',
            search: encodeURIComponent(JSON.stringify({
                ...this.state.queryParam,
                sort: item
            }))
        })

        let t = this.state.data.sort((a, b) => {
            let x = a?.[item];
            let y = b?.[item];
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        })
        this.setState({
            data: t,
            queryParam: {
                ...this.state.queryParam,
                sort: item
            }
        })
    }
    getFilter = (e = '', name = '') => {
        const filter={
            ...Object.entries(this.state.queryParam.filter)
            .filter(kv=>kv?.[1])
            .reduce((a,b)=>({...a,[b[0]]:b[1]}),({})),
            [name]:e,
        }
        this.props.history.push({
            pathname: '/',
            search: encodeURIComponent(JSON.stringify({
                ...this.state.queryParam,
                filter,
            }))
        })
        let _init = this.state.initialData;
        let list = _init.filter(t => {
            return Object.keys(filter).reduce((a,b)=>{
               return t?.[b]?.toLowerCase()?.indexOf(filter[b]) > -1 && a
            },true)
        });

        this.setState({
            data: list.slice(0,this.state.queryParam.offset),
            queryParam: {
                ...this.state.queryParam,
                current:1,
                total:list.length,
                offset:100,
                filter,
            }
        }, () => this.Sort(this.state.queryParam?.sort))
    }

    render() {
        return (
            <>
            <p>totol:{this.state.queryParam.total}</p>
            <p>offset:{this.state.queryParam.offset}</p>
            
                <div className="main">
                    <div className="box-input">
                        <Search getFilter={this.getFilter} name='name' default={this.state.queryParam?.filter}
                                label="نام تغییر دهنده"/>
                        <Search getFilter={this.getFilter} name='date' default={this.state.queryParam?.filter}
                                label="تاریخ"/>
                        <Search getFilter={this.getFilter} name='title' default={this.state.queryParam?.filter}
                                label="نام آگهی"/>
                        <Search getFilter={this.getFilter} name='field' default={this.state.queryParam?.filter}
                                label="فیلد"/>
                    </div>

                    <table>
                        <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                <button onClick={() => this.Sort('name')}>نام تغییر دهنده</button>
                            </th>
                            <th>
                                <button onClick={() => this.Sort('date')}>تاریخ</button>
                            </th>
                            <th>
                                <button onClick={() => this.Sort('title')}>نام آگهی</button>
                            </th>
                            <th>
                                <button onClick={() => this.Sort('field')}>فیلد</button>
                            </th>
                            <th>
                                <button onClick={() => this.Sort('old_value')}>مقدار قدیمی</button>
                            </th>
                            <th>
                                <button onClick={() => this.Sort('new_value')}>مقدار جدید</button>
                            </th>
                            <th>
                                <button>ستاره دار</button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.filter((r,i)=>i<this.state.queryParam.offset).map((r, i) => <tr key={i}>

                            <td>{i+1}</td>
                            <td>{r?.name}</td>
                            <td>{r?.date}</td>
                            <td>{r?.title}</td>
                            <td>{r?.field}</td>
                            <td>{r?.old_value}</td>
                            <td>{r?.new_value}</td>
                            <td>
                                <button
                                    className={`${this.props.infoListStar.some(t => t== r?.id) && 'text-pink'}`}
                                    onClick={() => this.props.listStar(r?.id)}>★
                                </button>
                            </td>
                        </tr>)}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listStar: (...data) => dispatch(listStar(...data)),
    }
};

const mapStateToProps = (store) => {
    return ({
        infoListStar: store.infoListStar

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)