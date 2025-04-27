import React from "react";

interface ForumDescriptionProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string; 
}

const ForumDescription: React.FC<ForumDescriptionProps> = ({ placeholder, value, onChange, className }) => {
  return (
    <textarea
      className={`border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={4}
    />
  );
};

export { ForumDescription };
