/* eslint-disable */
"use client";
import React from "react";
import { Card, CardBody, CardFooter, Chip } from "@heroui/react";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

// CardAntiHoax Component
interface CardProps {
  jenis: "hoax" | "sebagian" | "verified";
  judul: string;
  penjelasan: string;
  tanggal: string;
  onClick?: () => void;
}

export default function CardAntiHoax({
  jenis,
  judul,
  penjelasan,
  tanggal,
  onClick,
}: CardProps) {
  const getCardConfig = () => {
    switch (jenis) {
      case "hoax":
        return {
          icon: <AlertCircle className="w-5 h-5 text-white" />,
          bgIcon: "bg-red-600",
          label: "HOAX",
          labelColor: "bg-red-600",
          titleColor: "text-red-700",
          checkColor: "text-red-600",
          checkBg: "bg-red-50",
        };
      case "sebagian":
        return {
          icon: <AlertTriangle className="w-5 h-5 text-white" />,
          bgIcon: "bg-yellow-500",
          label: "MISLEADING CONTENT",
          labelColor: "bg-yellow-500",
          titleColor: "text-yellow-700",
          checkColor: "text-yellow-600",
          checkBg: "bg-yellow-50",
        };
      case "verified":
        return {
          icon: <CheckCircle className="w-5 h-5 text-white" />,
          bgIcon: "bg-green-600",
          label: "VERIFIED",
          labelColor: "bg-green-600",
          titleColor: "text-green-700",
          checkColor: "text-green-600",
          checkBg: "bg-green-50",
        };
    }
  };

  const config = getCardConfig();

  return (
    <Card
      isPressable
      className="w-full max-w-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onPress={onClick}
    >
      <CardBody className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`${config.bgIcon} rounded-xl p-2.5 flex items-center justify-center`}
          >
            {config.icon}
          </div>
          <Chip
            className={`${config.labelColor} text-white text-xs font-semibold px-3`}
            size="sm"
          >
            {config.label}
          </Chip>
        </div>

        <h3
          className={`${config.titleColor} font-bold text-base mb-4 leading-tight`}
        >
          "{judul}"
        </h3>

        <div className={`${config.checkBg} rounded-lg p-3 flex gap-3`}>
          <CheckCircle
            className={`${config.checkColor} w-5 h-5 flex-shrink-0 mt-0.5`}
          />
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
            {penjelasan}
          </p>
        </div>
      </CardBody>

      <CardFooter className="px-6 pb-6 pt-0">
        <p className="text-xs text-gray-500">{tanggal}</p>
      </CardFooter>
    </Card>
  );
}
