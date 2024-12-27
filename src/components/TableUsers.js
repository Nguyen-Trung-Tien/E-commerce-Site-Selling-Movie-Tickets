import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchUsers } from '../service/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalAddNew from './ModalAddNew';
import ModalEditUsers from './ModalEditUsers';
import ModalConfirm from './ModalConfirm';
import { debounce } from 'lodash';
import './TableUsser.scss';
import { CSVLink } from "react-csv";
import Papa from 'papaparse';


import _, { get } from 'lodash';
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

    const [keyword, setKeyword] = useState("");
    const [dataExport, setDataExport] = useState([]);

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

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(ListUsers);
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
            setListUsers(cloneListUsers);
        } else {
            getUsers(1);
        }
    }, 300);



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

    const getUsersExport = (event, done) => {
        let result = [];
        if (ListUsers && ListUsers.length > 0) {
            result.push(["Id", "Email", "First_name", "Last_name"]);
            ListUsers.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            });

            setDataExport(result);
            done();
        }
    };

    const handleImportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            if (file.type !== "text/csv") {
                toast.error("Only support file csv!");
                return;
            }
            Papa.parse(file, {
                //header: true,
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (rawCSV[0][0] !== "email"
                                || rawCSV[0][1] !== "first_name"
                                || rawCSV[0][2] !== "last_name") {
                                toast.error("Wrong format header of CSV file!");
                            }
                            else {
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj);
                                    }
                                })
                                setListUsers(result);
                            }

                        } else {
                            toast.error("Wrong format of CSV file!");
                        }

                    } else
                        toast.error("Not found data on CSV file!");
                }
            });
        }

    };

    return (<>
        <div className='my-3 add-new'>
            <span><b>List users:</b></span>
            <div className='group-btn'>
                <label htmlFor='test' className="btn btn-warning">
                    <i className="fa-solid fa-file-import"></i> Import
                </label>
                <input
                    onChange={(event) => handleImportCSV(event)}
                    id='test' type='file' hidden />


                <CSVLink
                    filename={"users.csv"}
                    className="btn btn-primary"
                    data={dataExport}
                    asyncOnClick={true}
                    onClick={getUsersExport}>
                    <i className="fa-solid fa-file-arrow-down"></i> Export</CSVLink>
                <button className="btn btn-success"
                    onClick={() => setIsShowModalAddNew(true)}>
                    <i className="fa-solid fa-circle-plus"></i> Add new
                </button>
            </div>

        </div >
        <div className='col-4 my-3'>
            <input
                className="form-control"
                placeholder='Search user by email'
                // value={keyword}
                onChange={(event) => handleSearch(event)}
            />

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