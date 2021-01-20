import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Todos from "./components/Todos";
import { Header } from "./components/layout/Header";
import { AddTodo } from "./components/AddTodo";
import About from "./components/pages/About";
import axios from "axios";

class App extends Component {
    state = {
        todos: [],
    };

    componentDidMount = () => {
        axios
            .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
            .then((res) => {
                this.setState({ todos: res.data });
            });
    };

    // Mark as complete
    markComplete = (id) => {
        this.setState({
            todos: this.state.todos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            }),
        });
    };

    // Delete Todo
    delTodo = (id) => {
        axios
            .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then((res) =>
                this.setState({
                    todos: [
                        ...this.state.todos.filter((todo) => todo.id !== id),
                    ],
                })
            );
    };

    // Add Todo
    addTodo = (title) => {
        axios
            .post("https://jsonplaceholder.typicode.com/todos", {
                title,
                completed: false,
            })
            .then((res) =>
                this.setState({ todos: [...this.state.todos, res.data] })
            );
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header />
                        {/* Index route */}
                        <Route
                            exact
                            path="/"
                            render={(props) => (
                                <React.Fragment>
                                    <AddTodo AddTodo={this.addTodo} />
                                    <Todos
                                        todos={this.state.todos}
                                        markComplete={this.markComplete}
                                        delTodo={this.delTodo}
                                    />
                                </React.Fragment>
                            )}
                        />
                        {/* <Route path="/about" component={About} /> */}
                        <Route
                            path="/about"
                            render={(props) => (
                                <React.Fragment>
                                    <About />
                                </React.Fragment>
                            )}
                        />
                    </div>
                </div>
            </Router>
        );
    }
}
export default App;
