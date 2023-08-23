import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";

// import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";

import useValidation from "../common/useValidation";
import Loader from "../common/loader";

import Sidebar from "../common/sidebar";
import {
  getAdminList,
  addAdminFunction,
  UpdateAdminFunction,
  getAdminfilter,
} from "../api/api";

const ManageAdmin = () => {
  // add Admin data json
  const initialFormState = {
    admin_email: "",
    admin_name: "",
    admin_phone: "",
    admin_type: "",
    admin_password: "",
  };
  const [AdminAssignAlert, setAdminAssignAlert] = useState(false);
  const [apicall, setapicall] = useState(false);

  // const [ShowDeleteAlert, setShowDeleteAlert] = useState(false);
  const [superAdminUpdateAlert, setsuperAdminUpdateAlert] = useState(false);
  const [superAdminAddAlert, setsuperAdminAddAlert] = useState(false);
  const [updateAdminAlert, setUpdateAdminAlert] = useState(false);
  const [AdminAlert, setAdminAlert] = useState(false);

  const [AdminErrorAlert, setAdminErrorAlert] = useState(false);
  const [AdminList, setAdminList] = useState([]);
  const [showmodel, setShowmodel] = useState(false);
  const [loading, setLoading] = useState(false);

  const [adminNameError, setAdminNameError] = useState(false);
  const [adminTypeError, setAdminTypeError] = useState(false);

  // search state data---------
  const [searchdata, setsearchData] = useState({
    admin_name: "",
    admin_type: "",
  });

  // const [Id, setId] = useState("");

  //Admin data table coloumn-----
  const columns = [
    {
      name: "Admin Name",

      selector: (row) => row.admin_name || <b>unavailable</b>,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Admin Phone",
      selector: (row) => row.admin_phone || <b>unavailable</b>,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Admin Email",
      selector: (row) => row.admin_email || <b>unavailable</b>,
      sortable: true,
      width: "250px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },

    {
      name: "Admin password ",
      selector: (row) => row.admin_password || <b>unavailable</b>,
      sortable: true,
      width: "160px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },

    {
      name: "Admin type",
      selector: (row) => row.admin_type || <b>unavailable</b>,
      sortable: true,
      width: "140px",
      center: true,
    },

    {
      name: "Action",
      width: "110px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit
            className=" p-0  mr-1  editiconn text-secondary"
            onClick={handleEditShow.bind(
              this,
              row.id,
              row.admin_email,
              row.admin_name,
              row.admin_phone,
              row.admin_type,
              row.admin_password
            )}
          />
          {/* <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert.bind(this, row.id)}
          /> */}
        </div>
      ),
    },
  ];

  // Admin  validation---------------
  const validators = {
    admin_name: [
      (value) =>
        value === null || value === ""
          ? "Admin name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    admin_phone: [
      (value) =>
        value === null || value === ""
          ? "Contect number is required"
          : // : /^(\+\d{1,3}[- ]?)?\d{10}$/g.test(value)
          // ? "Invalid Mobile number "
          value.length > 10 || value.length < 10
          ? "Contect number should be 10 digit"
          : null,
    ],

    admin_email: [
      (value) =>
        value === null || value === ""
          ? " Admin  Email required"
          : !/^\S+@\S+\.\S+$/.test(value)
          ? "Invalid email address"
          : null,
    ],
    admin_password: [
      (value) =>
        value === null || value === ""
          ? "Admin Password is required"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            null,
    ],
    admin_type: [
      (value) =>
        value === null || value === ""
          ? "Admin Type is required"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            null,
    ],
  };

  //custom validation import--------------
  const {
    state,
    setState,
    onInputChange,
    errors,
    setErrors,
    validate,
  } = useValidation(initialFormState, validators);

  // search  inputfield onchange
  const searchValueHandler = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
    setAdminNameError(false);
    setAdminTypeError(false);
  };

  //search submit button
  const submitHandler = async () => {
    if (searchdata.admin_name === "" && searchdata.admin_type === "") {
      setAdminNameError("nameEmpty");
      setAdminTypeError("typeEmpty");
    } else {
      setLoading(true);
      const response = await getAdminfilter(
        searchdata.admin_name,
        searchdata.admin_type
      );
      setLoading(false);
      setAdminList(response);
    }
  };

  // reset button
  const OnReset = () => {
    setsearchData({
      admin_name: "",
      admin_type: "",
    });
    getAllAdminList();
    setapicall(true);
    setAdminNameError(false);
    setAdminTypeError(false);
  };

  //get all Admin list useEffect -----
  useEffect(() => {
    getAllAdminList();
  }, [apicall]);

  // get all Admin list funtion-------------
  const getAllAdminList = async () => {
    setLoading(true);
    const response = await getAdminList();
    setLoading(false);

    setAdminList(response);
  };

  // add Admin submit button---------------
  const handleAddAdmin = async (e) => {
    e.preventDefault();

    if (validate()) {
      const response = await addAdminFunction(state);
      if (response.response === "email already exist") {
        setAdminErrorAlert(true);
      }
      if (response.affectedRows === 1) {
        setAdminAlert(true);
      }
      if (response.response === "only add by super admin") {
        setsuperAdminAddAlert(true);
      }
    }
  };

  // Admin model show
  const handleShow = (e) => {
    if (e === "add") {
      setShowmodel(e);
    }
  };

  // Admin update  edit show--------------------
  const handleEditShow = async (id, email, name, phone, type, password) => {
    setState({
      id: id,
      admin_email: email,
      admin_name: name,
      admin_phone: phone,
      admin_type: type,
      admin_password: password,
    });
    setShowmodel(true);
  };

  //Admin registraion model close function-----------------
  const ModelCloseFunction = () => {
    setShowmodel(false);

    setState(initialFormState);
    setErrors({});
  };

  //Admin update fuction--
  const handleUpdateDriver = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await UpdateAdminFunction(state);
      if (response.affectedRows === 1) {
        setUpdateAdminAlert(true);
      }
      if (response.message === "only admin can do change") {
        setsuperAdminUpdateAlert(true);
      }
    }
  };

  // all alert close fuction
  const closeAdminAlert = () => {
    getAllAdminList();
    setState(initialFormState);
    setAdminAlert(false);
    setUpdateAdminAlert(false);
    setAdminErrorAlert(false);
    setsuperAdminUpdateAlert(false);
    setsuperAdminAddAlert(false);
    setShowmodel(false);
    setapicall(true);

    // setShowDeleteAlert(false);
  };

  const closeAssignAlert = () => {
    setAdminAssignAlert(false);
    // setDriverListView(false);
  };
  //delete Admin alert---
  // const handleAlert = (id) => {
  //   setShowDeleteAlert(true);
  //   setId(id);
  // };

  // delete Admin fuction------------
  // const deleteAdminAlert = async () => {
  // await AdminDeleteStatusChange(Id);
  // setShowDeleteAlert(false);
  // setapicall(true);
  //};

  return (
    <div>
      {loading === true ? <Loader /> : null}

      <div className="row admin_row">
        <div className="col-lg-3 col-md-6 col-sm-7 col-10">
          <Sidebar style={{ message: "manageAdmin" }} />
        </div>
        <div className="col-lg-9  admin_content_bar mt-5">
          <div className="main_content_div">
            <div
              className="dashboard-main-container mt-df25 mt-lg-31"
              id="dashboard-body"
            >
              <div className="">
                <div className="page_main_contant">
                  <h4> Admin</h4>
                  <div className=" mt-3 p-3">
                    <div className="row pb-3">
                      <div className="col-md-3 col-sm-6 aos_input mb-2">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="Search by Admin name"
                            name="admin_name"
                            onChange={searchValueHandler}
                            value={searchdata.admin_name}
                          />
                        </Form.Group>
                        {adminNameError === "nameEmpty" ? (
                          <span className="text-danger">
                            {" "}
                            Admin name is Empty
                          </span>
                        ) : null}
                      </div>

                      <div className="col-md-3 col-sm-6 aos_input mb-2">
                        <Form.Group className="mb-3">
                          <Form.Select
                            aria-label="Search by delivery"
                            size="sm"
                            className="w-100"
                            onChange={searchValueHandler}
                            name="admin_type"
                            value={searchdata.admin_type}
                          >
                            <option value="">Select Admin type</option>
                            <option value="admin">Admin</option>
                            <option value="super_admin">Super Admin</option>
                          </Form.Select>
                        </Form.Group>
                        {adminTypeError === "typeEmpty" ? (
                          <span className="text-danger">
                            {" "}
                            Admin type is Empty
                          </span>
                        ) : null}
                      </div>

                      <div className="col-md-2 col-sm-6 aos_input mb-2">
                        <div>
                          <Button
                            type=""
                            name=""
                            value=""
                            className="button  btn-success main_button w-100"
                            onClick={submitHandler}
                          >
                            Search
                          </Button>
                        </div>
                      </div>
                      <div className="col-md-2 col-sm-6 aos_input mb-2">
                        <div>
                          <Button
                            type="reset"
                            name=""
                            value=""
                            className="button btn-success  main_button w-100"
                            onClick={OnReset}
                          >
                            Reset
                          </Button>
                        </div>
                      </div>
                      <div className="col-md-2 col-sm-6 aos_input mb-2">
                        <Button
                          className="button btn-success  main_button w-100"
                          onClick={() => handleShow("add")}
                        >
                          Add admin
                        </Button>
                      </div>
                    </div>

                    <DataTable
                      columns={columns}
                      data={AdminList}
                      pagination
                      highlightOnHover
                      pointerOnHover
                      className={"table_body Admin_table"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        size="lg"
        show={showmodel}
        onHide={ModelCloseFunction}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Form
          className="p-2 addAdmin_form"
          onSubmit={
            showmodel === "add"
              ? (e) => handleAddAdmin(e)
              : (showmodel) => handleUpdateDriver(showmodel)
          }
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {showmodel === "add" ? "Register Admin " : "Update  Admin"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Name <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.admin_name
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="text"
                    value={state.admin_name}
                    name="admin_name"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="admin_name"
                  />
                  {errors.admin_name
                    ? (errors.admin_name || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Phone
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={
                      errors.admin_phone
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.admin_phone}
                    name="admin_phone"
                    onChange={(v) => {
                      if (v.target.value.length <= 10) {
                        onInputChange(v);
                      }
                    }}
                    id="admin_phone"
                  />
                  {errors.admin_phone
                    ? (errors.admin_phone || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Email
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    className={
                      errors.admin_email
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    // disabled={showmodel === "add" ? "false" :  "true"}
                    value={state.admin_email}
                    name="admin_email"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="admin_email"
                  />
                  {errors.admin_email
                    ? (errors.admin_email || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Password.
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    className={
                      errors.admin_password
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.admin_password}
                    name="admin_password"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="admin_password"
                  />
                  {errors.admin_password
                    ? (errors.admin_password || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Admin type.
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Select
                    aria-label="Search by delivery"
                    size="sm"
                    className={
                      errors.admin_type
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    onChange={onInputChange}
                    name="admin_type"
                    value={state.admin_type}
                  >
                    <option value="">Select Admin type</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </Form.Select>
                  {errors.admin_type
                    ? (errors.admin_type || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-3 col-sm-4 p-2 text-center">
                <div className="manufacture_date addvariety_inputbox">
                  <Button
                    variant="outline-success"
                    className="addcategoryicon w-100"
                    type={"submit"}
                  >
                    {showmodel === "add" ? "Add Admin" : "Update Admin"}
                  </Button>
                </div>
              </div>
              <div className="col-md-3 col-sm-4 p-2 text-center"></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={setLgShow(false)}>Close</Button> */}
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Add images model */}

      <SweetAlert
        show={AdminAlert}
        title="Added Successfully"
        text={"Admin Added"}
        onConfirm={closeAdminAlert}
        // showCancelButton={}
        // onCancel={}
      />
      <SweetAlert
        show={AdminErrorAlert}
        title="Admin Already registerd"
        text={"Please add another Admin"}
        onConfirm={closeAdminAlert}
        // showCancelButton={}
        // onCancel={}
      />

      <SweetAlert
        show={updateAdminAlert}
        title="Updated Successfully"
        text={"Admin update"}
        onConfirm={closeAdminAlert}
        // showCancelButton={}
        // onCancel={}
      />
      <SweetAlert
        show={superAdminUpdateAlert}
        title="Only Super Admin can change"
        text={"Cannot change"}
        onConfirm={closeAdminAlert}
        // showCancelButton={}
        // onCancel={}
      />

      <SweetAlert
        show={superAdminAddAlert}
        title="Only Add by Super Admin"
        text={"Can Not change"}
        onConfirm={closeAdminAlert}
        // showCancelButton={}
        // onCancel={}
      />
      <SweetAlert
        show={AdminAssignAlert}
        title="Assigned Successfully"
        text={"Assign"}
        onConfirm={closeAssignAlert}
        // showCancelButton={}
        // onCancel={}
      />

      {/* <SweetAlert
        show={ShowDeleteAlert}
        title="Delete"
        text="Are you Sure you want to delete"
        onConfirm={deleteAdminAlert}
        showCancelButton={true}
        onCancel={closeAdminAlert}
      /> */}
    </div>
  );
};
export default ManageAdmin;
