import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { putUpdateUser } from '../service/userService';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const ModalEditUsers = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUsersFromModal } = props;
    const [name, setName] = useState(dataUserEdit.first_name);
    const [job, setJob] = useState(dataUserEdit.job);
    const handleEditUsers = async () => {
        let res = await putUpdateUser(dataUserEdit.id, name, job);
        if (res && res.updatedAt) {
            // success
            handleEditUsersFromModal({
                id: dataUserEdit.id,
                job: job,
                first_name: name,
            });
            toast.success("Edit user success!");
            handleClose();
        }
    }

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
            setJob(dataUserEdit.job);
        }
    }, [dataUserEdit, show]);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">

                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Job</label>
                            <input type="text" className="form-control"
                                value={job} onChange={(event) => setJob(event.target.value)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUsers()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalEditUsers;
