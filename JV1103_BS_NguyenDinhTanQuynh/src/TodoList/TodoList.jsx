import React, { useRef, useState } from 'react';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';

export default function TodoList() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState(() => {
        const list = JSON.parse(localStorage.getItem("todos")) || [];
        return list;
    });
    const [idDelete, setIdDelete] = useState(null);
    const [idEdit, setIdEdit] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [error, setError] = useState("")
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input === "") {
            setError("Tên công việc không được để trống");
            return
        };

        if (idEdit !== null) {
            const newList = todos.map(t => t.id === idEdit ? { ...t, title: input } : t);
            setTodos(newList);
            localStorage.setItem("todos", JSON.stringify(newList));
            setIdEdit(null);
        } else {
            const newTodo = {
                id: Date.now(),
                title: input,
                status: false,
            };
            const newList = [...todos, newTodo];
            setTodos(newList);
            localStorage.setItem("todos", JSON.stringify(newList));
        }

        setInput("");
        inputRef.current.focus();
    };

    const handleDelete = (id) => {
        const newList = todos.filter(t => t.id !== id);
        setTodos(newList);
        localStorage.setItem("todos", JSON.stringify(newList));
        inputRef.current.focus();
    };

    const handleCheck = (id) => {
        const newList = todos.map(t => t.id === id ? { ...t, status: !t.status } : t);
        setTodos(newList);
        localStorage.setItem("todos", JSON.stringify(newList));
    };

    const handleShowDelete = (id) => {
        setIdDelete(id);
        setShowDelete(true);
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
    };

    const handleShowEdit = (id) => {
        setIdEdit(id);
        setShowEdit(true);
    };

    const handleCloseEdit = () => {
        setShowEdit(false);
    };

    const handleUpdate = (id, title) => {
        if (title.trim() === "") {
            setError("Tên công việc không được để trống");
            return
        };
        const newList = todos.map(t => t.id === id ? { ...t, title } : t);
        setTodos(newList);
        localStorage.setItem("todos", JSON.stringify(newList));
        setShowEdit(false);
    };


    // Tính toán số lượng công việc đã hoàn thành
    const completedCount = todos.filter(t => t.status).length;
    const totalCount = todos.length;

    return (
        <>
            <DeleteForm show={showDelete} handleClose={handleCloseDelete} handleDelete={handleDelete} todoDelete={todos.find(t => t.id === idDelete)} />
            <EditForm show={showEdit} handleClose={handleCloseEdit} handleUpdate={handleUpdate} todo={todos.find(t => t.id === idEdit)} />

            <div>
                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100 custom-container">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-10">
                                <div className="card">
                                    <div className="card-body p-5">
                                        <h3 className="text-center" style={{ marginBottom: 10 }}>Danh sách công việc</h3>
                                        <hr />
                                        <div className="text-center mb-3">

                                        </div>
                                        <div className="tab-content">
                                            <div className="tab-pane fade show active">
                                                <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center mb-4">
                                                    
                                                        <input
                                                            type="text"
                                                            id="form2"
                                                            className="form-control input-hover"
                                                            style={{ border: "1px solid #afafaf" }}
                                                            value={input}
                                                            onChange={(e) => setInput(e.target.value)}
                                                            ref={inputRef}
                                                            placeholder="Nhập tên công việc"
                                                        />
                                                 

                                                    <button type="submit" className="btn btn-primary ms-2">
                                                        THÊM
                                                    </button>
                                                </form>
                                                {error && <p style={{ color: "red" }}>{error}</p>}

                                                <ul className="list-group mb-0 ">
                                                    {todos.length === 0 ? (
                                                        <div className="text-center" >
                                                            <img src="https://t4.ftcdn.net/jpg/05/86/21/03/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg"className="custom-image" alt="No todos" />
                                                        </div>

                                                    ) : (
                                                        todos.map(t => (
                                                            <li key={t.id} className="list-group-item d-flex align-items-center border-0 mb-2 rounded justify-content-between" style={{ backgroundColor: "#f4f6f7" }}>
                                                                <span>
                                                                    <input
                                                                        className="form-check-input me-2"
                                                                        type="checkbox"
                                                                        checked={t.status}
                                                                        onChange={() => handleCheck(t.id)}
                                                                    />
                                                                    {t.status ? <s>{t.title}</s> : t.title}
                                                                </span>
                                                                <div>
                                                                    <a className="text-info btn-forcus" title="Sửa công việc" onClick={() => handleShowEdit(t.id)}>
                                                                        <i className="fas fa-pencil-alt me-3" />
                                                                    </a>
                                                                    <a onClick={() => handleShowDelete(t.id)} className="text-danger btn-forcus" title="Xóa công việc">
                                                                        <i className="fas fa-trash-alt" />
                                                                    </a>
                                                                </div>
                                                            </li>
                                                        ))
                                                    )}

                                                    {totalCount === 0 ? "" : (completedCount !== totalCount ? (
                                                        <span>Công việc hoàn thành: <strong>{completedCount}/{totalCount}</strong></span>
                                                    ) : (
                                                        <div className='d-flex m-20 justify-content-center align-items-center'>
                                                            <div className="text-success mr-3">
                                                                <i className="fas fa-check-circle text-[#50B83C] text-2xl" />
                                                            </div>
                                                            <strong>Hoàn thành toàn bộ</strong>
                                                        </div>

                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
