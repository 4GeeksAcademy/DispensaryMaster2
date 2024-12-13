import React from "react";

const CartManagement = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Back to Shop and Support */}
      <div className="flex justify-between items-center mb-6">
        <a href="/shop" className="text-gray-500 text-sm">
          &larr; Back to Shop
        </a>
        <a href="/support" className="text-gray-500 text-sm">
          Customer Support
        </a>
      </div>

      {/* Shopping Cart Header */}
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <p className="text-gray-600 mb-6">
        Shipping charges and discount codes are confirmed at checkout.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Your Order Section */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Your Order</h2>
          <div className="space-y-4">
            {[1, 2].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="bg-gray-200 w-16 h-16 rounded-md"></div>
                  {/* Product Details */}
                  <div>
                    <h3 className="text-lg font-semibold">Product Name</h3>
                    <p className="text-sm text-gray-600">Description, color, size</p>
                    <p className="text-sm text-gray-500">Shipping 2-4 weeks</p>
                  </div>
                </div>
                {/* Quantity and Price */}
                <div className="flex items-center space-x-6">
                  <div>
                    <select className="border rounded-md px-2 py-1">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-gray-600 line-through">$95</p>
                    <p className="text-black font-bold">$70</p>
                    <p className="text-green-600 text-sm">You save 25%</p>
                  </div>
                  {/* Remove Button */}
                  <button className="text-red-500 hover:text-red-700">
                    &#x1F5D1;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
            <div className="flex justify-between">
              <p>Items in the Cart</p>
              <p>$149.00</p>
            </div>
            <div className="flex justify-between">
              <p>Savings applied</p>
              <p>-$25.00</p>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>$124.00</p>
            </div>
            <button className="bg-black text-white px-6 py-3 w-full rounded-md hover:bg-gray-800">
              Go to Checkout
            </button>
          </div>
          <button className="mt-4 text-blue-500 hover:underline">
            Discount Code / Gift Card
          </button>
        </div>
      </div>

      {/* Safe & Easy Shopping Section */}
      <div className="mt-10 space-y-6">
        <h2 className="text-xl font-bold">Safe & Easy Shopping</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">&#x21BA;</span>
            <p>Free returns for 30 days</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">&#x1F4B3;</span>
            <p>Convenient payment methods</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">&#x1F4E6;</span>
            <p>Deliver to home or pick-up point</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-16 border-t pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-bold">Need help?</h3>
            <a href="/contact" className="text-blue-500 hover:underline">
              Contact Us
            </a>
          </div>
          <div>
            <h3 className="text-lg font-bold">Customer Support</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Returns & Warranty</li>
              <li>Payments</li>
              <li>Shipping</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Corporate Info</h3>
            <ul className="space-y-1 text-gray-600">
              <li>About Us</li>
              <li>Brands</li>
              <li>Investors</li>
              <li>Cookies</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Gift Card</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Buy Gift Cards</li>
              <li>Redeem Card</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-500">
          <p>&copy; Your Company</p>
        </div>
      </footer>
    </div>
  );
};

export default CartManagement;
