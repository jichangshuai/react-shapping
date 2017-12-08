import React ,{ReactDom}from 'react';
import {ListView, Icon} from 'antd-mobile';
import {nativeClick} from '../../utils/native-sdk'


class MoreList extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
        };
    }
    componentDidMount() {

        const {scrollT} =this.props
            this.lv.scrollTo(0,scrollT-this.imgH.offsetHeight);

        // console.log(  window.getComputedStyle((this.imgH).height))

    }


    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
    //     });
    //   }
    // }

    onEndReached = (event) => {

        const {pagenum, isFetching, hasMore, fetchHomeList, pagesize} = this.props


        let num = pagenum

        if (isFetching || !hasMore) {
            return;
        }

        fetchHomeList({pagesize: pagesize, pagenum: ++num,})
    }


    render() {
        const {list, history, isFetching, hasMore} = this.props

        const row = (rowData, sectionID, rowID) => {

            return (
                <div key={rowID} className="goods" onClick={() =>
                    nativeClick({type:2, url:'', id:rowData.id, name:rowData.stitle, activeType:'0'})}>
                    <div className="img-info list-goods-img-info">

                        <div className="list-goods-img-icon">

                            {
                                rowData.type === '0' && <img src={rowData.list_smallpicafter + '?imageMogr2/thumbnail/!30p'} alt="" />
                            }

                        </div>

                        <img src={rowData.bigpic+'?imageMogr2/thumbnail/!60p'} alt="" ref={(el)=>this.imgH=el}/>

                    </div>
                    <div className="txt-info">
                        <p className="title">
                            {rowData.isown===2&&<span>海外直邮</span>}{rowData.stitle}</p>
                        <p className="price">
                            ￥{Number(rowData.zkprice).toFixed(2)}
                            <span> ￥{Number(rowData.price).toFixed(2)}</span>
                        </p>

                    </div>
                </div>
            );
        };
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource.cloneWithRows(list)}
                renderFooter={() => (<div style={{padding: 30, textAlign: 'center', lineHeight: "1rem"}}>
                    { hasMore && isFetching && <span style={{marginTop:".3rem"}}><Icon type="loading"/></span>}

                    { hasMore && !isFetching && <span style={{marginTop:".3rem"}}><Icon type="loading"/></span>}

                    { !hasMore && !isFetching && <span style={{marginTop:".3rem"}}>已经到底啦</span>}
                </div>)}
                renderRow={row}
                // renderSeparator={separator}
                className="am-list"
                initialListSize={list.length}
                pageSize={20}
                useBodyScroll
                onScroll={() => {
                    // this.props.getScroll(window.scrollY)
                }}
                scrollRenderAheadDistance={2000}
                scrollEventThrottle={30}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={1000}
            />
        );
    }
}

export default MoreList;