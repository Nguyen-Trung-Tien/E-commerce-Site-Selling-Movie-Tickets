import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchUsers } from '../service/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalAddNew from './ModalAddNew';
import ModalEditUsers from './ModalEditUsers';
import ModalConfirm from './ModalConfirm';
import './TableUsser.scss';

import _ from 'lodash';
const TableUsers = (porps) => {
    const [ListUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    const [totalPage, setTotalPage] = useState(0);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...ListUsers]);
    };

    const handleEditUsersFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(ListUsers);
        let index = ListUsers.findIndex(item => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);

    };

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUsers = _.cloneDeep(ListUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers);
    }

    useEffect(() => {
        // call api
        getUsers(1);
    }, []);

    const getUsers = async (page) => {
        let res = await fetchUsers(page);
        if (res && res.data) {
            setTotalUsers(res.total);
            setListUsers(res.data);
            setTotalPage(res.total_pages);
        }
        else {
            toast.error("Something went wrong!");
        }
    };

    const handlePageClick = (event) => {
        console.log('>> Check event', event.selected);
        getUsers(+event.selected + 1);
    };

    const handleEditUsers = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    };

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);

    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(ListUsers);
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
        setListUsers(cloneListUsers);
    }



    return (<>
        <div className='my-3 add-new'>
            <samp><b>List users:</b></samp>
            <button className="btn btn-success"
                onClick={() => setIsShowModalAddNew(true)}
            >Add user</button>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        <div className='sort-header'>
                            <span>ID</span>
                            <span>
                                <i
                                    className="fa-solid fa-arrow-down-long"
                                    onClick={() => handleSort("desc", "id")}

                                ></i>
                                <i className="fa-solid fa-arrow-up-long"
                                    onClick={() => handleSort("asc", "id")}
                                ></i>
                            </span>
                        </div>
                    </th>
                    <th >
                        <div className='sort-header'>
                            <span>First Name</span>
                            <span>
                                <i
                                    className="fa-solid fa-arrow-down-long"
                                    onClick={() => handleSort("desc", "first_name")}

                                ></i>
                                <i className="fa-solid fa-arrow-up-long"
                                    onClick={() => handleSort("asc", "first_name")}
                                ></i>
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className='sort-header'>
                            <span>Last Name</span>
                            <span>
                                <i className="fa-solid fa-arrow-down-long"></i>
                                <i className="fa-solid fa-arrow-up-long"></i>
                            </span>
                        </div>
                    </th>
                    <th >
                        <div className='sort-header'>
                            <span>Email</span>
                            <span><i className="fa-solid fa-envelope"></i>
                            </span>
                        </div>
                    </th>
                    <th >
                        <div className='sort-header'>
                            <span>Actions</span>

                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {ListUsers.map((item, index) => {
                    return (
                        <tr key={`user-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>

                            <td>
                                <button
                                    className='btn btn-warning mx-3'
                                    onClick={() => handleEditUsers(item)}
                                >Edit</button>
                                <button
                                    onClick={() => handleDeleteUser(item)}
                                    className='btn btn-danger mx-3'>
                                    Delete
                                </button>
                            </td>

                        </tr>
                    )
                })}
            </tbody>

        </Table>
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPage}
            previousLabel="< previous"
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            nextLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
        />
        <ModalAddNew
            show={isShowModalAddNew}
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
        />
        <ModalEditUsers
            show={isShowModalEdit}
            dataUserEdit={dataUserEdit}
            handleEditUsersFromModal={handleEditUsersFromModal}
            handleClose={handleClose}
        />
        <ModalConfirm
            show={isShowModalDelete}
            handleClose={handleClose}
            dataUserDelete={dataUserDelete}
            handleDeleteUserFromModal={handleDeleteUserFromModal}
        />
    </>);
}
export default TableUsers;