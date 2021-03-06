import React, { Component } from 'react';
import { Balloon, Button, Icon } from '@alifd/next';
import PropTypes from 'prop-types';

export default class BalloonConfirm extends Component {
  static displayName = 'BalloonConfirm';

  static propTypes = {
    /**
     * 样式名
     */
    className: PropTypes.string,
    /**
     * 确认按钮文字
     */
    confirmText: PropTypes.string,
    /**
     * 取消按钮文字
     */
    cancelText: PropTypes.string,
    /**
     * 确认框描述
     */
    title: PropTypes.string,
    /**
     * 点击取消的回调
     */
    onCancel: PropTypes.func,
    /**
     * 确认框描述
     */
    onConfirm: PropTypes.func,
    /**
     * 自定义Icon
     */
    Icon: PropTypes.element,
  };

  static defaultProps = {
    className: undefined,
    confirmText: '确定',
    cancelText: '取消',
    title: '',
    onCancel: () => {},
    onConfirm: () => {},
    Icon: (
      <Icon
        type="warning"
        style={{
          color: '#FFA003',
        }}
      />
    ),
  };

  constructor(props) {
    super(props);

    this.confirmRef = React.createRef();
  }

  handleCanel = (e) => {
    const { onCancel } = this.props;
    onCancel(e);
    this.closeBallon();
  };

  handleOk = (e) => {
    const { onConfirm } = this.props;
    onConfirm(e);
    this.closeBallon();
  };

  closeBallon = () => {
    this.confirmRef.current.getInstance().setState({
      visible: false,
    });
  }

  render() {
    const { children, className, title, confirmText, cancelText, Icon: IconComponent } = this.props;

    return (
      <Balloon
        triggerType="click"
        closable={false}
        {...this.props}
        className={`ice-ballon-confirm${className ? ` ${className}` : ''}`}
        trigger={children}
        ref={this.confirmRef}
      >
        <div className="ice-ballon-confirm-title">
          {IconComponent}
          {title}
        </div>
        <div className="ice-ballon-confirm-btn-group">
          <Button size="small" onClick={this.handleCanel}>
            {cancelText}
          </Button>
          <Button size="small" type="primary" onClick={this.handleOk}>
            {confirmText}
          </Button>
        </div>
      </Balloon>
    );
  }
}
