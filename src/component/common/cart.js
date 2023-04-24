import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CartItem from "./cart_item";
import { user_cart_api, update_to_cart_api, cart_delete_api } from "../api/api";
// import CartContext from "../helper/cart";

const Cart = ({ showCartProp, cart_list_hide }) => {
  const [reload, setReload] = useState("");
  const navigate = useNavigate();
  const [cartdata, setCartdata] = useState();
  const user_token = localStorage.getItem("user_token");

  async function call_cart_list() {
    let token_obj;
    if (user_token !== "" && user_token !== null && user_token !== undefined) {
      token_obj = { headers: { user_token: `${user_token}` } };
      let result = await user_cart_api(token_obj);
      console.log(result);
      setCartdata(result);
    } else {
      alert("please login your account");
    }
  }

  useEffect(() => {
    call_cart_list();
  }, [reload, showCartProp]);

  async function incrementDecrementCount_function(
    chk_p_m,
    cart_count,
    product_id
  ) {
    let cart_product_quantity;
    let token = localStorage.getItem("user_token");
    if (chk_p_m === "1") {
      // localStorage.setItem("product_Quanity", true);
      cart_product_quantity = parseInt(cart_count) + 1;
    }
    if (chk_p_m === "0") {
      // localStorage.setItem("product_Quanity", true);
      cart_product_quantity = parseInt(cart_count) - 1;
    }

    if (token !== "" && token !== null && token !== undefined) {
      if (cart_product_quantity < 1) {
        let result = await cart_delete_api([
          { product_id, cart_product_quantity },
          { headers: { user_token: `${token}` } },
        ]);
        console.log(result);
        if (result.success === true) {
          setReload(Math.floor(Math.random() * 500 + 1));
        } else {
          alert(result.success);
        }
      } else {
        //  localStorage.setItem("product_Quanity", cart_product_quantity);
        let result = await update_to_cart_api([
          { product_id, cart_product_quantity },
          { headers: { user_token: `${token}` } },
        ]);

        // <CartContext.Provider value={{ message: cart_product_quantity }}>
        //   {props.children}
        // </CartContext.Provider>;
        // localStorage.setItem("product_Quanity", true);

        if (result.success === true) {
          setReload(Math.floor(Math.random() * 500 + 1));
        } else {
          alert(result.success);
        }
      }
    } else {
      alert("please login your account___" + cart_count);
      navigate("/login");
    }
  }

  return (
    <div>
      <aside
        className={
          showCartProp
            ? "col-md-9 cart-sidebar active"
            : "col-md-9 cart-sidebar "
        }
      >
        <div className="cart-header ">
          <div className="cart-total">
            <i className="fas fa-shopping-basket"></i>
            <span>cart</span>
          </div>
          <button onClick={cart_list_hide} className="cart-close">
            {/* <Link to={"/"}> */}
            <i className="icofont-close"></i>
            {/* </Link> */}
          </button>
        </div>
        <ul className="cart-list">
          {(cartdata || []).map((cart_item) => {
            return (
              <CartItem
                cover_image={cart_item.cover_image}
                name={cart_item.name}
                product_id={cart_item.product_id}
                cart_product_quantity={cart_item.cart_product_quantity}
                price={cart_item.price}
                incrementDecrementCount={incrementDecrementCount_function}
              />
            );
          })}
        </ul>
        <div className="cart-footer">
          <button className="coupon-btn">Do you have a coupon code?</button>
          <form className="coupon-form">
            <input type="text" placeholder="Enter your coupon code" />
            <button type="submit">
              <span>apply</span>
            </button>
          </form>
          <Link to={`/checkout`} className="cart-checkout-btn">
            <span className="checkout-label  "> Proceed to Checkout</span>
            <span className="checkout-price"> </span>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Cart;