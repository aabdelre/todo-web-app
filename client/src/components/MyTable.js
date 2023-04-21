import React, {useEffect, useState} from "react";
const api_base = 'http://localhost:3001';
function MyTable() {
    const [tableData, setTableData] = useState([]);
    const GetTodos = () => {
        fetch(api_base + '/todos')
            .then(res => res.json())
            .then(data => setTableData(data))
            .catch((err) => console.error("Error: ", err));
    };
    useEffect(() => {
        GetTodos();
    }, []);

    const handleDelete = async id => {
        const data = await fetch(api_base + '/todo/delete/' + id, {method: "DELETE"}).then(res => res.json());
        setTableData(tableData => tableData.filter(todo => todo.id !== data.result._id));
    };

    return (
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {tableData.map((row, index) => (
                <tr key={index}>
                    <td>{row.title}</td>
                    <td>{row.description}</td>
                    <td>{row.status}</td>
                    <td>
                        <button onClick={() => handleDelete(row._id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

function App() {
    return (
        <div>
            <MyTable />
        </div>
    );
}

export default App;
