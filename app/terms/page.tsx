"use client";

import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="max-w-4xl mx-auto p-6 mt-16">
        <h1 className="text-3xl font-bold text-center mb-6">Terms of Service</h1>
        {/* <p className="text-gray-600 text-center">
          Effective Date: [Insert Date]
        </p> */}

        <div className="mt-10 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p className="text-gray-700 mt-2">
              Welcome to **QualityProperty**! These Terms of Service govern your use of our website, 
              products, and services. By accessing our platform, you agree to comply with these terms. 
              If you do not agree, please refrain from using our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Use of Our Services</h2>
            <p className="text-gray-700 mt-2">
              Our platform offers various home solutions, including tiny homes, mobile homes, prefab homes, 
              and more. You agree to use our services lawfully and responsibly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. Purchases & Payments</h2>
            <p className="text-gray-700 mt-2">
              All payments for our homes and services must be made through our approved channels. 
              We reserve the right to cancel orders due to fraudulent activity or pricing errors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
            <p className="text-gray-700 mt-2">
              All content on our platform, including text, images, and designs, is owned by **QualityProperty**. 
              Unauthorized use or reproduction is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
            <p className="text-gray-700 mt-2">
              We strive to provide accurate information, but we do not guarantee error-free services. 
              We are not liable for any damages resulting from the use of our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Changes to Terms</h2>
            <p className="text-gray-700 mt-2">
              We may update these terms from time to time. Continued use of our platform means you 
              accept the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">7. Contact Us</h2>
            <p className="text-gray-700 mt-2">
              If you have any questions about these terms, please contact us at:  
              <strong> support@qualityproperty.com</strong>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
