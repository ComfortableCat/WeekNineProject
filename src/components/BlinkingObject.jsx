import React from "react";

export default function BlinkingObject({ width, height }) {
  return (
    <div className="w-[width] h-[height] rounded-2xl bg-gray-600 animate-pulse"></div>
  );
}
