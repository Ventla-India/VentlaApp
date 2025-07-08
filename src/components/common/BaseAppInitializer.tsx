import React, { useEffect, ReactNode } from 'react';
import GeneralAppService from '../../services/GeneralAppService';

interface BaseAppInitializerProps {
  children: ReactNode;
}

const BaseAppInitializer: React.FC<BaseAppInitializerProps> = ({ children }) => {
  useEffect(() => {
    // Initialize Crashlytics (optional: enable/disable collection)
    GeneralAppService.setCrashlyticsCollectionEnabled(true);
    // Initialize Push Notifications
    GeneralAppService.initializePushNotifications();
  }, []);

  return <>{children}</>;
};

export default BaseAppInitializer; 