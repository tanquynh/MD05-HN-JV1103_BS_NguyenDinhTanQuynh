import React, { useEffect, useState } from 'react';

export default function EditForm({ show, handleClose, handleUpdate, todo }) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
        }
    }, [todo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === "") {
            setError("Tên công việc không được để trống");
            return;
        }
        handleUpdate(todo.id, title);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h4 className="modal-title">Sửa công việc</h4>
                            <button type="button" className="close" onClick={handleClose}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Cập nhật công việc</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Nhập tên công việc"
                                />
                            </div>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                Thoát
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
