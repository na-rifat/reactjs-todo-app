import React, { Component } from "react";
import { PropTypes } from "prop-types";

export class AddTodo extends Component {
    state = {
        title: ``,
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.AddTodo(this.state.title);
        this.setState({ title: `` });
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <form
                style={{
                    display: `flex`,
                }}
                onSubmit={this.onSubmit}
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Add Todo...."
                    style={{ flex: 10, paddidng: `5px` }}
                    value={this.state.title}
                    onChange={this.onChange}
                />
                <input
                    type="submit"
                    value="Submit"
                    className="btn"
                    style={{
                        flex: 1,
                    }}
                />
            </form>
        );
    }
}

// PropTypes
AddTodo.propType = {
    AddTodo: PropTypes.func.isRequired,
};

export default AddTodo;
