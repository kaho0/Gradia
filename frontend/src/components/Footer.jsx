import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Column 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Gradia</h3>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Pricing</li>
            <li>Use Cases</li>
            <li>Location</li>
            <li>FAQ</li>
            <li>Company</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Documentation</li>
            <li>Community</li>
            <li>Contact Us</li>
            <li>API Reference</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>Blog</li>
            <li>Case Studies</li>
            <li>Webinars</li>
            <li>Security</li>
            <li>Terms & Policies</li>
          </ul>
        </div>

        {/* Column 4 - Call to Action */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get Started</h3>
          <p className="text-sm mb-4">
            Get your free consultation now and start using Gradia for seamless
            school management.
          </p>
          <div className="flex items-center bg-white rounded-lg p-2">
            <input
              type="text"
              placeholder="Enter your email"
              className="flex-1 text-black px-4 py-2 outline-none rounded-l-lg"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-400 mt-10">
        ©2024 Gradia School Management. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
