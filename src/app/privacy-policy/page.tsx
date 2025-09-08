const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen relative text-white bg-site">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-glow mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-400">Last updated: April 3, 2023</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="leading-relaxed text-gray-300 mb-4">
                At <span className="font-semibold">Experience Rwanda</span>, we value your privacy. 
                This Privacy Policy explains how we collect, use, store, and protect your personal 
                information when you book trips, tours, or other travel services through our platform. 
                By using our services, you agree to the practices described here.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="leading-relaxed text-gray-300 mb-4">
                To provide our services, we may collect the following types of information:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Personal details such as your name, email, phone number, and address</li>
                <li>Booking details including destinations, travel dates, and preferences</li>
                <li>Payment details necessary to process your bookings</li>
                <li>Device and browser information to enhance your user experience</li>
                <li>Location data when using our app or website for nearby recommendations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="leading-relaxed text-gray-300 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Facilitate your trip bookings and reservations</li>
                <li>Communicate updates, confirmations, and travel reminders</li>
                <li>Enhance your travel experience with personalized recommendations</li>
                <li>Improve our services and platform usability</li>
                <li>Ensure payment processing and fraud prevention</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Protect Your Information</h2>
              <p className="leading-relaxed text-gray-300 mb-4">
                We take your data security seriously. Experience Rwanda uses encryption, 
                secure servers, and restricted access to protect your personal information. 
                While no online service can guarantee absolute security, we are committed to 
                safeguarding your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Sharing of Information</h2>
              <p className="leading-relaxed text-gray-300 mb-4">
                We do not sell or rent your personal information. However, we may share data with:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Trusted travel partners, guides, or service providers necessary to complete your booking</li>
                <li>Payment processors to handle transactions securely</li>
                <li>Authorities if required by law or to protect safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p className="leading-relaxed text-gray-300 mb-4">
                Our website may use cookies and similar technologies to improve your browsing experience, 
                remember your preferences, and analyze usage. You can disable cookies in your browser settings, 
                but some features may not function properly without them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="leading-relaxed text-gray-300 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request corrections or updates to your data</li>
                <li>Request deletion of your data, subject to legal requirements</li>
                <li>Withdraw consent for certain uses of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="leading-relaxed text-gray-300 mb-4">
                If you have any questions about this Privacy Policy or how your data is handled, 
                please contact us at:
                <span className="font-semibold">support@experiencerw.com</span>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
