import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteUser } from '../service/userService';
import { toast } from 'react-toastify';
const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;
    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);
        if (res && +res.statusCode === 204) {
            toast.success("Delete user success!");
            handleClose();
            handleDeleteUserFromModal(dataUserDelete);
        } else {
            toast.error("Delete user failed!");
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <h6>This action can't be undone!</h6>
                        <br />
                        <h6>Do you want to Delete this user?
                            <br /><b>email= {dataUserDelete.email}</b> </h6>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalConfirm;
