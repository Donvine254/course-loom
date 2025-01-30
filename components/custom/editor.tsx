"use client";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface RichEditorProps {
  placeholder: string;
  onChange: (value: string) => void;
  value?: string;
  className?: string;
}

const RichEditor = ({
  placeholder,
  onChange,
  value,
  className,
}: RichEditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      placeholder={placeholder}
      value={value}
      className={className}
      onChange={onChange}
    />
  );
};

export default RichEditor;
