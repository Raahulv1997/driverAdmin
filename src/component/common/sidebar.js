import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
const Sidebar = (props) => {
  const [onSidebar, setOnSidebar] = useState(false);

  const admin_token = localStorage.getItem("admin_token");

  const navigate = useNavigate();
  const OnLogoutClick = () => {
    if (admin_token !== null) {
      console.log("in admin token");

      localStorage.removeItem("admin_token");
      navigate("/");
    } else {
      alert("not logout");
    }
  };

  const OnSideBar = () => {
    setOnSidebar(true);
    if (onSidebar === true) {
      setOnSidebar(false);
    }
  };
  return (
    <div>
      <div className="show_sidebar" onClick={OnSideBar}>
        <AiOutlineMenu />
      </div>

      <div
        className={
          onSidebar === true
            ? "banner-category admin_sidebar show_admin_sidebar"
            : "banner-category admin_sidebar"
        }
      >
        <ul className="banner-category-list vh-100 pt-4">
          <li
            className={
              props.style.message === "Add driver"
                ? "banner-category-item active"
                : "banner-category-item "
            }
          >
            <Link to="/admin">
              <i className="flaticon-vegetable"></i>
              <span>Driver</span>
            </Link>
            {/* <div className="banner-category-dropdown">
              <h5>vegetables item</h5>
              <div className="banner-sub-category">
                <ul>
                  <li>
                    <a href="#">carrot</a>
                  </li>
                  <li>
                    <a href="#">broccoli</a>
                  </li>
                  <li>
                    <a href="#">asparagus</a>
                  </li>
                  <li>
                    <a href="#">cauliflower</a>
                  </li>
                  <li>
                    <a href="#">cucumber</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">eggplant</a>
                  </li>
                  <li>
                    <a href="#">green pepper</a>
                  </li>
                  <li>
                    <a href="#">lettuce</a>
                  </li>
                  <li>
                    <a href="#">mushrooms</a>
                  </li>
                  <li>
                    <a href="#">onion</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">potato</a>
                  </li>
                  <li>
                    <a href="#">pumpkin</a>
                  </li>
                  <li>
                    <a href="#">tomato</a>
                  </li>
                  <li>
                    <a href="#">beetroot</a>
                  </li>
                  <li>
                    <a href="#">zucchini</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">radish</a>
                  </li>
                  <li>
                    <a href="#">artichoke</a>
                  </li>
                  <li>
                    <a href="#">cabbage</a>
                  </li>
                  <li>
                    <a href="#">celery</a>
                  </li>
                  <li>
                    <a href="#">parsley</a>
                  </li>
                </ul>
              </div>
            </div> */}
          </li>

          <li
            className={
              props.style.message === "order with driver"
                ? "banner-category-item active"
                : "banner-category-item "
            }
          >
            <Link to="/orderWithDriver">
              <i className="flaticon-groceries"></i>
              <span>Driver Orders</span>
            </Link>
            {/* <div className="banner-category-dropdown">
              <h5>groceries item</h5>
              <div className="banner-sub-category">
                <ul>
                  <li>
                    <a href="#">Butter</a>
                  </li>
                  <li>
                    <a href="#">Rice</a>
                  </li>
                  <li>
                    <a href="#">Bread</a>
                  </li>
                  <li>
                    <a href="#">Pasta</a>
                  </li>
                  <li>
                    <a href="#">Cooking oil</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">Cheese</a>
                  </li>
                  <li>
                    <a href="#">Yogurt</a>
                  </li>
                  <li>
                    <a href="#">Onions</a>
                  </li>
                  <li>
                    <a href="#">Garlic</a>
                  </li>
                  <li>
                    <a href="#">Pulses</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">Soup</a>
                  </li>
                  <li>
                    <a href="#">Salt</a>
                  </li>
                  <li>
                    <a href="#">Pepper</a>
                  </li>
                  <li>
                    <a href="#">Herbs</a>
                  </li>
                  <li>
                    <a href="#">Sugar</a>
                  </li>
                </ul>
              </div>
            </div> */}
          </li>

          <li
            className={
              props.style.message === "vehicleRegister"
                ? "banner-category-item active"
                : "banner-category-item "
            }
          >
            <Link to={"/vehicleRegisterByadmin"}>
              <i className="flaticon-fruit"></i>
              <span>Driver Vehicle</span>
            </Link>
            {/* <div className="banner-category-dropdown">
              <h5>fruits item</h5>
              <div className="banner-sub-category">
                <ul>
                  <li>
                    <a href="#">Apple</a>
                  </li>
                  <li>
                    <a href="#">Orange</a>
                  </li>
                  <li>
                    <a href="#">Watermelon</a>
                  </li>
                  <li>
                    <a href="#">Pear</a>
                  </li>
                  <li>
                    <a href="#">Cherry</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">Strawberry</a>
                  </li>
                  <li>
                    <a href="#">Nectarine</a>
                  </li>
                  <li>
                    <a href="#">Grape</a>
                  </li>
                  <li>
                    <a href="#">Mango</a>
                  </li>
                  <li>
                    <a href="#">Blueberry</a>
                  </li>
                </ul>
              </div>
            </div> */}
          </li>

          <li
            className={
              props.style.message === "order List"
                ? "banner-category-item active"
                : "banner-category-item "
            }
          >
            <Link to="/orderList">
              <i className="flaticon-dairy-products"></i>
              <span>Customer Order</span>
            </Link>
            {/* <div className="banner-category-dropdown">
              <h5>dairy items</h5>
              <div className="banner-sub-category">
                <ul>
                  <li>
                    <a href="#">Eggs</a>
                  </li>
                  <li>
                    <a href="#">milk</a>
                  </li>
                  <li>
                    <a href="#">Cheese</a>
                  </li>
                  <li>
                    <a href="#">Butter</a>
                  </li>
                  <li>
                    <a href="#">Shore</a>
                  </li>
                </ul>
              </div>
            </div> */}
          </li>

          <li
            className={
              props.style.message === "workingArea"
                ? "banner-category-item active"
                : "banner-category-item "
            }
          >
            <Link to="/driverWorkingArea">
              <i className="flaticon-groceries"></i>
              <span>Driver Working Area</span>
            </Link>
            {/* <div className="banner-category-dropdown">
              <h5>groceries item</h5>
              <div className="banner-sub-category">
                <ul>
                  <li>
                    <a href="#">Butter</a>
                  </li>
                  <li>
                    <a href="#">Rice</a>
                  </li>
                  <li>
                    <a href="#">Bread</a>
                  </li>
                  <li>
                    <a href="#">Pasta</a>
                  </li>
                  <li>
                    <a href="#">Cooking oil</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">Cheese</a>
                  </li>
                  <li>
                    <a href="#">Yogurt</a>
                  </li>
                  <li>
                    <a href="#">Onions</a>
                  </li>
                  <li>
                    <a href="#">Garlic</a>
                  </li>
                  <li>
                    <a href="#">Pulses</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">Soup</a>
                  </li>
                  <li>
                    <a href="#">Salt</a>
                  </li>
                  <li>
                    <a href="#">Pepper</a>
                  </li>
                  <li>
                    <a href="#">Herbs</a>
                  </li>
                  <li>
                    <a href="#">Sugar</a>
                  </li>
                </ul>
              </div>
            </div> */}
          </li>

          <li
            className={
              props.style.message === "manageAdmin"
                ? "banner-category-item active"
                : "banner-category-item "
            }
          >
            <Link to="/manageAdmin">
              <i className="flaticon-groceries"></i>
              <span>Manage Admin</span>
            </Link>
            {/* <div className="banner-category-dropdown">
              <h5>groceries item</h5>
              <div className="banner-sub-category">
                <ul>
                  <li>
                    <a href="#">Butter</a>
                  </li>
                  <li>
                    <a href="#">Rice</a>
                  </li>
                  <li>
                    <a href="#">Bread</a>
                  </li>
                  <li>
                    <a href="#">Pasta</a>
                  </li>
                  <li>
                    <a href="#">Cooking oil</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">Cheese</a>
                  </li>
                  <li>
                    <a href="#">Yogurt</a>
                  </li>
                  <li>
                    <a href="#">Onions</a>
                  </li>
                  <li>
                    <a href="#">Garlic</a>
                  </li>
                  <li>
                    <a href="#">Pulses</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">Soup</a>
                  </li>
                  <li>
                    <a href="#">Salt</a>
                  </li>
                  <li>
                    <a href="#">Pepper</a>
                  </li>
                  <li>
                    <a href="#">Herbs</a>
                  </li>
                  <li>
                    <a href="#">Sugar</a>
                  </li>
                </ul>
              </div>
            </div> */}
          </li>

          <li className="banner-category-item">
            <Link to="">
              <i
                className="flaticon-groceries"
                style={{ cursor: "pointer" }}
              ></i>
              <span onClick={OnLogoutClick}> Logout</span>
            </Link>
            {/* <div className="banner-category-dropdown">
              <h5>groceries item</h5>
              <div className="banner-sub-category">
                <ul>
                  <li>
                    <a href="#">Butter</a>
                  </li>
                  <li>
                    <a href="#">Rice</a>
                  </li>
                  <li>
                    <a href="#">Bread</a>
                  </li>
                  <li>
                    <a href="#">Pasta</a>
                  </li>
                  <li>
                    <a href="#">Cooking oil</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">Cheese</a>
                  </li>
                  <li>
                    <a href="#">Yogurt</a>
                  </li>
                  <li>
                    <a href="#">Onions</a>
                  </li>
                  <li>
                    <a href="#">Garlic</a>
                  </li>
                  <li>
                    <a href="#">Pulses</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">Soup</a>
                  </li>
                  <li>
                    <a href="#">Salt</a>
                  </li>
                  <li>
                    <a href="#">Pepper</a>
                  </li>
                  <li>
                    <a href="#">Herbs</a>
                  </li>
                  <li>
                    <a href="#">Sugar</a>
                  </li>
                </ul>
              </div>
            </div> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
