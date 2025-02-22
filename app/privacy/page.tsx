"use client";

import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="max-w-4xl mx-auto p-6 mt-16">
        <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
        {/* <p className="text-gray-600 text-center">Effective Date: [Insert Date]</p> */}

        <div className="mt-10 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p className="text-gray-700 mt-2">
              Welcome to **QualityProperty**! Your privacy is important to us. This Privacy Policy 
              explains how we collect, use, and protect your personal data when you use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
            <p className="text-gray-700 mt-2">
              We collect various types of information, including:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Personal information (name, email, phone number, etc.)</li>
              <li>Payment and transaction details</li>
              <li>Browsing and usage data (via cookies and analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
            <p className="text-gray-700 mt-2">
              Your data is used to:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Process transactions and provide services</li>
              <li>Improve our platform and user experience</li>
              <li>Communicate important updates and promotional offers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Data Protection & Security</h2>
            <p className="text-gray-700 mt-2">
              We take security seriously. Your data is protected through encryption and secure storage.
              However, no system is 100% secure, and we encourage users to take precautions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. Sharing Your Information</h2>
            <p className="text-gray-700 mt-2">
              We do not sell or rent your personal data. However, we may share information with trusted partners
              for essential services, such as payment processing and analytics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Your Rights</h2>
            <p className="text-gray-700 mt-2">
              You have the right to:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Access, update, or delete your personal data</li>
              <li>Opt out of marketing communications</li>
              <li>Request details about how your data is used</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">7. Cookies & Tracking Technologies</h2>
            <p className="text-gray-700 mt-2">
              We use cookies to enhance your browsing experience. You can manage or disable cookies 
              through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
            <p className="text-gray-700 mt-2">
              We may update this Privacy Policy from time to time. If changes are made, we will notify 
              users through our website or email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">9. Contact Us</h2>
            <p className="text-gray-700 mt-2">
              If you have any questions about this Privacy Policy, please contact us at:  
              <strong> support@qualityproperty.com</strong>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
