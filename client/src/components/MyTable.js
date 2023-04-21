import React, {useEffect, useState} from "react";
import Moment from 'moment';
Moment.locale('en');

const status_map = {
    "todo" : "To-Do",
    "inprogress" : "In Progress",
    "done" : "Done"
}
const MyTable = (props) => {
    useEffect(() => {
        props.GetTodos();
    }, []);

    return (
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {props.todos.map((row, index) => (
                <tr key={index}>
                    <td>{row.title}</td>
                    <td>{status_map[row.status]}</td>
                    <td>{Moment(new Date(row.due_date)).format('MM/DD/YYYY')}</td>
                    <td>
                        <div className="action" onClick={() => props.deleteTodo(row._id)}>Delete</div>&nbsp;
                        <div className="action" onClick={() => props.handleEdit(row)}>Edit</div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default MyTable;
