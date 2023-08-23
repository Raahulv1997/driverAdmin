import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";

import useValidation from "../common/useValidation";
import { devliveryOrderStatus, getOrderWithDriver } from "../api/api";
import Sidebar from "../common/sidebar";
import moment from "moment";
import Loader from "../common/loader";
const OrderWithDriver = () => {
  const [ordertable, setorderTable] = useState([]);
  const [apicall, setapicall] = useState(false);
  const [loading, setLoading] = useState(false);

  let admin_token = localStorage.getItem("admin_token");
  // date filter intialstate----------------
  const initialFormState = {
    date_from: "",
    date_to: "",
  };

  //order with driver data table column----
  const columns = [
    {
      name: "Order No",
      selector: (row) => <p>{row.order_id}</p>,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Driver Name",
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
      name: "Driver Lastname",
      selector: (row) => row.driver_last_name || <b>unavailable</b>,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Total amount",
      selector: (row) => row.payment || <b>unavailable</b>,
      sortable: true,
      width: "140px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },

    {
      name: "Username",
      selector: (row) => row.user_name || <b>unavailable</b>,
      sortable: true,
      width: "140px",
      center: true,
    },

    {
      name: "Status",
      width: "170px",
      selector: (row) => (
        <span
          className={
            row.order_status === "ready_to_pickup"
              ? "badge bg-secondary"
              : row.order_status === "Pickuped"
              ? "badge bg-warning"
              : row.order_status === "Rejected_by_customer"
              ? "badge bg-info"
              : row.order_status === "Failed_Delivery_Attempts"
              ? "badge bg-danger"
              : row.order_status === "Delivered"
              ? "badge bg-success"
              : "badge bg-dark"
          }
        >
          {row.order_status === "ready_to_pickup"
            ? "Ready to pickup"
            : row.order_status === "Pickuped"
            ? "Pickuped"
            : row.order_status === "Failed_Delivery_Attempts"
            ? "Failed Delivery Attempts"
            : row.order_status === "Delivered"
            ? "Delivered"
            : row.order_status === "Rejected_by_customer"
            ? "Rejected by customer"
            : "No status update"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Change Status",
      width: "150px",
      selector: (row) => (
        <Form.Select
          aria-label="Search by delivery"
          size="sm"
          className="w-100"
          onChange={(e) => onStatusChange(e, row.order_id)}
          name="order_status"
          value={row.order_status}
        >
          <option value="">Select status</option>
          <option value="Failed_Delivery_Attempts">
            Failed Delivery Attempts
          </option>
          <option value="Pickuped">Pickuped </option>
          <option value="Rejected_by_customer">Rejected by customer</option>

          <option value="ready_to_pickup">Ready to pickup</option>
          <option value="Delivered">Delivered</option>
        </Form.Select>
      ),
      sortable: true,
    },

    {
      name: "Delivery Address",
      selector: (row) => row.address || <b>unavailable</b>,
      sortable: true,
      width: "140px",
      center: true,
    },
    {
      name: "Order date",
      selector: (row) =>
        moment(row.order_date).format("YYYY-MM-DD") || <b>unavailable</b>,
      sortable: true,
      width: "140px",
      center: true,
    },

    {
      name: "Delivery date",
      selector: (row) =>
        moment(row.delivery_date).format("YYYY-MM-DD") || <b>unavailable</b>,
      sortable: true,
      width: "140px",
      center: true,
    },
    {
      name: "Order Assign date",
      selector: (row) =>
        moment(row.order_asign_date).format("YYYY-MM-DD") || <b>unavailable</b>,
      sortable: true,
      width: "140px",
      center: true,
    },
    {
      name: "DriverContact",
      selector: (row) => row.contect_no || <b>unavailable</b>,
      sortable: true,
      width: "140px",
      center: true,
    },
  ];

  // filter validation
  const validators = {
    date_from: [
      (value) =>
        value === null || value === ""
          ? "Please Fill from date"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            null,
    ],
    date_to: [
      (value) =>
        value === null || value === ""
          ? "Please Fill to date"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            null,
    ],
  };

  //import custom validations
  const {
    state,
    setState,
    onInputChange,

    errors,
    setErrors,
    validate,
  } = useValidation(initialFormState, validators);

  //order  data useEffect.... get all order list
  useEffect(() => {
    OrderData();
  }, [apicall]);

  let headerObj = { headers: { admin_token: admin_token } };
  //get order with driver function------------------
  const OrderData = async () => {
    setLoading(true);
    const response = await getOrderWithDriver(
      state.date_from,
      state.date_to,
      headerObj
    );
    setLoading(false);
    setapicall(false);
    var filtered = response.filter(function(el) {
      return el.driver_id !== null;
    });

    setorderTable(filtered);
  };

  //search submit button

  const submitHandler = async () => {
    if (validate()) {
      const response = await getOrderWithDriver(
        state.date_from,
        state.date_to,
        headerObj
      );

      setorderTable(response);
    }
  };

  //search submit reset button
  const OnReset = () => {
    setState({ date_from: "", date_to: "" });

    setapicall(true);
    setErrors({});
  };

  const onStatusChange = async (e, id) => {
    await devliveryOrderStatus(id, e.target.value);

    setapicall(true);
    OrderData();
  };
  return (
    <div>
      {loading === true ? <Loader /> : null}

      <div className="row admin_row">
        <div className="col-lg-3 col-md-6 col-sm-7 col-10">
          <Sidebar style={{ message: "order with driver" }} />
        </div>
        <div className="col-lg-9  admin_content_bar mt-5">
          <div className="main_content_div">
            <div
              className="dashboard-main-container mt-df25 mt-lg-31"
              id="dashboard-body"
            >
              <div className="">
                <div className="page_main_contant">
                  <h4>Order List with driver</h4>
                  <div className=" mt-3 p-3">
                    <div className="row pb-3     align-items-center">
                      <div className="col-md-3 col-sm-6 aos_input mb-2">
                        <label style={{ color: "#555" }}>Start date:</label>
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="date"
                            className={
                              errors.date_from
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            placeholder="Search by order no."
                            name="date_from"
                            onChange={onInputChange}
                            value={state.date_from}
                            max={moment().format("YYYY-MM-DD")}
                          />
                        </Form.Group>
                        {errors.date_from
                          ? (errors.date_from || []).map((error) => {
                              return (
                                <small className="text-danger">{error}</small>
                              );
                            })
                          : null}
                      </div>

                      <div className="col-md-3 col-sm-6 aos_input mb-2">
                        <label style={{ color: "#555" }}>End date:</label>
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="date"
                            className={
                              errors.date_to
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            placeholder="Search by order no."
                            name="date_to"
                            onChange={onInputChange}
                            value={state.date_to}
                            min={moment(state.date_from).format("YYYY-MM-DD")}
                          />
                        </Form.Group>
                        {errors.date_to
                          ? (errors.date_to || []).map((error) => {
                              return (
                                <small className="text-danger">{error}</small>
                              );
                            })
                          : null}
                      </div>
                      <div className="col-md-2 col-sm-6 aos_input mb-sm-0 mb-2">
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
                      <div className="col-md-2 col-sm-6 aos_input mb-sm-0 mb-2">
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
                      data={ordertable}
                      pagination
                      highlightOnHover
                      pointerOnHover
                      className={"table_body product_table"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderWithDriver;
