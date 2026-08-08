/* eslint-disable */
"use client";

import React from "react";
import { Chip } from "@heroui/react";
import {
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  X,
  User,
  Calendar,
} from "lucide-react";

interface PopupProps {
  jenis: "hoax" | "sebagian" | "verified";
  judul: string;
  written_by: string;
  tanggal: string;
  penjelasan: string;
  gambar?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PopupAntiHoax({
  jenis,
  judul,
  written_by,
  tanggal,
  penjelasan,
  gambar,
  isOpen,
  onClose,
}: PopupProps) {
  if (!isOpen) return null;

  const getPopupConfig = () => {
    switch (jenis) {
      case "hoax":
        return {
          icon: <AlertCircle className="w-6 h-6" />,
          bgColor: "bg-red-50",
          textColor: "text-red-800",
          borderColor: "border-red-500",
          label: "HOAX",
          badgeBg: "bg-red-600",
          iconBg: "bg-red-600",
        };
      case "sebagian":
        return {
          icon: <AlertTriangle className="w-6 h-6" />,
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-500",
          label: "MISLEADING CONTENT",
          badgeBg: "bg-yellow-500",
          iconBg: "bg-yellow-500",
        };
      case "verified":
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          bgColor: "bg-green-50",
          textColor: "text-green-800",
          borderColor: "border-green-500",
          label: "VERIFIED",
          badgeBg: "bg-green-600",
          iconBg: "bg-green-600",
        };
    }
  };

  const config = getPopupConfig();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop - dengan backdrop-blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup Modal */}
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Image Section with Badge */}
          {gambar && (
            <div className="relative w-full h-72 bg-gray-200">
              <img
                alt={judul}
                className="w-full h-full object-cover"
                src={gambar}
              />
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4">
                <Chip
                  className={`${config.badgeBg} text-white text-sm font-bold px-4 py-2`}
                  size="lg"
                  startContent={<div className="text-white">{config.icon}</div>}
                >
                  {config.label}
                </Chip>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="p-8">
            {/* Badge if no image */}
            {!gambar && (
              <div className="mb-6">
                <Chip
                  className={`${config.badgeBg} text-white text-sm font-bold px-4 py-2`}
                  size="lg"
                  startContent={<div className="text-white">{config.icon}</div>}
                >
                  {config.label}
                </Chip>
              </div>
            )}

            {/* Title */}
            <h2 className="text-3xl font-bold text-black-700 mb-6 leading-tight">
              "{judul}"
            </h2>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{written_by}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{tanggal}</span>
              </div>
            </div>

            {/* Explanation Box */}
            <div
              className={`${config.bgColor} ${config.borderColor} border-l-4 rounded-xl p-6`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`${config.iconBg} rounded-xl p-3 flex-shrink-0`}
                >
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold ${config.textColor} text-lg mb-3`}>
                    Penjelasan:
                  </h3>
                  <p
                    className={`${config.textColor} leading-relaxed text-base`}
                  >
                    {penjelasan}
                  </p>
                </div>
              </div>
            </div>

            {/* Warning Footer for Hoax */}
            {jenis === "hoax" && (
              <div className="mt-6 bg-red-600 rounded-xl p-5 flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
                <div className="text-white">
                  <h4 className="font-bold mb-1">Peringatan!</h4>
                  <p className="text-sm">
                    Jangan sebarkan informasi yang belum terverifikasi. Selalu
                    cek kebenaran informasi dari sumber resmi.
                  </p>
                </div>
              </div>
            )}

            {/* Info Footer */}
            <div className="mt-6 bg-gray-50 rounded-xl p-5">
              <p className="text-sm text-gray-600">
                <strong className="text-gray-900">Kategori:</strong>{" "}
                {config.label}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Sumber informasi resmi: Pemerintah Provinsi Sumatera Barat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
