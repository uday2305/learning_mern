import React, { useEffect } from "react";
import { cartActions, productActions, alertActions } from "../../redux/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { displayAsCurrency } from "../../helpers";
const HomePage = (props) => {
  useEffect(() => {
    // code to run on component mount
    props.clearAlerts();
    props.getProducts();
    props.getHomePageBanner();
  }, []);
  const handleAddToCart = (e) => {
    let productId = e.currentTarget.attributes["data-productid"]?.nodeValue;
    if (productId) {
      let cartItem = props.productList.products.find(function (obj) {
        return obj._id === productId;
      });
      props.addItemToCart(cartItem);
    }
  };
  return (
    <div className="container">
      {props.homePageBannerProductList &&
      props.homePageBannerProductList?.products ? (
        <div
          id="carouselExampleIndicators"
          className="carousel slide my-2"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={props.homePageBannerProductList?.products[0]?.image}
                className="d-block w-100"
                height="500"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={props.homePageBannerProductList?.products[1]?.image}
                height="500"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={props.homePageBannerProductList?.products[2]?.image}
                className="d-block w-100"
                alt="..."
                height="500"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        ""
      )}

      <h3>Categories</h3>
      <div className="row g-3 mb-5">
        <div className="col">
          <div className="card shadow-sm">
            <Link to="/categories/shoes">
              <img
                src="https://media.istockphoto.com/photos/running-shoes-picture-id1249496770?b=1&k=20&m=1249496770&s=170667a&w=0&h=_SUv4odBqZIzcXvdK9rqhPBIenbyBspPFiQOSDRi-RI="
                width="100%"
                height="225"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <h6 className="ms-1">Shoes</h6>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm">
            <Link to="/categories/electronics">
              <img
                src="https://cdn.mos.cms.futurecdn.net/X5TyA8uvkGXoNyjFzxcowS.jpg"
                width="100%"
                height="225"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <h6 className="ms-1">Electronics</h6>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm">
            <Link to="/categories/toys">
              <img
                src="https://image.shutterstock.com/image-vector/kids-toys-train-plane-castle-260nw-1862895565.jpg"
                width="100%"
                height="225"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <h6 className="ms-1">Toys</h6>
          </div>
        </div>
      </div>

      {props.productList ? (
        <div>
          {props.alert.message && (
            <div className={`alert ${props.alert.type}`}>
              {props.alert.message}
            </div>
          )}
          <h3>Top Products</h3>
          <div className="row row-cols-4 mb-3">
            {props.productList?.products.slice(0, 8).map((product, index) => (
              <div className="col mb-3" key={product._id}>
                <div className="card shadow-sm">
                  <Link to={`/products/${product._id}`} className="border-0">
                    {" "}
                    <img
                      src={product.image}
                      alt={product.name}
                      width="100%"
                      height="225"
                      className="home-top-products-image"
                    />
                    {product.isTopProduct ? (
                      <div className="home-top-selling p-1 bg-warning">
                        <span className="ms-2 text-secondary">
                          Top Selling Product
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </Link>
                  <div className="d-flex py-2">
                    <div className="w-50">
                      <h6 className="ms-1 float-start">
                        {displayAsCurrency(product.discountPrice)}
                      </h6>
                    </div>
                    <div className="w-50">
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        data-productid={product._id}
                        className="me-1 float-end btn btn-primary btn-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
function mapState(state) {
  const { loading, productList } = state.productList;
  const { homePageBannerProductList } = state.homePageBanner;
  const { alert } = state;
  return { loading, alert, homePageBannerProductList, productList };
}

const actionCreators = {
  getProducts: productActions.getProducts,
  getHomePageBanner: productActions.getHomePageBanners,
  addItemToCart: cartActions.addItemToCart,
  clearAlerts: alertActions.clear,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
