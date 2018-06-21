
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber } from 'antd';
import IconEdit from 'react-icons/lib/md/edit';
import IconCheck from 'react-icons/lib/md/check';
import './Style.less';

class EditableCell extends Component {
  static defaultProps = {
    value: null,
    isNew: false,
    type: 'string',
    onChange: () => {},
  };
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isNew: PropTypes.bool,
    type: PropTypes.string,
    onChange: PropTypes.func,
  };

  state = {
    value: this.props.value,
    editable: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  };

  handleChangeNumber = (value) => {
    this.setState({ value });
  };

  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };

  edit = () => {
    this.setState({ editable: true });
  };

  renderInput = () => {
    const { value } = this.state;

    return (
      <Input
        value={value}
        onChange={this.handleChange}
        onPressEnter={this.check}
        onBlur={this.check}
        suffix={
          <IconCheck
            className="editable-cell-icon-check"
            onClick={this.check}
          />
        }
      />
    );
  };

  renderInputNumber = () => {
    const value = Number.isNaN(this.state.value) ? 0 : Number(this.state.value);

    return (
      <InputNumber
        value={value}
        min={0}
        parser={value => value.replace(/[^0-9.]/g, '')}
        // precision={2}
        onChange={this.handleChangeNumber}
        onPressEnter={this.check}
        onBlur={this.check}
        suffix={
          <IconCheck
            className="editable-cell-icon-check"
            onClick={this.check}
          />
        }
      />
    );
  };

  renderInputCell = () => {
    const { type } = this.props;

    return type === 'number' ? this.renderInputNumber() : this.renderInput();
  };

  render() {
    const { isNew } = this.props;
    const { value, editable } = this.state;

    return (
      <div className="editable-cell">
        {
          editable ? (
            this.renderInputCell()
          ) : (
            <div style={{ paddingRight: 24 }}>
              {value || ' '}
              {isNew
                ? <IconEdit
                  className="editable-cell-icon"
                  onClick={this.edit}
                />
                : null}
            </div>
          )
        }
      </div>
    );
  }
}

export default EditableCell;
