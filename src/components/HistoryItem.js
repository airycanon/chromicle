import React, {Component} from 'react';
import {Row, Col} from 'antd';
import PropTypes from 'prop-types';

export default class HistoryItem extends Component {

    render() {
        const {history} = this.props;

        return (<Row style={{padding: '2px 0'}}>
                <Col span={1}>
                    <div className="website-icon" style={{
                        backgroundImage: '-webkit-image-set(url(chrome://favicon/size/16@1x/' + history.url + ') 1x,' +
                        ' url(chrome://favicon/size/16@2x/' + history.url + ') 2x)'
                    }}
                    />
                </Col>
                <Col span={23}>
                    <a className="history-label" style={{fontSize:'16px'}} href={history.url}>{history.title} {history.visitCount}</a>
                </Col>
            </Row>
        );
    }
}

HistoryItem.propTypes = {
    history: PropTypes.object.isRequired,
};
