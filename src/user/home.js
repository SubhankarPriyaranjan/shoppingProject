import { useState, useEffect } from "react";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

const Myhome = () => {
  let [allproduct, updateProduct] = useState([]);

  const getProduct = () => {
    fetch("http://localhost:1234/productlist")
      .then((response) => response.json())
      .then((productArray) => {
        updateProduct(productArray.reverse());
      });
  };

  useEffect(() => {
    getProduct();
  }, [1]);

  const addtoCart = async (productinfo) => {
    productinfo["qty"] = 1;
    let url = "http://localhost:1234/cartlist";
    let postData = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(productinfo),
    };

    await fetch(url, postData)
      .then((response) => response.json())
      .then((serverres) => {
        swal(productinfo.name, " Added in your cart ..", "success");
      })
      .catch((err) => {
        swal(productinfo.name, " Already Exist in your cart ..", "error");
      });
  };

  let [keyword, updateKeyword] = useState("");
  // this is code for pagination  from 41 to 49
  const PER_PAGE = 8; //this is the element contain in one page
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(allproduct.length / PER_PAGE);

  return (
    <section>
      <div id="banner"></div>
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={(obj) => updateKeyword(obj.target.value)}
            />
          </div>
          <div className="col-lg-4"></div>
        </div>

        <div className="row">
          {
            //to add pagination we need to add slice and those page data here before map
            allproduct
              .slice(offset, offset + PER_PAGE)
              .map((product, index) => {
                if (
                  product.name.toLowerCase().includes(keyword.toLowerCase())
                ) {
                  return (
                    <div className="col-lg-3 mb-4" key={index}>
                      <div className="p-4 shadow">
                        <h4 className="text-info mb-3 text-center">
                          {" "}
                          {product.name}{" "}
                        </h4>
                        <img
                          src={product.photo}
                          className="rounded"
                          height="140"
                          width="100%"
                        />
                        <p className="mt-3"> {product.details} </p>
                        <p className="m-3">Rs. {product.price} </p>
                        <p className="text-center">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={addtoCart.bind(this, product)}
                          >
                            <i className="fa fa-shopping-cart"></i> Add to Cart
                          </button>
                        </p>
                      </div>
                    </div>
                  );
                }
              })
          }
        </div>
      </div>
      {/* This is for Page link and Positioning  90-112 */}

      <div className="mb-4 mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination  justify-content-center"}
          pageClassName={"page-item "}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active primary"}
        />
      </div>
      {/* Footer Section Start from here  */}
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="twitter" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="google" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="instagram" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon icon="gem" className="me-3" />
                  Company name
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Angular
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    React
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Vue
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Laravel
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  Tangi,Cuttack,Odisha,754022
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  subhankarpriyaranjanrout@gmail.com
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" /> +91 8327703270
                </p>
                <p>
                  <MDBIcon icon="print" className="me-3" /> +0671 6474825
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 Copyright:
          <a className="text-reset fw-bold" href="">
            Subhankar
          </a>
        </div>
      </MDBFooter>
      {/* end of Footer Section  */}
    </section>
  );
};

export default Myhome;
