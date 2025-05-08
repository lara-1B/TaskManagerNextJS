import { useState, useEffect, useRef } from 'react';
import { fetchNotifications, markNotificationRead } from '../../services/backendFetch';

export default function Notification() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('Unread'); // New state for tab switching
  const dropdownRef = useRef(null);

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsNotificationOpen(false);
    }
  };

  const fetchAndSetNotifications = async () => {
    try {
      const data = await fetchNotifications();
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.isRead).length);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const handleNotificationClick = async (notificationId) => {
    try {
      await markNotificationRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  useEffect(() => {
    fetchAndSetNotifications();
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredNotifications = notifications.filter((n) =>
    activeTab === 'Unread' ? !n.isRead : n.isRead
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleNotificationDropdown}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 relative"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>
      {isNotificationOpen && (
        <div className="absolute right-0 mt-2 w-64 max-h-80 bg-white border rounded shadow-lg overflow-y-auto">
          <div className="flex border-b">
            <button
              className={`flex-1 p-2 text-center ${
                activeTab === 'Unread' ? 'font-bold border-b-2 border-blue-500' : ''
              }`}
              onClick={() => setActiveTab('Unread')}
            >
              Unread
            </button>
            <button
              className={`flex-1 p-2 text-center ${
                activeTab === 'Read' ? 'font-bold border-b-2 border-blue-500' : ''
              }`}
              onClick={() => setActiveTab('Read')}
            >
              Read
            </button>
          </div>
          <ul>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <li
                  key={notification._id}
                  className={`p-2 hover:bg-gray-100 ${
                    notification.isRead ? 'text-gray-500' : 'font-bold'
                  }`}
                  onClick={() => handleNotificationClick(notification._id)}
                >
                  <p className="truncate-2-lines">{notification.title}</p>
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-gray-500">No notifications found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
