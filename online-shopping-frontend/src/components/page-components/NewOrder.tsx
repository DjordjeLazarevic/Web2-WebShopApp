import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ArticleDTO from "../../DTO/ArticleDTO";
import Articles from "../Articles";
import { AiFillDelete } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import articleHttpService from "../../services/article-http-service";

const NewOrder = () => {
  let [cart, setCart] = useState<ArticleDTO[]>([]);
  let [articles, setArticles] = useState<ArticleDTO[]>([]);

  useEffect(() => {
    articleHttpService
      .getAll()
      .then((res) => {
        setArticles(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const addToCart = (id: number, wantedAmount: number) => {
    console.log(articles);
    console.log(id, wantedAmount);
    if (!isNaN(wantedAmount)) {
      const isFound = cart.some((element) => {
        if (element.id === id) {
          return true;
        }
        return false;
      });
      if (isFound) {
        Swal.fire({
          icon: "error",
          title:
            "Item already exists in cart ! If you want to change quantity, remove the item and add it again with a wanted quantity.",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        let item = { ...articles.find((article) => article.id === id) };
        if (item!.quantity < wantedAmount || wantedAmount <= 0) {
          console.log("NONO");
        } else {
          item!.quantity = wantedAmount;
          setCart((cart) => [...cart, item]);
          Swal.fire({
            icon: "success",
            title: "Item added to cart.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Please, input wanted quantity.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <br />
      <br />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <h1>New Order</h1>
          </div>
          <br />
          <div className="col-sm-3">
            <button
              className="btn btn-lg btn-primary position-relative"
              data-bs-toggle="modal"
              data-bs-target="#cart"
            >
              Cart
              <BsFillCartFill style={{ marginBottom: "6%" }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </div>
        </div>
      </div>{" "}
      {
        <Articles
          articles={articles}
          articleButtons="shopping"
          addToCart={addToCart}
        />
      }
      <div
        className="modal modal-xl fade"
        id="cart"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cart
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table text-center align-middle table-borderless table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td width="24%">
                        <AiFillDelete
                          size="15%"
                          color="red"
                          onClick={() => removeFromCart(item.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <h4 style={{ marginRight: "12%" }}>
                Total: ${" "}
                {cart
                  .reduce((acc, item) => item.price * item.quantity + acc, 0)
                  .toFixed(2)}
              </h4>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewOrder;