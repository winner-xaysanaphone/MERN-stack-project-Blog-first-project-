import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

export class TodosList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos:[]
        }
    }
    componentDidMount = async() =>{
        try{
        let res = await axios.get('http://localhost:4000/todos/');
        let data = res.data;
        this.setState({todos: data})
          
        }catch(error){
            console.error(error);
        }
    }
    todoList =()=>{
        return this.state.todos.map( (currentTodo, i)=>{
            return <Todo todo={currentTodo} key={i}/>
        })
    }
    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        );
    }
}