"use client";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface RichEditorProps {
  placeholder: string;
  onChange: (value: string) => void;
  value?: string;
  className?: string;
  disabled?: boolean;
}

const RichEditor = ({
  placeholder,
  onChange,
  value,
  className,
  disabled = false,
}: RichEditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      readOnly={disabled}
      placeholder={placeholder}
      value={value}
      className={className}
      onChange={onChange}
    />
  );
};

export default RichEditor;
