import React, {Component} from 'react';
import {Row, Col, Checkbox, Icon, Badge} from 'antd';
import PropTypes from 'prop-types';
import {inject,observer} from 'mobx-react';

@inject('historyStore', 'viewStore')
@observer
export default class HistoryItem extends Component {

    render() {
        const {historyStore, history} = this.props;

        return (<Row className="history-row">
                <Col span={1}>
                    <Checkbox defaultChecked={history.checked} checked={history.checked} onChange={this.onChange.bind(this)}/>
                </Col>
                <Col span={22}>
                    <div className="website-icon" style={{
                        backgroundImage: '-webkit-image-set(url(chrome://favicon/size/16@1x/' + history.url + ') 1x,' +
                        ' url(chrome://favicon/size/16@2x/' + history.url + ') 2x)'
                    }}/>
                    <a className="history-label" target="_blank" href={history.url}>{history.id} - {history.title}</a>
                    <Icon type="close" onClick={() => {
                        historyStore.removeHistory(history)
                    }}/>
                </Col>
            </Row>
        );
    }

    onChange(event) {
        const {viewStore, history} = this.props;
        history.checked = event.target.checked;

        if(event.target.checked) {
            viewStore.selectedHistories.push(history);
        } else {
            viewStore.selectedHistories.remove(history);
        }

        console.log(history.id);
    }
}

HistoryItem.propTypes = {
    history: PropTypes.object.isRequired
}
