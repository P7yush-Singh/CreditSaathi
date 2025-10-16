"use client";
import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Eye, Lock, UserCheck, Database, Globe, Mail } from 'lucide-react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30"></div>
        <div className="relative max-w-6xl mx-auto py-8">
          <Link href="/" className="inline-flex items-center text-cyan-300 hover:text-white transition-colors duration-300 group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center mb-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
          <p className="text-cyan-100 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-10">
          {/* Introduction */}
          <div className="mb-10">
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Introduction</h2>
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-100">
              <p className="text-gray-700 leading-relaxed text-lg">
                Welcome to <span className="font-semibold text-blue-600">Credit Saathi</span> ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4 text-lg">
                By using our services, you agree to the collection and use of information in accordance with this policy. If you disagree with any part of this policy, please do not use our services.
              </p>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="mb-10">
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Personal Information
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Name, email address, and phone number</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Date of birth and gender</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Address and location information</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Financial information (income, employment details)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Credit score and credit history</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Government-issued identification documents</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Usage Information
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Website usage patterns and preferences</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Device information (IP address, browser type, operating system)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Cookies and similar tracking technologies</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Search queries and application history</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="mb-10">
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-l-4 border-orange-500">
              <div className="p-3 bg-orange-100 rounded-full mr-4">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Provide and maintain our credit card comparison and application services</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Process credit card applications and facilitate approvals</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Personalize your experience and recommend relevant products</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Communicate with you about your applications and our services</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Improve our website functionality and user experience</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Comply with legal obligations and regulatory requirements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Prevent fraud and enhance security measures</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Conduct analytics and research to improve our services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="mb-10">
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-l-4 border-indigo-500">
              <div className="p-3 bg-indigo-100 rounded-full mr-4">
                <UserCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Information Sharing and Disclosure</h2>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                We may share your information in the following circumstances:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-start p-3 bg-white/60 rounded-lg">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-indigo-700">Financial Partners:</span>
                      <span className="text-gray-700 ml-2">With banks and financial institutions for credit card applications</span>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-white/60 rounded-lg">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-indigo-700">Service Providers:</span>
                      <span className="text-gray-700 ml-2">With third-party vendors who assist in our operations</span>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-white/60 rounded-lg">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-indigo-700">Legal Requirements:</span>
                      <span className="text-gray-700 ml-2">When required by law or to protect our rights</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start p-3 bg-white/60 rounded-lg">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-indigo-700">Business Transfers:</span>
                      <span className="text-gray-700 ml-2">In connection with mergers, acquisitions, or asset sales</span>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-white/60 rounded-lg">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mt-1 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-indigo-700">Consent:</span>
                      <span className="text-gray-700 ml-2">With your explicit consent for specific purposes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="mb-10">
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-l-4 border-emerald-500">
              <div className="p-3 bg-emerald-100 rounded-full mr-4">
                <Lock className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Data Security</h2>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">SSL encryption for data transmission</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Secure servers and databases</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Regular security audits and updates</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Access controls and authentication protocols</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Employee training on data protection</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/60 p-4 rounded-lg border border-emerald-200">
                <p className="text-gray-700 leading-relaxed text-sm">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-10">
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border-l-4 border-cyan-500">
              <div className="p-3 bg-cyan-100 rounded-full mr-4">
                <Globe className="w-6 h-6 text-cyan-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Cookies and Tracking Technologies</h2>
            </div>
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-100">
              <p className="text-gray-700 leading-relaxed text-lg">
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings, but disabling cookies may affect website functionality.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-10">
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border-l-4 border-rose-500">
              <div className="p-3 bg-rose-100 rounded-full mr-4">
                <UserCheck className="w-6 h-6 text-rose-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Your Rights and Choices</h2>
            </div>
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl border border-rose-100">
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                You have the following rights regarding your personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Access and review your personal information</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Request corrections to inaccurate data</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Request deletion of your personal information</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Opt-out of marketing communications</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Data portability (receive a copy of your data)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Withdraw consent where applicable</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="mb-10">
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border-l-4 border-amber-500">
              <div className="p-3 bg-amber-100 rounded-full mr-4">
                <Database className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Data Retention</h2>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-100">
              <p className="text-gray-700 leading-relaxed text-lg">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. When data is no longer needed, we will securely delete or anonymize it.
              </p>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="mb-10">
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border-l-4 border-violet-500">
              <div className="p-3 bg-violet-100 rounded-full mr-4">
                <Shield className="w-6 h-6 text-violet-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Children's Privacy</h2>
            </div>
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-100">
              <p className="text-gray-700 leading-relaxed text-lg">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </div>
          </div>

          {/* Changes to Policy */}
          <div className="mb-10">
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border-l-4 border-slate-500">
              <div className="p-3 bg-slate-100 rounded-full mr-4">
                <Eye className="w-6 h-6 text-slate-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Changes to This Privacy Policy</h2>
            </div>
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-100">
              <p className="text-gray-700 leading-relaxed text-lg">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t border-gray-200 pt-10">
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-700 font-semibold">Email</p>
                    <p className="text-blue-600">privacy@crsaathi.com</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Globe className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-700 font-semibold">Address</p>
                    <p className="text-blue-600">New Delhi, India</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <UserCheck className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-700 font-semibold">Phone</p>
                    <p className="text-blue-600">Support channels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
