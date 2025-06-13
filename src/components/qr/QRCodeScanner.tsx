import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, QrCode, RefreshCw, Check, X } from "lucide-react";

interface QRCodeScannerProps {
  userType?: "business" | "customer";
  onScanSuccess?: (data: string) => void;
  onScanError?: (error: string) => void;
}

const QRCodeScanner = ({
  userType = "customer",
  onScanSuccess = () => {},
  onScanError = () => {},
}: QRCodeScannerProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    userType === "business" ? "scan" : "show",
  );
  const [scanning, setScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [personalQRCode, setPersonalQRCode] = useState<string>(
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=user123",
  );

  // Mock function to simulate scanning
  const startScanning = () => {
    setScanning(true);
    setScanResult(null);

    // Simulate scanning process with timeout
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo

      if (success) {
        const mockData = `user-${Math.floor(Math.random() * 1000)}`;
        setScanResult({
          success: true,
          message: "QR code scanned successfully!",
        });
        onScanSuccess(mockData);
      } else {
        setScanResult({
          success: false,
          message: "Failed to scan QR code. Please try again.",
        });
        onScanError("Scan failed");
      }

      setScanning(false);
    }, 2000);
  };

  const stopScanning = () => {
    setScanning(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          {activeTab === "scan" ? "Scan QR Code" : "Your QR Code"}
        </CardTitle>
        <CardDescription className="text-center">
          {activeTab === "scan"
            ? "Scan customer QR code to add a punch to their card"
            : "Show this QR code to earn punches"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            {userType === "business" && (
              <TabsTrigger value="scan" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Scan QR
              </TabsTrigger>
            )}
            <TabsTrigger value="show" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              My QR Code
            </TabsTrigger>
          </TabsList>

          {userType === "business" && (
            <TabsContent value="scan" className="flex flex-col items-center">
              <div className="relative w-full h-64 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                {scanning ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-primary rounded-lg relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-scan-line" />
                      </div>
                    </div>
                    <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                  </>
                ) : scanResult ? (
                  <div className="flex flex-col items-center justify-center p-4">
                    {scanResult.success ? (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                          <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <p className="text-green-600 font-medium">
                          {scanResult.message}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
                          <X className="w-8 h-8 text-red-600" />
                        </div>
                        <p className="text-red-600 font-medium">
                          {scanResult.message}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <Camera className="w-16 h-16 text-gray-400" />
                )}
              </div>

              <div className="flex gap-4">
                {!scanning ? (
                  <Button
                    onClick={startScanning}
                    className="flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Start Scanning
                  </Button>
                ) : (
                  <Button
                    onClick={stopScanning}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                )}
              </div>
            </TabsContent>
          )}

          <TabsContent value="show" className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
              <img
                src={personalQRCode}
                alt="Your personal QR code"
                className="w-64 h-64 object-contain"
              />
            </div>
            <p className="text-sm text-gray-500 text-center mb-4">
              Present this QR code to the business to earn punches on your
              loyalty card
            </p>
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh Code
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QRCodeScanner;
