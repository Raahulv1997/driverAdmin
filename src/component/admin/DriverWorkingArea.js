import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { BsTrash } from "react-icons/bs";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import Loader from "../common/loader";

// import useValidation from "../common/useValidation";

import Sidebar from "../common/sidebar";
import {
  changeAreaStatus,
  changeUserActivityStatus,
  changeWorkingAreaStatus,
  getAllworkingArea,
  getAllworkingAreafilter,
  getDriverList,
} from "../api/api";

const DriverWorkingArea = () => {
  const [apicall, setapicall] = useState(false);
  const [driverList, setDriverList] = useState([]);
  const [ShowDeleteAlert, setShowDeleteAlert] = useState(false);
  const [areaAssignAlert, setareaAssignAlert] = useState(false);
  const [AreaList, setAreaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [areaNameError, setAreaNameError] = useState(false);
  const [pincodeError, setPincodeError] = useState(false);

  //intial search state data---------
  const [searchdata, setsearchData] = useState({
    city: "",
    area_name: "",
    pin_code: "",
  });
  const [Id, setId] = useState("");

  //working area  table coloumn-----
  const columns = [
    {
      name: "City",

      selector: (row) => row.city || <b>unavailable</b>,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "  Area name",
      selector: (row) => row.area_name || <b>unavailable</b>,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Driver name",
      selector: (row) => row.driver_name || <b>unavailable</b>,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Pincode ",
      selector: (row) => row.pin_code || <b>unavailable</b>,
      sortable: true,
      width: "140px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },
    {
      name: "Longitude ",
      selector: (row) => row.driver_log || <b>unavailable</b>,
      sortable: true,
      width: "140px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },

    {
      name: "Latitude",
      selector: (row) => row.driver_lat || <b>unavailable</b>,
      sortable: true,
      width: "140px",
      center: true,
    },

    {
      name: " Area Assign ",
      selector: (row) => (
        <Form.Select
          aria-label="Search by delivery"
          size="sm"
          className="w-100"
          onChange={(e) => onStatusChangee(row.id, e)}
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
      name: "User Activity",
      selector: (row) => (
        <span
          className={
            row.user_active_this_area === 0
              ? "badge bg-secondary"
              : row.user_active_this_area === 1
              ? "badge bg-primary"
              : null
          }
        >
          {row.user_active_this_area === 0
            ? "Unactive"
            : row.user_active_this_area === 1
            ? "Active"
            : null}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Change User activity Status",
      selector: (row) => (
        <Form.Select
          aria-label="Search by delivery"
          size="sm"
          className="w-100"
          onChange={(e) => onStatusChange(e, row.id)}
          name="status"
          value={row.user_active_this_area}
        >
          <option value="">Select user activity</option>

          <option value={0}>Unactive</option>

          <option value={1}>Active </option>
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
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert.bind(this, row.id)}
          />
        </div>
      ),
    },
  ];

  const onStatusChangee = async (id, e) => {
    const res = await changeAreaStatus(e.target.value, id);
    if (res.message === "successfull changed working area status  ") {
      setareaAssignAlert(true);
      // getAllworkList();
      // setapicall(true);
    }
  };

  const getOnlydriverList = async () => {
    setLoading(true);
    const response = await getDriverList();
    setapicall(false);
    setLoading(false);
    setDriverList(response);
  };
  const searchValueHandler = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
    setCityError(false);
    setAreaNameError(false);
    setPincodeError(false);
  };

  //search submit button
  const submitHandler = async () => {
    if (
      (searchdata.city === "") & (searchdata.area_name === "") &&
      searchdata.pin_code === ""
    ) {
      setCityError("cityEmpty");
      setAreaNameError("areaEmpty");
      setPincodeError("pincodeEmpty");
    } else {
      setLoading(true);
      const response = await getAllworkingAreafilter(
        searchdata.city,
        searchdata.area_name,
        searchdata.pin_code
      );
      setLoading(false);

      setAreaList(response);
    }
  };

  // reset button
  const OnReset = () => {
    setsearchData({
      city: "",
      area_name: "",
      pin_code: "",
    });
    getAllworkList();
    setapicall(true);
    setCityError(false);
    setAreaNameError(false);
    setPincodeError(false);
  };

  //get all working area list show
  useEffect(() => {
    getAllworkList();
    getOnlydriverList();
  }, [apicall]);

  //function for get all working list area.........
  const getAllworkList = async () => {
    setLoading(true);
    const response = await getAllworkingArea();
    setLoading(false);
    setapicall(false);
    console.log("working area--" + JSON.stringify(response));
    setAreaList(response);
  };

  // all alert close fuction
  const closeWorkingAlert = () => {
    setapicall(true);
    setShowDeleteAlert(false);
  };

  //delete workingArea alert---
  const handleAlert = (id) => {
    setShowDeleteAlert(true);
    setId(id);
  };

  // delete workingArea fuction-----------
  const deleteworkingAreaAlert = async () => {
    await changeWorkingAreaStatus(Id);
    setShowDeleteAlert(false);
    setapicall(true);
  };

  //workingArea status change function----
  const onStatusChange = async (e, id) => {
    await changeUserActivityStatus(e.target.value, id);

    getAllworkList();
    setapicall(true);
  };

  const closeAssignAlert = () => {
    setareaAssignAlert(false);
    setapicall(true);
    // setDriverListView(false);
  };
  return (
    <div>
      {loading === true ? <Loader /> : null}

      <div className="row admin_row">
        <div className="col-lg-3 col-md-6 col-sm-7 col-10">
          <Sidebar style={{ message: "workingArea" }} />
        </div>
        <div className="col-lg-9  admin_content_bar mt-5">
          <div className="main_content_div">
            <div
              className="dashboard-main-container mt-df25 mt-lg-31"
              id="dashboard-body"
            >
              <div className="">
                <div className="page_main_contant">
                  <h4> Driver Working Area</h4>
                  <div className=" mt-3 p-3">
                    <div className="row pb-3">
                      <div className="col-md-3 col-sm-6 aos_input mb-2">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="Search by City"
                            name="city"
                            onChange={searchValueHandler}
                            value={searchdata.city}
                          />
                        </Form.Group>

                        {cityError === "cityEmpty" ? (
                          <span className="text-danger"> City is empty</span>
                        ) : null}
                      </div>

                      <div className="col-md-3 col-sm-6 aos_input mb-2">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="Search by Area name"
                            name="area_name"
                            onChange={searchValueHandler}
                            value={searchdata.area_name}
                          />
                        </Form.Group>
                        {areaNameError === "areaEmpty" ? (
                          <span className="text-danger"> Area is empty</span>
                        ) : null}
                      </div>

                      <div className="col-md-3 col-sm-6 aos_input mb-2">
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="Search by pincode"
                            name="pin_code"
                            onChange={searchValueHandler}
                            value={searchdata.pin_code}
                          />
                        </Form.Group>
                        {pincodeError === "pincodeEmpty" ? (
                          <span className="text-danger"> Pincode is empty</span>
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
                    </div>

                    <DataTable
                      columns={columns}
                      data={AreaList}
                      pagination
                      highlightOnHover
                      pointerOnHover
                      className={"table_body workingArea_table"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add images model */}

      <SweetAlert
        show={ShowDeleteAlert}
        title=" Working area"
        text="Are you Sure you want to delete"
        onConfirm={deleteworkingAreaAlert}
        showCancelButton={true}
        onCancel={closeWorkingAlert}
      />

      <SweetAlert
        show={areaAssignAlert}
        title="Assigned Successfully"
        text={"Assign"}
        onConfirm={closeAssignAlert}
        // showCancelButton={}
        // onCancel={}
      />
    </div>
  );
};
export default DriverWorkingArea;
