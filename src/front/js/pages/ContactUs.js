import React from "react";

const ContactUs = () => {
  return (
    <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section: Contact Info */}
        <div>
          <h2 className="text-purple-700 uppercase font-semibold tracking-widest mb-4">
            Contact Us
          </h2>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Get in touch today
          </h1>
          <p className="text-gray-600 mb-8">
            We love questions and feedback – and we're always happy to help!
            Here are some ways to contact us.
          </p>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4">
              <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                📧
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email:</p>
                <p className="text-gray-900 font-bold">
                  contact@company.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4">
              <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                📞
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phone:</p>
                <p className="text-gray-900 font-bold">(123) 123-3213-23</p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-8">
            <p className="text-gray-600">Reach out to us on:</p>
            <div className="flex items-center space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-purple-700">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-700">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-700">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-700">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <form>
            {/* Full Name */}
            <div className="mb-6">
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-purple-200"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-purple-200"
              />
            </div>

            {/* Company (Optional) */}
            <div className="mb-6">
              <label
                htmlFor="company"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Company (optional)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Company name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-purple-200"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Leave us a message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-purple-200"
              ></textarea>
            </div>

            {/* reCAPTCHA (Placeholder for now) */}
            <div className="mb-6">
              <label className="block text-sm text-gray-500 mb-2">
                <input type="checkbox" className="mr-2" />
                I'm not a robot
              </label>
              {/* Add reCAPTCHA script and functionality here */}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-purple-700 text-white w-full py-3 rounded-lg font-bold hover:bg-purple-600 focus:ring focus:ring-purple-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
