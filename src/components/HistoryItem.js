import React, {Component} from 'react';
import {Row, Col, Checkbox, Icon, Tooltip} from 'antd';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

@inject('historyStore', 'viewStore', 'bookmarkStore')
@observer
export default class HistoryItem extends Component {

    render() {
        const {historyStore, viewStore, history} = this.props;

        const star = history.bookmark ? 'star' : 'star-o';

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
                    <Tooltip placement="top" title="添加到书签">
                        <Icon type={star} onClick={() => {
                            viewStore.bookmarkHistory = history;
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
