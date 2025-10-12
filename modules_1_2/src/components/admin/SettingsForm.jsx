import React, { useState } from 'react';
import { useToast } from '../common/Toast';

const SettingsForm = () => {
  const [activeTab, setActiveTab] = useState('platform');
  const showToast = useToast();
  const [settings, setSettings] = useState({
    platformName: 'ExamPlatform',
    supportEmail: 'support@examplatform.com',
    jwtExpiry: '60',
    encryptionStrength: 'AES-256',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving settings:', settings);
    showToast('Settings saved successfully!', 'success');
  };

  const TabButton = ({ id, label }) => (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 text-sm font-semibold transition-colors ${
        activeTab === id ? 'text-black border-b-2 border-red-500' : 'text-black/60 hover:text-black'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white border border-black/10 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit}>
        {/* Form Header and Tabs */}
        <div className="p-4 border-b border-black/10">
          <h2 className="text-lg font-bold text-black">System Settings</h2>
          <p className="text-sm text-black/60 mt-1">Manage platform and security configurations.</p>
          <div className="mt-4 border-b border-black/10 -mx-4 px-4">
              <nav className="flex space-x-2">
                <TabButton id="platform" label="Platform" />
                <TabButton id="security" label="Security" />
              </nav>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          {/* Platform Settings Tab */}
          <div className={`${activeTab === 'platform' ? 'block' : 'hidden'}`}>
            <div className="space-y-4">
              <div>
                <label htmlFor="platformName" className="block text-sm font-medium text-black/80 mb-1">Platform Name</label>
                <input type="text" name="platformName" id="platformName" value={settings.platformName} onChange={handleChange} className="w-full max-w-md px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label htmlFor="supportEmail" className="block text-sm font-medium text-black/80 mb-1">Support Email</label>
                <input type="email" name="supportEmail" id="supportEmail" value={settings.supportEmail} onChange={handleChange} className="w-full max-w-md px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
            </div>
          </div>
          {/* Security Settings Tab */}
          <div className={`${activeTab === 'security' ? 'block' : 'hidden'}`}>
             <div className="space-y-4">
              <div>
                <label htmlFor="jwtExpiry" className="block text-sm font-medium text-black/80 mb-1">JWT Expiry (minutes)</label>
                <input type="number" name="jwtExpiry" id="jwtExpiry" value={settings.jwtExpiry} onChange={handleChange} className="w-full max-w-md px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label htmlFor="encryptionStrength" className="block text-sm font-medium text-black/80 mb-1">Encryption Strength</label>
                <select name="encryptionStrength" id="encryptionStrength" value={settings.encryptionStrength} onChange={handleChange} className="w-full max-w-md px-3 py-2 bg-white border border-black/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>AES-256</option>
                    <option>AES-512</option>
                    <option>RSA</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Footer */}
        <div className="p-4 bg-black/5 border-t border-black/10 flex justify-end items-center gap-3">
            <button type="button" className="px-4 py-2 bg-white border border-black/20 rounded-md text-sm font-semibold hover:bg-black/5 transition-colors">
                Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Save Changes
            </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;