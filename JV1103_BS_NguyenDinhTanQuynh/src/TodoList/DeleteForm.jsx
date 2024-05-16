import React from 'react';

export default function DeleteForm({ show, handleClose, handleDelete, todoDelete }) {
    const handleSubmit = () => {
        handleDelete(todoDelete.id);
        handleClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Xóa công việc</h4>
                        <button type="button" className="close" onClick={handleClose}>
                            ×
                        </button>
                    </div>
                    <div className="modal-body d-flex align-items-center">
                        <i class="text-red-500 fas fa-exclamation-circle text-2xl mr-2" style={{ color: 'red' }}></i>
                        <p class="ml-2 mb-0">Bạn có xác nhận xóa công việc <strong>"{todoDelete.title}"</strong> không?</p>
                    </div>


                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn-forcus" onClick={handleClose}>
                            Hủy
                        </button>
                        <button type="button" className="btn btn-primary btn-forcus" onClick={handleSubmit}>
                            Đồng Ý
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
