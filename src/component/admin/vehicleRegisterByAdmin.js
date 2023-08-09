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
import Loader from "../common/loader";

import Sidebar from "../common/sidebar";
import {
  AddVehicleByAdmin,
  AssignVehicleFunction,
  getDriverList,
  UpdateVehicleByAdmin,
  VehicleDeleteStatusChange,
  VehicleList,
  VehicleListById,
  VehicleListFilter,
} from "../api/api";
import moment from "moment";

const VehicleRegisterByAdmin = () => {
  // add vehicle data json
  const initialFormState = {
    company_name: "",
    model: "",
    color: "",
    registration_no_of_vehicle: "",
    chassis_number: "",
    vehicle_owner_name: "",
    puc_expiration_date: "",
    insurance_expiration_date: "",
    registration_expiration_date: "",
    puc_certificate: "",
    insurance: "",
    registration: "",
  };
  const [vehicleAssignAlert, setvehicleAssignAlert] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [pucCertificateFile, setPucCertificateFile] = useState("");
  const [pucCertificatefilename, setPucCertificateFilename] = useState("");
  const [driverList, setDriverList] = useState([]);
  const [insuranceFile, setInsuranceFile] = useState("");
  const [insurancefilename, setInsuranceFilename] = useState("");
  const [ShowDeleteAlert, setShowDeleteAlert] = useState(false);
  const [registrationFile, setRegistrationFile] = useState("");
  const [registrationfilename, setregistrationFilename] = useState("");
  const [updateVehicleAlert, setUpdateVehicleAlert] = useState(false);
  const [VehicleAlert, setVehicleAlert] = useState(false);
  const [VehicleErrorAlert, setVehicleErrorAlert] = useState(false);
  const [vehicleList, setVehicleList] = useState([]);
  const [showmodel, setShowmodel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyNameError, setCompanyNameError] = useState(false);

  const [pucErrorMessage, setPucErrorMessage] = useState("");
  const [insurenceerrorMessage, setInsurenceErrorMessage] = useState("");
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState("");

  const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

  // search state data---------
  const [searchdata, setsearchData] = useState({
    companyName: "",
  });

  const [Id, setId] = useState("");

  //vehicle data table coloumn-----
  const columns = [
    {
      name: "Vehicle ",

      selector: (row) => (
        <span>
          <span title={row.company_name}>
            <b>Company:- </b> {row.company_name}
          </span>{" "}
          <br />{" "}
          <span title={row.model}>
            <b>Model:- </b> {row.model}
          </span>{" "}
          <br />{" "}
          <span title={row.color}>
            <b>Color:- </b> {row.color}
          </span>{" "}
          <br />{" "}
          <span title={row.registration_no_of_vehicle}>
            <b>Reg. No.:- </b> {row.registration_no_of_vehicle}
          </span>{" "}
          <br />{" "}
        </span>
      ),
      sortable: true,
      width: "180px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Owner name",
      selector: (row) => row.vehicle_owner_name || <b>unavailable</b>,
      sortable: true,
      width: "140px",
      center: true,
    },
    {
      name: "Chassis Number",
      selector: (row) => (
        <span>
          <span title={row.chassis_number}>
            <b>Chassis No.:-</b>
            {row.chassis_number}
          </span>
          <br />
          <span title={moment(row.puc_expiration_date).format("DD-MM-YYYY")}>
            <b>Polution Exp. date:-</b>
            {moment(row.puc_expiration_date).format("DD-MM-YYYY")}
          </span>
          <br />
          <span
            title={moment(row.insurance_expiration_date).format("DD-MM-YYYY")}
          >
            <b>Insurance Exp. date:-</b>
            {moment(row.insurance_expiration_date).format("DD-MM-YYYY")}
          </span>
          <br />
          <span
            title={moment(row.registration_expiration_date).format(
              "DD-MM-YYYY"
            )}
          >
            <b>Registration Exp. date:-</b>
            {moment(row.registration_expiration_date).format("DD-MM-YYYY")}
          </span>
          <br />
        </span>
      ),
      sortable: true,
      width: "280px",
      center: true,
    },
    {
      name: "Assigned Driver",
      selector: (row) => row.driver_name || <b>unavailable</b>,
      sortable: true,
      width: "140px",
      center: true,
    },

    {
      name: "Vehicle Assign ",
      width: "140px",

      selector: (row) => (
        <Form.Select
          aria-label="Search by delivery"
          size="sm"
          className="w-100"
          onChange={(e) => onStatusChange(row.vehicle_id, e)}
          name="status_order"
          value={row.driver_id}
        >
          <option value="">drivers</option>
          {driverList.map((item) => {
            return (
              <>
                <option value={item.driver_id}>
                  {item.driver_name}&nbsp;
                  {item.driver_last_name}
                </option>
              </>
            );
          })}
        </Form.Select>
      ),
    },

    {
      name: "Polution Certificate",
      width: "100px",
      center: true,
      cell: (row) => (
        <>
          <p>
            <img
              alt={"apna_organic"}
              src={
                row.puc_certificate
                  ? row.puc_certificate
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
      name: "Insurance",
      width: "100px",
      center: true,
      cell: (row) => (
        <>
          <p>
            <img
              alt={"apna_organic"}
              src={
                row.insurance
                  ? row.insurance
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
      name: "Registration card",
      width: "100px",
      center: true,
      cell: (row) => (
        <>
          <p>
            <img
              alt={"apna_organic"}
              src={
                row.registration
                  ? row.registration
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
            onClick={handleEditShow.bind(this, row.vehicle_id)}
          />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert.bind(this, row.vehicle_id)}
          />
        </div>
      ),
    },
  ];

  const onStatusChange = async (vehicle_id, e) => {
    const res = await AssignVehicleFunction(vehicle_id, e.target.value);

    if (res.message === "vehicle feild updated successfull") {
      setvehicleAssignAlert(true);
    }
  };

  //on polution certificate upload---------------------
  const OnPucCerificateUpload = (e) => {
    // setPucCertificateFile(e.target.files[0]);
    // setPucCertificateFilename(e.target.files[0].name);

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (allowedFormats.includes(selectedFile.type)) {
        setPucCertificateFile(selectedFile);
        setPucCertificateFilename(selectedFile.name);
        setPucErrorMessage("");
      } else {
        setPucCertificateFile(null);
        setPucCertificateFilename("");
        setPucErrorMessage("Invalid format");
      }
    }
  };

  //on Insurence certificate upload---------------
  const OnInsuranceUpload = (e) => {
    // setInsuranceFile(e.target.files[0]);
    // setInsuranceFilename(e.target.files[0].name);

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (allowedFormats.includes(selectedFile.type)) {
        setInsuranceFile(selectedFile);
        setInsuranceFilename(selectedFile.name);
        setInsurenceErrorMessage("");
      } else {
        setInsuranceFile(null);
        setInsuranceFilename("");
        setInsurenceErrorMessage("Invalid format");
      }
    }
  };

  //on regisration card upload---------------
  const OnRegistrationUpload = (e) => {
    // setRegistrationFile(e.target.files[0]);
    // setregistrationFilename(e.target.files[0].name);

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (allowedFormats.includes(selectedFile.type)) {
        setRegistrationFile(selectedFile);
        setregistrationFilename(selectedFile.name);
        setRegistrationErrorMessage("");
      } else {
        setRegistrationFile(null);
        setregistrationFilename("");
        setRegistrationErrorMessage("Invalid format");
      }
    }
  };

  // vehicle  validation---------------
  const validators = {
    company_name: [
      (value) =>
        value === null || value === ""
          ? "Company name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    model: [
      (value) =>
        value === null || value === ""
          ? "Model name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],

    color: [
      (value) =>
        value === null || value === ""
          ? "Color is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    registration_no_of_vehicle: [
      (value) =>
        value === null || value === ""
          ? "Registration No of vehicle is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    chassis_number: [
      (value) =>
        value === null || value === ""
          ? "Chassis Number is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    vehicle_owner_name: [
      (value) =>
        value === null || value === ""
          ? "Vehicle Owner name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    puc_expiration_date: [
      (value) =>
        value === null || value === ""
          ? "PUC Expiration date is required"
          : //   : /[^A-Za-z 0-9]/g.test(value)
            //   ? "Cannot use special character "
            null,
    ],
    insurance_expiration_date: [
      (value) =>
        value === null || value === ""
          ? " Insurance Expiration date is required"
          : //   : !/^\S+@\S+\.\S+$/.test(value)
            //   ? "Invalid email address"
            null,
    ],
    registration_expiration_date: [
      (value) =>
        value === null || value === ""
          ? "Registration Expiration date is required"
          : //   : !/^\S+@\S+\.\S+$/.test(value)
            //   ? "Invalid email address"
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
    setCompanyNameError(false);
  };

  //search submit button
  const submitHandler = async () => {
    if (searchdata.companyName === "") {
      setCompanyNameError("Search by  is empty");
    } else {
      setLoading(true);
      const response = await VehicleListFilter(searchdata.companyName);
      setLoading(false);

      setVehicleList(response);
    }
  };

  // reset button
  const OnReset = () => {
    setsearchData({
      companyName: "",
    });
    // getAllVehicleList();
    setapicall(true);
    setCompanyNameError(false);
  };

  //get all vehicle list useEffect -----
  useEffect(() => {
    getAllVehicleList();
    getOnlydriverList();
  }, [apicall]);

  // get all vehicle list funtion-------------
  const getAllVehicleList = async () => {
    setLoading(true);
    const response = await VehicleList();
    setLoading(false);
    setapicall(false);
    setVehicleList(response);
  };

  const getOnlydriverList = async () => {
    setLoading(true);
    const response = await getDriverList();
    setLoading(false);
    setapicall(false);
    setDriverList(response);
  };

  // add vehicle submit button---------------
  const handleAddVehicle = async (e) => {
    e.preventDefault();

    if (validate()) {
      const response = await AddVehicleByAdmin(
        state,
        pucCertificateFile,
        pucCertificatefilename,
        insuranceFile,
        insurancefilename,
        registrationFile,
        registrationfilename
      );

      if (response.message === "vehicle registration successfull") {
        setVehicleAlert(true);
        setapicall(true);
      }

      if (response.status === false) {
        console.log("kkkk");
        setVehicleErrorAlert(true);
      }
    }
  };

  // Vehicle model show
  const handleShow = (e) => {
    if (e === "add") {
      setShowmodel(e);
    }
  };

  // Vehicle update  edit show--------------------
  const handleEditShow = async (id) => {
    const response = await VehicleListById(id);

    setState(response[0]);
    setShowmodel(true);
  };

  //vehicle registraion model close function-----------------
  const ModelCloseFunction = () => {
    setShowmodel(false);

    setState(initialFormState);
    setErrors({});
    setPucErrorMessage("");
    setInsurenceErrorMessage("");
    setRegistrationErrorMessage("");
  };

  //Vehicle update fuction--
  const handleUpdateDriver = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await UpdateVehicleByAdmin(
        state,
        pucCertificateFile,
        pucCertificatefilename,
        insuranceFile,
        insurancefilename,
        registrationFile,
        registrationfilename
      );

      if (response.message === "vehicle update successfull") {
        setUpdateVehicleAlert(true);
        setapicall(true);
      }
    }
  };

  // all alert close fuction
  const closeVehicleAlert = () => {
    setState(initialFormState);
    setVehicleAlert(false);
    setUpdateVehicleAlert(false);
    setVehicleErrorAlert(false);
    setShowmodel(false);
    setapicall(true);

    setShowDeleteAlert(false);
  };

  const closeAssignAlert = () => {
    setvehicleAssignAlert(false);
    setapicall(true);
    // setDriverListView(false);
  };
  //delete Vehicle alert---
  const handleAlert = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  // delete Vehicle fuction------------
  const deleteVehicleAlert = async () => {
    await VehicleDeleteStatusChange(Id);

    setShowDeleteAlert(false);
    setapicall(true);
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
                  <h4> Vehicle</h4>
                  <div className=" mt-3 p-3">
                    <div className="row pb-3">
                      <div className="col-md-3 col-sm-6 aos_input mb-2">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="Search by Company,Model,Owner,Chassis "
                            name="companyName"
                            onChange={searchValueHandler}
                            value={searchdata.companyName}
                          />
                        </Form.Group>
                        {companyNameError === "Search by  is empty" ? (
                          <span className="text-danger">
                            Search by is Empty
                          </span>
                        ) : null}
                      </div>

                      {/* 
                      <div className="col-md-3 col-sm-6 aos_input mb-2">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="Price from"
                            name="price_from"
                            onChange={searchValueHandler}
                            value={searchdata.price_from}
                          />
                        </Form.Group>
                      </div> */}

                      {/* <div className="col-md-3 col-sm-6 aos_input mb-2">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="Price to"
                            name="price_to"
                            onChange={searchValueHandler}
                            value={searchdata.price_to}
                          />
                        </Form.Group>
                      </div> */}
                      {/* <div className="col-md-3 col-sm-6 aos_input mb-2">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="Search by rating"
                            name="rating"
                            onChange={searchValueHandler}
                            value={searchdata.rating}
                          />
                        </Form.Group>
                      </div> */}

                      {/* <div className="col-md-3 col-sm-6 aos_input mb-2">
                        <Form.Select
                          className="nice-select w-100"
                          aria-label="Default select example"
                          name="vendor_id"
                          value={searchdata.vendor_id}
                          onChange={searchValueHandler}
                        >
                          <option value={""}>Search By Vendor</option>
                          {vendorJson.vendorjson.map((item, id) => {
                            return (
                              <>
                                <option value={id + 1}>{item}</option>
                              </>
                            );
                          })}
                        </Form.Select>
                      </div> */}

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
                          Register Vehicle
                        </Button>
                      </div>
                    </div>

                    <DataTable
                      columns={columns}
                      data={vehicleList}
                      pagination
                      highlightOnHover
                      pointerOnHover
                      className={"table_body Vehicle_table"}
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
          className="p-2 addVehicle_form"
          onSubmit={
            showmodel === "add"
              ? (e) => handleAddVehicle(e)
              : (showmodel) => handleUpdateDriver(showmodel)
          }
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {showmodel === "add" ? "Register Vehicle " : "Update  Vehicle"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Company Name <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.company_name
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="text"
                    value={state.company_name}
                    name="company_name"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="company_name"
                  />
                  {errors.company_name
                    ? (errors.company_name || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Model name
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={
                      errors.model
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.model}
                    name="model"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="model"
                  />
                  {errors.model
                    ? (errors.model || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Vehicle Color
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={
                      errors.color
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.color}
                    name="color"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="color"
                  />
                  {errors.color
                    ? (errors.color || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Vehicle Registration No.
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={
                      errors.registration_no_of_vehicle
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.registration_no_of_vehicle}
                    name="registration_no_of_vehicle"
                    onChange={onInputChange}
                    id="registration_no_of_vehicle"
                  />
                  {errors.registration_no_of_vehicle
                    ? (errors.registration_no_of_vehicle || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Chassis Number.
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className={
                      errors.chassis_number
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    value={state.chassis_number}
                    name="chassis_number"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="chassis_number"
                  />
                  {errors.chassis_number
                    ? (errors.chassis_number || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    PUC Certicate
                  </Form.Label>
                  <Form.Control
                    type="file"
                    // value={state.gstn}
                    name="puc_certificate"
                    onChange={(e) => OnPucCerificateUpload(e)}
                    id="puc_certificate"
                  />
                </Form.Group>
                {pucErrorMessage === "Invalid format" ? (
                  <span className="text-danger">
                    Invalid image format. Please select a jpg, jpeg, or png
                    file.
                  </span>
                ) : null}
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Insurance
                  </Form.Label>
                  <Form.Control
                    type="file"
                    // value={state.gstn}
                    name="insurance"
                    onChange={(e) => OnInsuranceUpload(e)}
                    id="insurance"
                  />
                </Form.Group>
                {insurenceerrorMessage === "Invalid format" ? (
                  <span className="text-danger">
                    Invalid image format. Please select a jpg, jpeg, or png
                    file.
                  </span>
                ) : null}
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Registration <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    // value={state.gstn}
                    name="registration"
                    onChange={(e) => OnRegistrationUpload(e)}
                    id="registration"
                  />
                </Form.Group>
                {registrationErrorMessage === "Invalid format" ? (
                  <span className="text-danger">
                    Invalid image format. Please select a jpg, jpeg, or png
                    file.
                  </span>
                ) : null}
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Vehicle Owner Name <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.vehicle_owner_name
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="text"
                    value={state.vehicle_owner_name}
                    name="vehicle_owner_name"
                    onChange={(v) => {
                      if (v.target.value.length <= 30) {
                        onInputChange(v);
                      }
                    }}
                    id="vehicle_owner_name"
                  />
                  {errors.vehicle_owner_name
                    ? (errors.vehicle_owner_name || []).map((error) => {
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
                    PUC Expiration Date<small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.puc_expiration_date
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="date"
                    value={moment(state.puc_expiration_date).format(
                      "YYYY-MM-DD"
                    )}
                    name="puc_expiration_date"
                    onChange={onInputChange}
                    id="puc_expiration_date"
                  />
                  {errors.puc_expiration_date
                    ? (errors.puc_expiration_date || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Insurance Expiration Date{" "}
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.insurance_expiration_date
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="date"
                    value={moment(state.insurance_expiration_date).format(
                      "YYYY-MM-DD"
                    )}
                    name="insurance_expiration_date"
                    onChange={onInputChange}
                    id="insurance_expiration_date"
                  />
                  {errors.insurance_expiration_date
                    ? (errors.insurance_expiration_date || []).map((error) => {
                        return <small className="text-danger">{error}</small>;
                      })
                    : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="" column sm="12">
                    Registration Expiration Date{" "}
                    <small className="text-danger">*</small>
                  </Form.Label>
                  <Form.Control
                    className={
                      errors.registration_expiration_date
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    type="date"
                    value={moment(state.registration_expiration_date).format(
                      "YYYY-MM-DD"
                    )}
                    name="registration_expiration_date"
                    onChange={onInputChange}
                    id="registration_expiration_date"
                  />
                  {errors.registration_expiration_date
                    ? (errors.registration_expiration_date || []).map(
                        (error) => {
                          return <small className="text-danger">{error}</small>;
                        }
                      )
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
                    {showmodel === "add" ? "Add" : "Update"}
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
        show={VehicleAlert}
        title="Added Successfully"
        text={"Vehicle Added"}
        onConfirm={closeVehicleAlert}
        // showCancelButton={}
        // onCancel={}
      />
      <SweetAlert
        show={VehicleErrorAlert}
        title="Vehicle Already registerd"
        text={"Please add another vehicle"}
        onConfirm={closeVehicleAlert}
        // showCancelButton={}
        // onCancel={}
      />

      <SweetAlert
        show={updateVehicleAlert}
        title="Updated Successfully"
        text={"Vehicle update"}
        onConfirm={closeVehicleAlert}
        // showCancelButton={}
        // onCancel={}
      />
      <SweetAlert
        show={vehicleAssignAlert}
        title="Assigned Successfully"
        text={"Assign"}
        onConfirm={closeAssignAlert}
        // showCancelButton={}
        // onCancel={}
      />

      <SweetAlert
        show={ShowDeleteAlert}
        title="Vehicle Name"
        text="Are you Sure you want to delete"
        onConfirm={deleteVehicleAlert}
        showCancelButton={true}
        onCancel={closeVehicleAlert}
      />
    </div>
  );
};
export default VehicleRegisterByAdmin;
