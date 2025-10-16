import Head from 'next/head';
import Link from 'next/link';

const TermsAndConditions = () => {
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-10">
            <header className="border-b border-gray-200 pb-6 mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Terms and Conditions
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Last updated: October 13, 2025
              </p>
            </header>

            <div className="space-y-6 text-gray-700">
              <p>
                Welcome to Card Saathi! These terms and conditions outline the rules and regulations for the use of Card Saathi's Website, located at www.cardsaathi.com.
              </p>
              <p>
                By accessing this website, we assume you accept these terms and conditions. Do not continue to use Card Saathi if you do not agree to all of the terms and conditions stated on this page.
              </p>

              <section className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold text-gray-800">1. Definitions</h2>
                <p>
                  <strong>"Website"</strong> refers to Card Saathi, accessible from www.cardsaathi.com.<br />
                  <strong>"We"</strong>, <strong>"Our"</strong>, and <strong>"Us"</strong> refers to Card Saathi.<br />
                  <strong>"You"</strong> refers to the individual accessing our Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                </p>
              </section>

              <section className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold text-gray-800">2. Use of Our Service</h2>
                <p>
                  Card Saathi provides information regarding credit cards and related financial products offered by various banks and financial institutions in India. We display eligibility criteria and provide links to apply for these products on the respective issuer's websites.
                </p>
                <p>
                  The information provided is for general guidance and informational purposes only. We do not issue credit cards or make credit decisions. All applications are subject to the terms and approval of the respective card issuer.
                </p>
              </section>

              <section className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold text-gray-800">3. Accuracy of Information</h2>
                <p>
                  While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability with respect to the website or the information on products, services, or related graphics. Any reliance you place on such information is therefore strictly at your own risk.
                </p>
              </section>
              
              <section className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold text-gray-800">4. Intellectual Property</h2>
                <p>
                  The Website and its original content, features, and functionality are and will remain the exclusive property of Card Saathi and its licensors. The content is protected by copyright, trademark, and other laws of India. Our trademarks may not be used in connection with any product or service without the prior written consent of Card Saathi.
                </p>
              </section>

              <section className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold text-gray-800">5. Links to Other Websites</h2>
                <p>
                  Our Service contains links to third-party web sites or services (such as bank application portals) that are not owned or controlled by Card Saathi. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that Card Saathi shall not be responsible or liable, directly or indirectly, for any damage or loss caused by or in connection with the use of any such content or services.
                </p>
              </section>

              <section className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold text-gray-800">6. Limitation of Liability</h2>
                <p>
                  In no event shall Card Saathi, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
              </section>

              <section className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold text-gray-800">7. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of India, with exclusive jurisdiction of the courts in Delhi.
                </p>
              </section>

              <section className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold text-gray-800">8. Changes to These Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms and Conditions on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold text-gray-800">9. Contact Us</h2>
                <p>
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>By email: <a href="mailto:contact@cardsaathi.com" className="text-blue-600 hover:underline">contact@cardsaathi.com</a></li>
                  <li>By visiting this page on our website: 
                    <Link href="/contact-us" className="text-blue-600 hover:underline ml-1">www.cardsaathi.com/contact-us
                    </Link>
                  </li>
                </ul>
              </section>

              {/* Legal Disclaimer Box */}
              <div className="!mt-12 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg" role="alert">
                <div className="flex">
                  <div className="py-1">
                    <svg className="h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-yellow-800">Legal Disclaimer</p>
                    <p className="text-sm text-yellow-700">
                      This is a generic template and is not a substitute for legal advice. You must consult with a qualified legal professional to ensure your Terms and Conditions are complete, accurate, and compliant with all applicable laws.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
