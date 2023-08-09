import { useState } from "react";
import OrderDTO from "../../DTO/OrderDTO";
import Articles from "../Article/Articles";
import Alert from "../Alert";
import { RiArticleFill } from "react-icons/ri";
import { BsBoxSeam } from "react-icons/bs";

interface Props {
  orders: OrderDTO[];
  cancelOrder?: (id: number) => void;
  ordersType: "new" | "previous" | "all";
}

const Orders = ({ orders, cancelOrder, ordersType }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const isCancellable = (date: string) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 1);
    if (new Date() < newDate && localStorage.getItem("role") === "Customer") {
      return true;
    } else {
      return false;
    }
  };

  let isDelivered = (date: string) => {
    const newDate = new Date(date);
    if (new Date() > newDate) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="container-fluid text-center">
        <br />
        <div className="row">
          <div className="col-sm-3">
            <div className="container-fluid">
              {ordersType === "new" && (
                <h3 style={{ color: "#198754" }}>
                  New Orders
                  <BsBoxSeam
                    size="9.8%"
                    color="#198754"
                    style={{ marginLeft: "2%" }}
                  />
                </h3>
              )}
              {ordersType === "previous" && (
                <h3 style={{ color: "#198754" }}>
                  Previous Orders
                  <BsBoxSeam
                    size="9.8%"
                    color="#198754"
                    style={{ marginLeft: "2%" }}
                  />
                </h3>
              )}
              {ordersType === "all" && (
                <h3 style={{ color: "#198754" }}>
                  Orders
                  <BsBoxSeam
                    size="9.8%"
                    color="#198754"
                    style={{ marginLeft: "2%" }}
                  />
                </h3>
              )}
              <hr />
              <div
                id="list-example"
                className="list-group"
                style={{ overflowY: "scroll", height: "750px" }}
              >
                {orders.map((order) => (
                  <a
                    style={{ color: "white" }}
                    id={order.id.toString()}
                    key={order.id}
                    className={
                      selectedIndex === order.id
                        ? "list-group-item bg-success"
                        : "list-group-item bg-secondary"
                    }
                    onClick={() => {
                      setSelectedIndex(order.id);
                    }}
                    href={"#list-item-" + order.id}
                  >
                    <p>
                      Customer: {order.customer.name} -{" "}
                      {order.customer.username}
                    </p>
                    <p>
                      Creation time: {order.startTime} - Delivery time:{" "}
                      {order.endTime}
                    </p>
                    <p>
                      Address: {order.address} {" - Price: $"}
                      {order.price}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="col-sm-9 text-center">
            <h3 style={{ color: "#198754" }}>
              Order's Articles
              <RiArticleFill
                size="3%"
                color="#198754"
                style={{ marginLeft: "2%" }}
              />
            </h3>
            <hr />
            <div
              data-bs-spy="scroll"
              data-bs-target="#list-example"
              data-bs-smooth-scroll="true"
              className="overflow-auto"
              style={{ overflowY: "scroll", height: "750px" }}
            >
              {orders.map((order) => (
                <div key={order.id}>
                  <h4 id={"list-item-" + order.id}>
                    <p>
                      Customer: {order.customer.name} -{" "}
                      {order.customer.username}
                    </p>
                    <p>
                      Creation time: {order.startTime} - Delivery time:{" "}
                      {order.endTime}
                    </p>
                    <p>
                      Address: {order.address} {" - Price: $"}
                      {order.price}
                    </p>
                    {order.status === "Cancelled" && (
                      <Alert color="alert-danger" status={order.status} />
                    )}
                    {order.status === "Processing" &&
                      isDelivered(order.endTime) && (
                        <Alert color="alert-success" status={"Delivered"} />
                      )}
                    {order.status === "Processing" &&
                      !isDelivered(order.endTime) && (
                        <Alert color="alert-warning" status={order.status} />
                      )}
                    {isCancellable(order.startTime) && (
                      <p>
                        <button
                          className="btn btn-lg btn-dark"
                          style={{ marginTop: "2%" }}
                          onClick={() => cancelOrder(order.id)}
                        >
                          Cancel
                        </button>
                      </p>
                    )}
                  </h4>
                  <Articles articles={order.articles} articleButtons="none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
