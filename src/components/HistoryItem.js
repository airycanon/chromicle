import React, {Component} from 'react';
import {Row, Col, Checkbox, Icon, Tooltip} from 'antd';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import viewStore from "../stores/ViewStore";

@inject('historyStore', 'viewStore', 'bookmarkStore')
@observer
export default class HistoryItem extends Component {

    render() {
        const {historyStore, bookmarkStore, history} = this.props;

        return (<Row className="history-row">
                <Col span={1}>
                    <Checkbox defaultChecked={history.checked} checked={history.checked} onChange={this.onChange.bind(this)}/>
                </Col>
                <Col span={21}>
                    <div className="website-icon" style={{
                        backgroundImage: '-webkit-image-set(url(chrome://favicon/size/16@1x/' + history.url + ') 1x,' +
                        ' url(chrome://favicon/size/16@2x/' + history.url + ') 2x)'
                    }}/>
                    <a className="history-label" target="_blank" href={history.url}>{history.title}</a>
                </Col>
                <Col className="col-right" span={2}>
                    <Tooltip placement="top" title="收藏">
                        <Icon type="star-o" onClick={() => {
                            viewStore.showBookmark = true;
                        }}/>
                    </Tooltip>
                    <Tooltip placement="top" title="删除">
                        <Icon type="close-circle-o" onClick={() => {
                            historyStore.removeHistory(history)
                        }}/>
                    </Tooltip>
                </Col>

            </Row>
        );
    }

    onChange(event) {
        const {viewStore, history} = this.props;
        history.checked = event.target.checked;

        if (event.target.checked) {
            viewStore.addChecked(history);
        } else {
            viewStore.addChecked(history);
        }
    }
}

HistoryItem.propTypes = {
    history: PropTypes.object.isRequired
}
