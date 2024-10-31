import React, { useEffect } from "react";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="font-sans text-gray-800 py-16 px-6 md:px-12">
      <h1 className="text-5xl font-extrabold mb-8 text-blue-600 text-center">
        Privacy Policy
      </h1>

      <p className="text-lg text-gray-600 mb-4">
        At Dev Labs, we value your privacy and are committed to protecting your
        personal information. This Privacy Policy outlines how we collect, use,
        and safeguard your information when you use our platform.
      </p>

      <h2 className="text-3xl font-bold mb-4 text-blue-600">
        Information We Collect
      </h2>
      <p className="text-lg text-gray-600 mb-4">
        We collect information that you provide directly to us when you sign up,
        create a profile, and share your projects. This may include:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-600 mb-4">
        <li>Your name</li>
        <li>Email address</li>
        <li>Profile information</li>
        <li>Project details</li>
      </ul>

      <h2 className="text-3xl font-bold mb-4 text-blue-600">
        Password Security
      </h2>
      <p className="text-lg text-gray-600 mb-4">
        To protect your account, all passwords are securely hashed using
        industry-standard hashing algorithms. This means that even we cannot
        access your password in its original form.
      </p>
      <p className="text-lg text-gray-600 mb-4">
        We recommend using strong, unique passwords for your account and
        changing them regularly.
      </p>

      <h2 className="text-3xl font-bold mb-4 text-blue-600">
        Use of Information
      </h2>
      <p className="text-lg text-gray-600 mb-4">
        We use the information we collect for the following purposes:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-600 mb-4">
        <li>To provide and maintain our services</li>
        <li>To notify you about changes to our platform</li>
        <li>
          To allow you to participate in interactive features when you choose to
          do so
        </li>
        <li>To provide customer support</li>
        <li>
          To gather analysis or valuable information so that we can improve our
          platform
        </li>
        <li>To monitor the usage of our services</li>
      </ul>

      <h2 className="text-3xl font-bold mb-4 text-blue-600">Data Protection</h2>
      <p className="text-lg text-gray-600 mb-4">
        We take reasonable steps to protect your information from unauthorized
        access, use, or disclosure. However, please be aware that no method of
        transmission over the Internet or method of electronic storage is 100%
        secure.
      </p>

      <h2 className="text-3xl font-bold mb-4 text-blue-600">
        Changes to This Privacy Policy
      </h2>
      <p className="text-lg text-gray-600 mb-4">
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page. You are
        advised to review this Privacy Policy periodically for any changes.
      </p>

      <h2 className="text-3xl font-bold mb-4 text-blue-600">Contact Us</h2>
      <p className="text-lg text-gray-600 mb-4">
        If you have any questions about this Privacy Policy, please contact us
        at madisettydharmadeep@gmail.com
      </p>
    </section>
  );
}
