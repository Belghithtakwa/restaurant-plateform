const Address = require("../models/address.models");
const Order = require("../models/order.models");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({ orders: orders });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getOwnedOrder = async (req, res) => {
  const order = req.order;
  try {
    return res.status(200).json({ order: order });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getOwnedOrderByCode = async (req, res) => {
  try {
    const order = await Order.findOne({ code: req.params.orderCode })
      .populate({ path: "client", select: "firstName lastName phoneNumber" })
      .populate("deliveryAddress");
    return res.status(200).json({ order: order });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getOwnedOrders = async (req, res) => {
  const clientId = req.verifiedUser._id;
  try {
    const orders = await Order.find({ client: clientId });
    return res.status(200).json({ orders: orders });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const createOrder = async (req, res) => {
  let newOrder = null;
  if (req.verifiedUser.isManager) {
    newOrder = new Order({
      items: req.body.items,
      orderType: req.body.orderType,
      deliveryAddress: req.body.deliveryAddress,
      totalPrice: req.body.totalPrice,
      onModel: "Manager",
      restaurant: req.restaurant._id,
      client: req.verifiedUser._id,
    });
  } else {
    newOrder = new Order({
      items: req.body.items,
      orderType: req.body.orderType,
      deliveryAddress: req.body.deliveryAddress,
      totalPrice: req.body.totalPrice,
      onModel: "Client",
      restaurant: req.restaurant._id,
      client: req.verifiedUser._id,
    });
  }
  try {
    const savedOrder = await newOrder.save();

    return res.status(200).json({
      order: savedOrder.populate({
        path: "items.product",
        select: "productName",
      }),
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const addToClientOrder = async (req, res) => {
  const order = req.order;
  let updatedOrder = null;
  const searchedProduct = req.order.items
    .map((e) => {
      return e.product._id;
    })
    .indexOf(req.body.item.product);
  try {
    if (searchedProduct !== -1) {
      let newQuantity = order.items[searchedProduct].quantity + 1;
      let newPrice = newQuantity * order.items[searchedProduct].price;
      updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        {
          $set: {
            "items.$[elem].quantity": newQuantity,
            "items.$[elem].totalPrice": newPrice,
          },
        },
        {
          new: true,
          arrayFilters: [{ "elem.product": req.body.item.product }],
        }
      ).populate({
        path: "items.product",
        select: "productName",
      });
    } else {
      updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        {
          $push: { items: req.body.item },
        },
        { new: true }
      ).populate({
        path: "items.product",
        select: "productName",
      });
    }
    await updatedOrder.calculateTotal();
    return res.status(200).json({ order: updatedOrder });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const getOrderById = async (req, res) => {
  const order = req.order;
  try {
    return res.status(200).json({ order: order });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const orderCheckout = async (req, res) => {
  const order = req.order;
  let checkedOrder = null;
  try {
    if (req.body.orderType === "delivery") {
      const newAddress = new Address({
        streetName: req.body.streetName,
        codeZip: req.body.codeZip,
        blockNumber: req.body.blockNumber,
      });
      const savedAddress = await newAddress.save();
      checkedOrder = await Order.findByIdAndUpdate(
        order._id,
        {
          orderType: req.body.orderType,
          deliveryAddress: savedAddress._id,
          state: "waiting_confirmation",
        },
        {
          new: true,
        }
      );
    } else {
      checkedOrder = await Order.findByIdAndUpdate(
        order._id,
        {
          orderType: "in_place",
          state: "waiting_confirmation",
        },
        {
          new: true,
        }
      );
    }
    return res.status(200).json({ order: checkedOrder });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const confirmOrder = async (req, res) => {
  const order = req.order;
  try {
    const confirmedOrder = await Order.findByIdAndUpdate(
      order._id,
      { state: "confirmed" },
      { new: true }
    );
    return res.status(200).json({ order: confirmedOrder });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const cancelOrder = async (req, res) => {
  const order = req.order;
  try {
    const canceledOrder = await Order.findByIdAndUpdate(
      order._id,
      { state: "canceled" },
      { new: true }
    );
    return res.status(200).json({ order: canceledOrder });
  } catch (err) {
    return res.status(500).json(err);
  }
};
const payOrderWithStripe = async (req, res) => {
  const order = req.order;
  try {
    await Order.findByIdAndUpdate(
      order._id,
      { state: "confirmed", payed: true },
      { new: true }
    );
  } catch (error) {
    return res.status(500).json(err);
  }
  lineItems = [];
  order.items.forEach((element) => {
    lineItems.push({
      price_data: {
        currency: "EUR",
        product_data: {
          name: element.product.productName,
          images: [element.product.image],
        },
        unit_amount: element.totalPrice,
      },
      quantity: element.quantity,
    });
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3000/orders/details/${order.code}?success=true`,
    cancel_url: `http://localhost:3000/orders/details/${order.code}?success=fasle`,
  });
  return res.json({ session: session.id });
};
// const updateOrder = async (req, res) => {
//   const order = req.order;

//   try {
//     const data = req.body;
//     const { ...dataToUpdate } = data;
//     const updatedOrder = await Order.findByIdAndUpdate(order._id, dataToUpdate, {
//       new: true,
//     });
//     return res.status(500).json({ updatedOrder: updatedOrder });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

const deleteOrder = async (req, res) => {
  const order = req.order;

  try {
    const deletedOrder = await Order.findByIdAndDelete(order._id);
    return res.status(200).json({ deletedOrder: deletedOrder });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// module.exports.updateOrder = updateOrder;
module.exports.createOrder = createOrder;
module.exports.deleteOrder = deleteOrder;
module.exports.getOrders = getOrders;
module.exports.getOrderById = getOrderById;
module.exports.getOwnedOrder = getOwnedOrder;
module.exports.getOwnedOrders = getOwnedOrders;
module.exports.addToClientOrder = addToClientOrder;
module.exports.orderCheckout = orderCheckout;
module.exports.getOwnedOrderByCode = getOwnedOrderByCode;
module.exports.confirmOrder = confirmOrder;
module.exports.cancelOrder = cancelOrder;
module.exports.payOrderWithStripe = payOrderWithStripe;
