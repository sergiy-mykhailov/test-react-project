
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Input, Icon } from 'antd';
import './Style.less';

class EditableCell extends Component {
    static defaultProps = {
        value: null,
        isNew: false,
        onChange: () => {},
    };
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        isNew: PropTypes.bool,
        onChange: PropTypes.func,
    };

    state = {
        value: this.props.value,
        editable: false,
    };

    handleChange = (e) => {
        const value = e.target.value;
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

    render() {
        const { isNew } = this.props;
        const { value, editable } = this.state;

        return (
            <div className="editable-cell">
                {
                    editable ? (
                        <Input
                            value={value}
                            onChange={this.handleChange}
                            onPressEnter={this.check}
                            suffix={
                                <Icon
                                    type="check"
                                    className="editable-cell-icon-check"
                                    onClick={this.check}
                                />
                            }
                        />
                    ) : (
                        <div style={{ paddingRight: 24 }}>
                            {value || ' '}
                            {isNew
                                ? <Icon
                                    type="edit"
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