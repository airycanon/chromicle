import React, {Component} from 'react';
import {Row, Col, Checkbox, Icon, Badge} from 'antd';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';

@inject('store')
export default class HistoryItem extends Component {

    render() {
        const {store, range, history} = this.props;

        return (<Row className="history-row">
                <Col span={1}><Checkbox/></Col>
                <Col span={22}>
                    <div className="website-icon" style={{
                        backgroundImage: '-webkit-image-set(url(chrome://favicon/size/16@1x/' + history.url + ') 1x,' +
                        ' url(chrome://favicon/size/16@2x/' + history.url + ') 2x)'
                    }}
                    />
                    <a className="history-label" target="_blank" href={history.url}>{history.title}</a>
                </Col>
                <Col span={1}><Icon type="close" onClick={() => {
                    store.remove(range, history)
                }}/></Col>
            </Row>
        );
    }
}

HistoryItem.propTypes = {
    history: PropTypes.object.isRequired,
    range: PropTypes.object.isRequired,
};
