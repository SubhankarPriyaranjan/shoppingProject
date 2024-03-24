import { useState, useEffect } from "react";
import swal from "sweetalert";

const NewProduct = () => {
  const [name, updateName] = useState("");
  const [price, updatePrice] = useState("");
  const [photo, updatePhoto] = useState("");
  const [detail, updateDetail] = useState("");

  const saveProduct = () => {
    let url = "http://localhost:1234/productlist";
    let postdata = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        name: name,
        price: price,
        photo: photo,
        details: detail,
        sellerid: localStorage.getItem("sellerid"),
      }),
    };
    fetch(url, postdata)
      .then((response) => response.json())
      .then((res) => {
        swal("Added id:" + res.id, name + " added successfully", "success");
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Enter new Product Details</h2>
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <div className="mt-4">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(obj) => updateName(obj.target.value)}
            />
          </div>
          <div className="mt-4">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              onChange={(obj) => updatePrice(obj.target.value)}
            />
          </div>
          <div className="mt-4">
            <label>Photo</label>
            <input
              type="url"
              className="form-control"
              onChange={(obj) => updatePhoto(obj.target.value)}
            />
          </div>
          <div className="mt-4">
            <label>Detail</label>
            <textarea
              className="form-control"
              onChange={(obj) => updateDetail(obj.target.value)}
            ></textarea>
          </div>
          <div className="mt-4 text-center">
            <button className="btn btn-danger" onClick={saveProduct}>
              Save
            </button>
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default NewProduct;
