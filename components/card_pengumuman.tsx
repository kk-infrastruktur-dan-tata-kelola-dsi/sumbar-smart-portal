/* eslint-disable */
"use client";

import React, { useState } from "react";

import { FilePreviewModal } from "@/components/file-preview";

interface CardProps {
  status: "penting" | "info";
  judul: string;
  desc_preview: string;
  tanggal: string;
  fileUrl?: string | null;
}

export default function CardPengumuman({
  status,
  judul,
  desc_preview,
  tanggal,
  fileUrl,
}: CardProps) {
  const [showPreview, setShowPreview] = useState(false);

  const BellIcon = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );

  const InfoIcon = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );

  const FileIcon = (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );

  const statusConfig = {
    penting: {
      badgeBg: "bg-amber-400",
      iconBg: "bg-amber-400",
      label: "PENTING",
      icon: BellIcon,
    },
    info: {
      badgeBg: "bg-slate-800",
      iconBg: "bg-slate-800",
      label: "INFO",
      icon: InfoIcon,
    },
  };

  // Validasi dan normalize status
  const normalizedStatus =
    status?.toLowerCase() === "penting" || status?.toLowerCase() === "info"
      ? (status.toLowerCase() as "penting" | "info")
      : "info";

  const config = statusConfig[normalizedStatus];

  const handleCardClick = () => {
    if (fileUrl) {
      setShowPreview(true);
    }
  };

  return (
    <>
      <div className="w-full">
        <div
          className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-6 relative hover:shadow-md transition-all ${fileUrl ? "cursor-pointer hover:scale-[1.02]" : ""}`}
          onClick={handleCardClick}
        >
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`${config.badgeBg} text-white font-bold text-[10px] px-2.5 py-1 rounded-full`}
            >
              {config.label}
            </span>
          </div>

          {/* Icon */}
          <div className="mb-3">
            <div
              className={`w-10 h-10 ${config.iconBg} rounded-xl flex items-center justify-center shadow-sm`}
            >
              <div className="text-white">{config.icon}</div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
            {judul}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
            {desc_preview}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Date */}
            <div className="flex items-center text-gray-600">
              <svg
                className="w-3.5 h-3.5 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <span className="text-xs font-medium">{tanggal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* File Preview Modal */}
      {fileUrl && (
        <FilePreviewModal
          fileUrl={fileUrl}
          isOpen={showPreview}
          title={judul}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
