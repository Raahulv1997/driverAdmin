import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";

import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";

import useValidation from "../common/useValidation";

import Sidebar from "../common/sidebar";
import {
  AddDriverByAdmin,
  DriverDeleteStatusChange,
  DriverUpdateStatus,
  getDriverFilter,
  getDriverList,
  getDriverListById,
  UpdateDriverByAdmin,
} from "../api/api";
import moment from "moment";
import ModelForm from "../common/WorkingAreaModelForm";
import Loader from "../common/loader";
const AddDriver = () => {
  //add driver json
  const initialFormState = {
    driver_name: "",
    driver_last_name: "",
    date_of_birth: "",
    current_address: "",
    gender: "",
    age: "",
    email: "",
    password: "",
    contect_no: "",
    aadhar_no: "",
    licence_no: "",
    licence_issue_date: "",
    licence_validity_date: "",
    image: "",
    licence: "",
    aadhar_card: "",
    // current_latitude: "",
    // current_longitude: "",
  };
  const [driverList, setDriverList] = useState([]);
  const [apicall, setapicall] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [imagefilename, setImageFilename] = useState("");
  const [ProductAlert, setProductAlert] = useState(false);
  const [UpdateAlert, setupdateAlert] = useState(false);
  const [ShowDeleteAlert, setShowDeleteAlert] = useState(false);
  const [adharFile, setAdharFile] = useState();
  const [adharfilename, setAdharFilename] = useState("");
  const [driverID, setDriverId] = useState("");
  const [licenceFile, setLicenceFile] = useState();
  const [licencefilename, setLicenceFilename] = useState("");
  const [showmodel, setShowmodel] = useState(false);
  const [workingmodel, setWorkingModel] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [Id, setId] = useState("");

  const [driverName, setDriverName] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagererrorMessage, setImageErrorMessage] = useState("");
  const [adharerrorMessage, setAdharErrorMessage] = useState("");
  const [licenceerrorMessage, setLicenceErrorMessage] = useState("");

  const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
  // get all driver list with page refressh
  useEffect(() => {
    getallDriver();
  }, [apicall]);

  //get all driver fuunction
  const getallDriver = async () => {
    setLoading(true);
    const response = await getDriverList();

    setDriverList(response);
    setLoading(false);
  };

  //data table coloumn-----
  const columns = [
    {
      name: "Image",
      width: "100px",
      center: true,
      cell: (row) => (
        <>
          <p>
            <img
              alt={"apna_organic"}
              src={
                row.image
                  ? row.image
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              }
              style={{
                padding: 10,
                textAlign: "right",
                maxHeight: "100px",
                maxWidth: "100px",
              }}
            />
          </p>
        </>
      ),
    },

    {
      name: "Name",

      selector: (row) =>
        (
          <span>
            {row.driver_name} &nbsp;{row.driver_last_name}
          </span>
        ) || <b>unavailable</b>,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Date of Birth",
      selector: (row) =>
        moment(row.date_of_birth).format("YYYY-MM-DD") || <b>unavailable</b>,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Current Address ",
      selector: (row) => (
        <span>
          <span title={row.current_address}>
            <b>Address:- </b> {row.current_address} || <b>unavailable</b>
          </span>
          <br />
          <span title={row.email}>
            {" "}
            <b>Email:- </b> {row.email}
          </span>
        </span>
      ),
      sortable: true,
      width: "140px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },

    {
      name: "Info",
      selector: (row) => (
        <span>
          <span title={row.contect_no}>
            <b>Contact :-</b> {row.contect_no}|| <b>unavailable</b>
          </span>
          <br />
          <span title={row.licence_no}>
            {" "}
            <b>licence :-</b> {row.licence_no}|| <b>unavailable</b>
          </span>
          <br />
        </span>
      ),
      sortable: true,
      width: "160px",
      center: true,
    },
    {
      name: "Working Area",
      selector: (row) => (
        <span
          className="badge bg-primary"
          onClick={onworkingClick.bind(this, row.driver_id)}
        >
          Add working area
        </span>
      ),
      sortable: true,
      width: "130px",
      center: true,
    },

    {
      name: "Status",
      width: "130px",
      selector: (row) => (
        <span
          className={
            row.status === "pending"
              ? "badge bg-secondary"
              : row.status === "draft"
              ? "badge bg-primary"
              : row.status === "approved"
              ? "badge bg-info"
              : "badge bg-dark"
          }
        >
          {row.status === "pending"
            ? "pending"
            : row.status === "draft"
            ? "draft"
            : row.status === "approved"
            ? "approved"
            : "return"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Change Status",
      selector: (row) => (
        <Form.Select
          aria-label="Search by delivery"
          size="sm"
          className="w-100"
          onChange={(e) => onStatusChange(e, row.driver_id)}
          name="status"
          value={row.status}
        >
          <option value="">Select status</option>

          <option value="pending">Pending</option>

          <option value="approved">Approved </option>

          <option value="draft">Draft </option>
        </Form.Select>
      ),
      sortable: true,
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
            onClick={handleEditShow.bind(this, row.driver_id)}
          />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert.bind(this, row.driver_id)}
          />
        </div>
      ),
    },
  ];

  //to open add working area model
  const onworkingClick = (id) => {
    setWorkingModel(true);
    setDriverId(id);
  };

  //image upload onchange
  const OnImageUpload = (e) => {
    // setImageFile(e.target.files[0]);
    // setImageFilename(e.target.files[0].name);

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (allowedFormats.includes(selectedFile.type)) {
        setImageFile(selectedFile);
        setImageFilename(selectedFile.name);
        setImageErrorMessage("");
      } else {
        setImageFile(null);
        setImageFilename("");
        setImageErrorMessage("Invalid format");
      }
    }
  };

  //on aadhar card upload
  const OnAdharUpload = (e) => {
    // setAdharFile(e.target.files[0]);
    // setAdharFilename(e.target.files[0].name);

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (allowedFormats.includes(selectedFile.type)) {
        setAdharFile(selectedFile);
        setAdharFilename(selectedFile.name);
        setAdharErrorMessage("");
      } else {
        setAdharFile(null);
        setAdharFilename("");
        setAdharErrorMessage("Invalid format");
      }
    }
  };

  //on licence card  upload function
  const OnLicenceUpload = (e) => {
    // setLicenceFile(e.target.files[0]);
    // setLicenceFilename(e.target.files[0].name);

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (allowedFormats.includes(selectedFile.type)) {
        setLicenceFile(selectedFile);
        setLicenceFilename(selectedFile.name);
        setLicenceErrorMessage("");
      } else {
        setLicenceFile(null);
        setLicenceFilename("");
        setLicenceErrorMessage("Invalid format");
      }
    }
  };

  //validation function for add driver
  const validators = {
    driver_name: [
      (value) =>
        value === null || value === ""
          ? "Driver first name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    driver_last_name: [
      (value) =>
        value === null || value === ""
          ? "Driver last name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],

    date_of_birth: [
      (value) =>
        value === null || value === ""
          ? "Date of Birth is required"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            null,
    ],
    current_address: [
      (value) =>
        value === null || value === ""
          ? "Current address is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    gender: [
      (value) =>
        value === null || value === ""
          ? "gender is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    age: [
      (value) =>
        value === null || value === ""
          ? "Age is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    contect_no: [
      (value) =>
        value === null || value === ""
          ? "Contect number is required"
          : // : /^(\+\d{1,3}[- ]?)?\d{10}$/g.test(value)
          // ? "Invalid Mobile number "
          value.length > 10 || value.length < 10
          ? "Contect number should be 10 digit"
          : null,
    ],
    email: [
      (value) =>
        value === null || value === ""
          ? "Email address is required"
          : !/^\S+@\S+\.\S+$/.test(value)
          ? "Invalid email address"
          : null,
    ],
    password: [
      (value) =>
        value === null || value === ""
          ? "Password is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],

    aadhar_no: [
      (value) =>
        value === null || value === ""
          ? "Aadhar no. is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    licence_no: [
      (value) =>
        value === null || value === ""
          ? "Licence no. is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    licence_issue_date: [
      (value) =>
        value === null || value === ""
          ? "Licence issue date is required"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            null,
    ],
    licence_validity_date: [
      (value) =>
        value === null || value === ""
          ? "Licence validity date is required"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            null,
    ],
  };

  const {
    state,
    setState,
    onInputChange,
    errors,
    setErrors,
    validate,
  } = useValidation(initialFormState, validators);

  //on search box on change
  const searchValueHandler = (e) => {
    setDriverName(e.target.value);
    setSubmitError(false);
  };

  //search submit button
  const submitHandler = async () => {
    if (driverName === "") {
      setSubmitError("driver Empty");
    } else {
      const response = await getDriverFilter(driverName);

      setDriverList(response);
    }
  };

  // reset button
  const OnReset = () => {
    setDriverName("");

    getallDriver();
    setapicall(true);
    setSubmitError(false);
  };

  //Driver  add submit button
  const handleAddDriver = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await AddDriverByAdmin(
        state,
        imageFile,
        imagefilename,
        adharFile,
        adharfilename,
        licenceFile,
        licencefilename
      );

      if (response.affectedRows === 1) {
        setProductAlert(true);
      }
    }
  };

  // add driver model show
  const handleShow = (e) => {
    if (e === "add") {
      setShowmodel(e);
    }
  };

  // driver  edit model show
  const handleEditShow = async (id) => {
    const response = await getDriverListById(id);

    setState(response[0]);
    setShowmodel(true);
  };

  //driver model close funtion-------------
  const ModelCloseFunction = () => {
    setShowmodel(false);

    setState(initialFormState);
    setImageErrorMessage("");
    setAdharErrorMessage("");
    setLicenceErrorMessage("");
    setErrors({});
  };

  //add working area model close
  const workingModelClose = () => {
    setWorkingModel(false);
  };

  //on Driver  update function--------------

  const handleUpdateDriver = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await UpdateDriverByAdmin(
        state,
        imageFile,
        imagefilename,
        adharFile,
        adharfilename,
        licenceFile,
        licencefilename
      );

      if (response.message === "updated user successfully") {
        setupdateAlert(true);
      }
    }
  };

  // all alert close fuction
  const closeAlldriverAlert = () => {
    setState(initialFormState);
    setProductAlert(false);
    setupdateAlert(false);
    setShowmodel(false);
    setShowDeleteAlert(false);
    getallDriver();
    setapicall(true);
  };

  //delete driver  alert show-----
  const handleAlert = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  // delete driver function-----
  const deleteDriverAlert = async () => {
    await DriverDeleteStatusChange(Id);

    setShowDeleteAlert(false);
    getallDriver();
    setapicall(true);
  };

  //Driver status change function----
  const onStatusChange = async (e, id) => {
    await DriverUpdateStatus(id, e.target.value);

    setapicall(true);
    getallDriver();
  };

  return (
    <div>
      {loading === true ? <Loader /> : null}
      <div className="row admin_row">
        <div className="col-lg-3 col-md-3 admin_sidebar">
          <Sidebar />
        </div>
        <div className="col-lg-9 col-md-9 admin_content_bar mt-5">
          <div className="main_content_div">
            <div
              className="dashboard-main-container mt-df25 mt-lg-31"
              id="dashboard-body"
            >
              <div className="">
                <div className="page_main_contant">
                  <h4> Add Driver</h4>
                  <div className=" mt-3 p-3">
                    <div className="row pb-3">
                      <div className="col-md-3 col-sm-6 aos_input mb-2">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="Search by name"
                            name="search"
                            onChange={searchValueHandler}
                            value={driverName}
                          />
                        </Form.Group>
                        {submitError === "driver Empty" ? (
                          <span className="text-danger">
                            Driver Name is Empty
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
                          Add Driver
                        </Button>
                      </div>
                    </div>

                    <DataTable
                      columns={columns}
                      data={driverList}
                      pagination
                      highlightOnHover
                      pointerOnHover
                      className={"table_body product_table"}
                      subHeader
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
          className="p-2 addproduct_form"
          onSubmit={
            showmodel === "add"
              ? (e) => handleAddDriver(e)
              : (showmodel) => handleUpdateDriver(showmodel)
          }
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {showmodel === "add" ? "Add Driver" : "Update Driver"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Driver First Name <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.driver_name
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="text"
                    value={state.driver_name}
                    name="driver_name"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="driver_name"
                  />
                  {errors.driver_name
                    ? (errors.driver_name || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Driver last Name
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={
                      errors.driver_last_name
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.driver_last_name}
                    name="driver_last_name"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="driver_last_name"
                  />
                  {errors.driver_last_name
                    ? (errors.driver_last_name || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Date Of Birth
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    className={
                      errors.date_of_birth
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.date_of_birth}
                    name="date_of_birth"
                    onChange={onInputChange}
                    id="date_of_birth"
                  />
                  {errors.date_of_birth
                    ? (errors.date_of_birth || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Current Address
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={
                      errors.current_address
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.current_address}
                    name="current_address"
                    onChange={onInputChange}
                    id="current_address"
                  />
                  {errors.current_address
                    ? (errors.current_address || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Image
                  </Form.Label>
                  <Form.Control
                    type="file"
                    // value={state.gstn}
                    name="image"
                    onChange={(e) => OnImageUpload(e)}
                    id="image"
                  />
                </Form.Group>
                {imagererrorMessage === "Invalid format" ? (
                  <span className="text-danger">
                    Invalid image format. Please select a jpg, jpeg, or png
                    file.
                  </span>
                ) : null}
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    AadharCard
                  </Form.Label>
                  <Form.Control
                    type="file"
                    // value={state.gstn}
                    name="image"
                    onChange={(e) => OnAdharUpload(e)}
                    id="aadhar"
                  />
                </Form.Group>
                {adharerrorMessage === "Invalid format" ? (
                  <span className="text-danger">
                    Invalid image format. Please select a jpg, jpeg, or png
                    file.
                  </span>
                ) : null}
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Licence
                  </Form.Label>
                  <Form.Control
                    type="file"
                    // value={state.gstn}
                    name="image"
                    onChange={(e) => OnLicenceUpload(e)}
                    id="licence"
                  />
                </Form.Group>
                {licenceerrorMessage === "Invalid format" ? (
                  <span className="text-danger">
                    Invalid image format. Please select a jpg, jpeg, or png
                    file.
                  </span>
                ) : null}
              </div>
              {/* <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Location <small className="text-danger">*</small>
                          </Form.Label>
                          <Col sm="12">
                            <InputGroup className="">
                              <Form.Select
                                aria-label="Default select example"
                                // className="nice-select w-100"
                                // className={
                                //   errors.status
                                //     ? "form-control border border-danger"
                                //     : "form-control"
                                // }
                                sm="9"
                                onChange={(e) => OnCurrentLocation(e)}
                              >
                                {" "}
                                <option value="">select you Location</option>
                                {Object.keys(areavalue).map((result, key) => {
                                  return (
                                    <>
                                      <optgroup label={result}>
                                        {areavalue[result].map((area) => {
                                          return (
                                            <>
                                              <option value={area}>
                                                {area}
                                              </option>
                                            </>
                                          );
                                        })}
                                      </optgroup>
                                    </>
                                  );
                                })}
                              </Form.Select>
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      </div> */}

              <div className="col-md-6">
                <Form.Label className="" column sm="12">
                  Gender<small className="text-danger">*</small>
                </Form.Label>
                <div className="d-flex ">
                  <Form.Check
                    type="radio"
                    value="male"
                    name="gender"
                    className="pe-3"
                    checked={state.gender === "male"}
                    label="Male"
                    onChange={onInputChange}
                    id="male"
                  />
                  <Form.Check
                    type="radio"
                    className="pe-3"
                    value="female"
                    checked={state.gender === "female"}
                    name="gender"
                    label="Female"
                    onChange={onInputChange}
                    id="female"
                  />
                  <Form.Check
                    type="radio"
                    className="pe-3"
                    value="other"
                    checked={state.gender === "other"}
                    name="gender"
                    label="Other"
                    onChange={onInputChange}
                    id="other"
                  />
                </div>
                {errors.gender
                  ? (errors.gender || []).map((error) => {
                      return <small className="text-danger">{error}</small>;
                    })
                  : null}
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Age <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={
                      errors.age
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.age}
                    name="age"
                    onChange={(v) => {
                      if (v.target.value.length <= 3) {
                        onInputChange(v);
                      }
                    }}
                    id="age"
                  />
                  {errors.age
                    ? (errors.age || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Contact No. <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.contect_no
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="number"
                    value={state.contect_no}
                    name="contect_no"
                    // onChange={onInputChange}
                    onChange={(v) => {
                      if (v.target.value.length <= 10) {
                        onInputChange(v);
                      }
                    }}
                    id="contect_no"
                  />
                  {errors.contect_no
                    ? (errors.contect_no || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Email <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.email
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="email"
                    value={state.email}
                    name="email"
                    onChange={(v) => {
                      if (v.target.value.length <= 40) {
                        onInputChange(v);
                      }
                    }}
                    id="email"
                  />
                  {errors.email
                    ? (errors.email || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Password <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.password
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="password"
                    value={state.password}
                    name="password"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="password"
                  />
                  {errors.password
                    ? (errors.password || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              {/* <div className="col-md-6">
                        <Form.Group className="mb-3">
                          <Form.Label className="" column sm="12">
                            Status <small className="text-danger">*</small>
                          </Form.Label>
                          <Col sm="12">
                            <InputGroup className="">
                              <Form.Select
                                aria-label="Default select example"
                                // className="nice-select w-100"
                                className={
                                  errors.status
                                    ? "form-control border border-danger"
                                    : "form-control"
                                }
                                sm="9"
                                name="status"
                                onChange={onInputChange}
                                value={state.status}
                              >
                                <option value={""}>Select Availabilty</option>
                                <option value={"open"}>Open</option>
                                <option value={"close"}>Close</option>
                              </Form.Select>
                            </InputGroup>
                          </Col>
                        </Form.Group>
                      </div> */}

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Aadhar Number <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.aadhar_no
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="text"
                    value={state.aadhar_no}
                    name="aadhar_no"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="aadhar_no"
                  />
                  {errors.aadhar_no
                    ? (errors.aadhar_no || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Licence Number <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.licence_no
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="text"
                    value={state.licence_no}
                    name="licence_no"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="licence_no"
                  />
                  {errors.licence_no
                    ? (errors.licence_no || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Licence Issue date <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.licence_issue_date
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="date"
                    value={moment(state.licence_issue_date).format(
                      "YYYY-MM-DD"
                    )}
                    name="licence_issue_date"
                    onChange={onInputChange}
                    id="licence_issue_date"
                  />
                  {errors.licence_issue_date
                    ? (errors.licence_issue_date || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Licence validity date{" "}
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.licence_validity_date
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="date"
                    value={moment(state.licence_validity_date).format(
                      "YYYY-MM-DD"
                    )}
                    name="licence_validity_date"
                    onChange={onInputChange}
                    id="licence_validity_date"
                  />
                  {errors.licence_validity_date
                    ? (errors.licence_validity_date || []).map((error) => {
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
                    {" "}
                    Add
                    {/* {modalshow === "add"
                              ? "Add Vendor"
                              : "Update Vendor"} */}
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

      <ModelForm
        showmodel={workingmodel}
        setShowmodel={setWorkingModel}
        ModelCloseFunction={workingModelClose}
        driver_id={driverID}
      />

      <SweetAlert
        show={ProductAlert}
        title="Added Successfully"
        text={"Driver Added"}
        onConfirm={closeAlldriverAlert}
        // showCancelButton={}
        // onCancel={}
      />

      <SweetAlert
        show={UpdateAlert}
        title="Updated Successfully"
        text={"Driver update"}
        onConfirm={closeAlldriverAlert}
        // showCancelButton={}
        // onCancel={}
      />

      <SweetAlert
        show={ShowDeleteAlert}
        title="Driver Name"
        text="Are you Sure you want to delete"
        onConfirm={deleteDriverAlert}
        showCancelButton={true}
        onCancel={closeAlldriverAlert}
      />
    </div>
  );
};
export default AddDriver;
