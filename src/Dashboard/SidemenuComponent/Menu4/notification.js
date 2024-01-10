import React from 'react';
import './notification.css'

const Notifications = () => {
  return (
    <div className="card">
      <h2>Notifications</h2>
      <label>Notification Preferences:</label>
      <input type="checkbox" id="emailNotifications" />
      <label htmlFor="emailNotifications">Email Notifications</label>
      <input type="checkbox" id="smsNotifications" />
      <label htmlFor="smsNotifications">SMS Notifications</label>
      <input type="checkbox" id="inAppNotifications" />
      <label htmlFor="inAppNotifications">In-App Notifications</label>
      <br />
      <label>Notification History:</label>
      <ul>
        <li>Notification 1</li>
        <li>Notification 2</li>
        {/* List of notification history */}
      </ul>
      <label>Notification Types:</label>
      <input type="checkbox" id="alerts" />
      <label htmlFor="alerts">Alerts</label>
      <input type="checkbox" id="updates" />
      <label htmlFor="updates">Updates</label>
      <button>Clear All Notifications</button>
    </div>
  );
};

export default Notifications;
