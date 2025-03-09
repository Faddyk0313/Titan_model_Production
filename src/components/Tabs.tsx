import React, { useState } from "react";

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={`w-full ${className}`}>
      {React.Children.map(children, (child) =>
        React.isValidElement<{ activeTab?: string; setActiveTab?: (tab: string) => void }>(child)
          ? React.cloneElement(child, { activeTab, setActiveTab })
          : child
      )}
    </div>
  );
};

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const TabsList: React.FC<TabsListProps> = ({ className, children }) => {
  return <div className={`flex space-x-2 ${className}`}>{children}</div>;
};

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, activeTab, setActiveTab, children }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-lg ${
        activeTab === value ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
      }`}
      onClick={() => setActiveTab?.(value)}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  activeTab?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, activeTab, children }) => {
  return activeTab === value ? <div className="mt-4">{children}</div> : null;
};
