import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

const SettingsPage = () => {
    const { theme, toggleTheme } = useTheme();
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('adminSettings');
        return saved ? JSON.parse(saved) : {
            notifications: true,
            autoRefresh: true,
            refreshInterval: 5,
            emailNotifications: false,
            soundAlerts: true,
            compactView: false
        };
    });

    useEffect(() => {
        localStorage.setItem('adminSettings', JSON.stringify(settings));
    }, [settings]);

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const ToggleSwitch = ({ checked, onChange, label, description }) => (
        <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">{label}</h3>
                {description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
                )}
            </div>
            <button
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-8 w-14 md:h-10 md:w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${checked ? 'bg-gradient-to-r from-indigo-600 to-indigo-700' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
            >
                <span
                    className={`inline-block h-6 w-6 md:h-8 md:w-8 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${checked ? 'translate-x-7 md:translate-x-7' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    );

    const SelectInput = ({ value, onChange, options, label, description }) => (
        <div className="py-4 border-b border-gray-200 dark:border-gray-700">
            <label className="block">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{label}</h3>
                {description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{description}</p>
                )}
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full md:w-auto px-4 py-2.5 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </label>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8 transition-colors duration-300">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
                    <span className="text-4xl md:text-6xl">⚙️</span>
                    Settings
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-2">
                    Customize your admin panel experience
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Appearance Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-gray-100 dark:border-gray-700 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl md:text-4xl">🎨</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Appearance</h2>
                    </div>

                    <div className="space-y-2">
                        <ToggleSwitch
                            checked={theme === 'dark'}
                            onChange={toggleTheme}
                            label="Dark Mode"
                            description="Toggle between light and dark theme"
                        />

                        <ToggleSwitch
                            checked={settings.compactView}
                            onChange={(val) => updateSetting('compactView', val)}
                            label="Compact View"
                            description="Reduce spacing for more content on screen"
                        />
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-gray-100 dark:border-gray-700 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl md:text-4xl">🔔</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Notifications</h2>
                    </div>

                    <div className="space-y-2">
                        <ToggleSwitch
                            checked={settings.notifications}
                            onChange={(val) => updateSetting('notifications', val)}
                            label="Push Notifications"
                            description="Receive notifications for new orders"
                        />

                        <ToggleSwitch
                            checked={settings.emailNotifications}
                            onChange={(val) => updateSetting('emailNotifications', val)}
                            label="Email Notifications"
                            description="Get email alerts for important events"
                        />

                        <ToggleSwitch
                            checked={settings.soundAlerts}
                            onChange={(val) => updateSetting('soundAlerts', val)}
                            label="Sound Alerts"
                            description="Play sound when new orders arrive"
                        />
                    </div>
                </div>

                {/* Data & Refresh Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-gray-100 dark:border-gray-700 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl md:text-4xl">🔄</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Data & Refresh</h2>
                    </div>

                    <div className="space-y-2">
                        <ToggleSwitch
                            checked={settings.autoRefresh}
                            onChange={(val) => updateSetting('autoRefresh', val)}
                            label="Auto Refresh"
                            description="Automatically refresh data periodically"
                        />

                        <SelectInput
                            value={settings.refreshInterval}
                            onChange={(val) => updateSetting('refreshInterval', parseInt(val))}
                            options={[
                                { value: 3, label: '3 seconds' },
                                { value: 5, label: '5 seconds' },
                                { value: 10, label: '10 seconds' },
                                { value: 30, label: '30 seconds' },
                                { value: 60, label: '1 minute' }
                            ]}
                            label="Refresh Interval"
                            description="How often to refresh data when auto-refresh is enabled"
                        />
                    </div>
                </div>

                {/* Profile Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-gray-100 dark:border-gray-700 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl md:text-4xl">👤</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Profile</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Admin Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                defaultValue="Admin User"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="admin@example.com"
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                defaultValue="admin@restaurant.com"
                            />
                        </div>

                        <button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform transition hover:scale-105 hover:shadow-xl">
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Info Card */}
            <div className="mt-8 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 border-l-4 border-indigo-500 p-4 md:p-6 rounded-xl shadow-lg">
                <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                        <p className="text-indigo-900 dark:text-indigo-100 font-semibold text-sm md:text-base">
                            Settings are saved automatically
                        </p>
                        <p className="text-indigo-700 dark:text-indigo-300 text-xs md:text-sm mt-1">
                            All your preferences are stored locally and will persist across sessions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
