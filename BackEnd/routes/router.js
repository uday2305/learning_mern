const express = require("express");
const router = express();

const controller = require("../controllers/controller");

router.post("/api/v1/users/login", controller.validateLogin);
router.post("/api/v1/users/register", controller.register);

router.get(
  "/api/v1/profile",
  controller.checkAuthorization,
  controller.getProfile
);
router.patch(
  "/api/v1/profile/address",
  controller.checkAuthorization,
  controller.patchUserAddress
);

router.patch(
  "/api/v1/profile/image",
  controller.checkAuthorization,
  controller.patchUserImage
);
router.delete(
  "/api/v1/profile/image",
  controller.checkAuthorization,
  controller.deleteUserImage
);

router.get("/api/v1/products", controller.getProducts);
router.get("/api/v1/products/:id", controller.getProductsById);

router.get("/api/v1/homepage/banner", controller.getHomePageBanners);
router.get("/api/v1/homepage/categories", controller.getHomePageCategories);
router.get("/api/v1/homepage/products", controller.getHomePageProducts);

router.post(
  "/api/v1/admin/products",
  controller.checkAuthorization,
  controller.checkIsAdmin,
  controller.addProduct
);
router.patch(
  "/api/v1/admin/products/:id",
  controller.checkAuthorization,
  controller.checkIsAdmin,
  controller.editProduct
);
router.delete(
  "/api/v1/admin/products/:id",
  controller.checkAuthorization,
  controller.checkIsAdmin,
  controller.deleteProduct
);

router.post("/api/v1/checkout", controller.checkLoggedIn, controller.checkOut);

router.get(
  "/api/v1/orders",
  controller.checkAuthorization,
  controller.getOrders
);
router.get(
  "/api/v1/orders/:id",
  controller.checkAuthorization,
  controller.getOrdersDetails
);

router.patch(
  "/api/v1/admin/orders/:id",
  controller.checkAuthorization,
  controller.checkIsAdmin,
  controller.editOrder
);
router.delete(
  "/api/v1/admin/orders/:id",
  controller.checkAuthorization,
  controller.checkIsAdmin,
  controller.deleteOrder
);

router.get(
  "/api/v1/admin/users",
  controller.checkAuthorization,
  controller.checkIsAdmin,
  controller.getAllUsers
);
router.get(
  "/api/v1/admin/users/:id",
  controller.checkAuthorization,
  controller.checkIsAdmin,
  controller.getUserDetails
);

router.patch(
  "/api/v1/admin/users/:id",
  controller.checkAuthorization,
  controller.checkIsAdmin,
  controller.editUser
);
router.delete(
  "/api/v1/admin/users/:id",
  controller.checkAuthorization,
  controller.checkIsAdmin,
  controller.deleteUser
);

module.exports = router;
