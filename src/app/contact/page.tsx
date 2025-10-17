'use client';

import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { ExternalLink, Instagram, Youtube, Facebook } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'commission', label: 'Custom Commission' },
    { value: 'workshop', label: 'Workshop/Teaching' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'press', label: 'Press/Media' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            I&apos;d love to hear from you! Whether you&apos;re interested in custom work, have questions 
            about my projects, or just want to chat about textile crafts.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Me a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800">Thank you for your message! I&apos;ll get back to you within 2-3 business days.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800 placeholder-gray-600"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800 placeholder-gray-600"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800 placeholder-gray-600"
                    placeholder="Brief subject line"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-800 placeholder-gray-600"
                    placeholder="Tell me about your project or question..."
                  />
                </div>

                  <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-700 text-white py-3 px-6 rounded-lg font-medium hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <EnvelopeIcon className="h-5 w-5 text-amber-700 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">hello@craftsyrph.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneIcon className="h-5 w-5 text-amber-700 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-amber-700 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">Midwest, USA</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ClockIcon className="h-5 w-5 text-amber-700 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Response Time</p>
                    <p className="text-gray-600">Within 2-3 business days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Follow My Journey</h3>
              <div className="space-y-3">
                <a
                  href="https://instagram.com/craftsyrph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-amber-700" />
                  <div>
                    <p className="font-medium text-gray-900">Instagram</p>
                    <p className="text-sm text-gray-600">Daily project updates & behind-the-scenes</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                </a>
                <a
                  href="https://youtube.com/craftsyrph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Youtube className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">YouTube</p>
                    <p className="text-sm text-gray-600">Tutorials & technique videos</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                </a>
                <a
                  href="https://facebook.com/craftsyrph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Facebook</p>
                    <p className="text-sm text-gray-600">Community discussions & events</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                </a>
              </div>
            </div>

            {/* Etsy Store */}
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Visit My Etsy Store</h3>
              <p className="text-gray-600 mb-4">
                Browse and purchase my completed textile pieces, or commission custom work.
              </p>
              <a
                href="https://etsy.com/shop/craftsyrph"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Shop Now
              </a>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900 mb-1">Do you take custom commissions?</p>
                  <p className="text-sm text-gray-600">Yes! I love working on custom pieces. Contact me with your ideas.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Do you teach workshops?</p>
                  <p className="text-sm text-gray-600">I offer both in-person and virtual workshops. Check my calendar for upcoming sessions.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">What&apos;s your typical project timeline?</p>
                  <p className="text-sm text-gray-600">It varies by complexity, but most pieces take 2-6 weeks to complete.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;