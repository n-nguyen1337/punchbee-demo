import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  QrCode,
  Gift,
  Phone,
  Wallet,
  Bell,
  User,
  History,
  Star,
  MapPin,
  Clock,
  Check,
} from "lucide-react";
import QRCode from "react-qr-code";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";

interface CustomerLoyaltyCard {
  id: string;
  businessName: string;
  businessLogo: string;
  programName: string;
  description: string;
  currentPunches: number;
  punchesRequired: number;
  rewardDescription: string;
  qrCodeData: string;
  lastPunchDate?: Date;
  joinedDate: Date;
  totalRewardsEarned: number;
}

interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  joinedAt: Date;
  totalCards: number;
  totalPunches: number;
  totalRewards: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "reward" | "punch" | "welcome" | "reminder";
  timestamp: Date;
  isRead: boolean;
}

const CustomerApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("cards");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CustomerLoyaltyCard | null>(
    null,
  );
  const [showQRCode, setShowQRCode] = useState(false);

  // Mock customer data
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile>({
    id: "customer-1",
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    email: "sarah@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    joinedAt: new Date("2023-01-20"),
    totalCards: 3,
    totalPunches: 47,
    totalRewards: 5,
  });

  const [loyaltyCards, setLoyaltyCards] = useState<CustomerLoyaltyCard[]>([
    {
      id: "card-1",
      businessName: "Coffee Haven",
      businessLogo:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=coffeehaven",
      programName: "Coffee Lovers Club",
      description: "Buy 10 coffees, get 1 free!",
      currentPunches: 7,
      punchesRequired: 10,
      rewardDescription: "Free coffee of your choice",
      qrCodeData: "customer-card-1",
      lastPunchDate: new Date("2023-06-15"),
      joinedDate: new Date("2023-01-20"),
      totalRewardsEarned: 2,
    },
    {
      id: "card-2",
      businessName: "Bella's Bakery",
      businessLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=bakery",
      programName: "Sweet Treats Club",
      description: "Buy 5 pastries, get 1 free!",
      currentPunches: 3,
      punchesRequired: 5,
      rewardDescription: "Free pastry of your choice",
      qrCodeData: "customer-card-2",
      lastPunchDate: new Date("2023-06-10"),
      joinedDate: new Date("2023-02-15"),
      totalRewardsEarned: 1,
    },
    {
      id: "card-3",
      businessName: "Fresh Juice Bar",
      businessLogo: "https://api.dicebear.com/7.x/avataaars/svg?seed=juice",
      programName: "Healthy Living Rewards",
      description: "Buy 8 smoothies, get 1 free!",
      currentPunches: 8,
      punchesRequired: 8,
      rewardDescription: "Free smoothie of your choice",
      qrCodeData: "customer-card-3",
      lastPunchDate: new Date("2023-06-14"),
      joinedDate: new Date("2023-03-01"),
      totalRewardsEarned: 2,
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Reward Ready! 🎉",
      message: "You've earned a free smoothie at Fresh Juice Bar!",
      type: "reward",
      timestamp: new Date("2023-06-14T15:30:00"),
      isRead: false,
    },
    {
      id: "2",
      title: "Punch Added",
      message: "1 punch added to your Coffee Haven card",
      type: "punch",
      timestamp: new Date("2023-06-15T10:30:00"),
      isRead: true,
    },
    {
      id: "3",
      title: "Welcome to Bella's Bakery!",
      message: "Thanks for joining our Sweet Treats Club",
      type: "welcome",
      timestamp: new Date("2023-02-15T09:00:00"),
      isRead: true,
    },
  ]);

  const handlePhoneLogin = () => {
    if (!phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }
    setIsVerifying(true);
    // Simulate sending verification code
    setTimeout(() => {
      toast.success("Verification code sent!");
    }, 1000);
  };

  const handleVerifyCode = () => {
    if (!verificationCode) {
      toast.error("Please enter the verification code");
      return;
    }
    // Simulate verification
    setIsAuthenticated(true);
    toast.success("Welcome back!");
  };

  const handleAddToWallet = (card: CustomerLoyaltyCard) => {
    // Simulate adding to Apple/Google Wallet
    toast.success(`${card.businessName} card added to wallet!`);
  };

  const handleShowQR = (card: CustomerLoyaltyCard) => {
    setSelectedCard(card);
    setShowQRCode(true);
  };

  const unreadNotifications = notifications.filter((n) => !n.isRead).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Toaster position="top-right" />
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Welcome to LoyaltyPro</CardTitle>
            <CardDescription>
              Sign in with your phone number to access your loyalty cards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isVerifying ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <Button onClick={handlePhoneLogin} className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Send Verification Code
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <Button onClick={handleVerifyCode} className="w-full">
                  Verify & Sign In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsVerifying(false)}
                  className="w-full"
                >
                  Back
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={customerProfile.avatar} />
                <AvatarFallback>
                  {customerProfile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-semibold">
                  {customerProfile.name}
                </h1>
                <p className="text-sm text-gray-500">{customerProfile.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="cards">My Cards</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* My Cards Tab */}
          <TabsContent value="cards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loyaltyCards.map((card) => {
                const progress =
                  (card.currentPunches / card.punchesRequired) * 100;
                const isRewardReady =
                  card.currentPunches >= card.punchesRequired;

                return (
                  <Card key={card.id} className="relative overflow-hidden">
                    {isRewardReady && (
                      <div className="absolute top-2 right-2 z-10">
                        <Badge className="bg-yellow-500 text-yellow-900 animate-pulse">
                          Reward Ready!
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 border-2 border-white">
                          <AvatarImage src={card.businessLogo} />
                          <AvatarFallback>
                            {card.businessName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {card.businessName}
                          </CardTitle>
                          <CardDescription className="text-blue-100">
                            {card.programName}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-4 space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            {card.currentPunches} / {card.punchesRequired}{" "}
                            punches
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {card.lastPunchDate &&
                              format(card.lastPunchDate, "MMM d")}
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {card.description}
                      </p>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleShowQR(card)}
                          className="flex-1"
                          variant={isRewardReady ? "default" : "outline"}
                        >
                          <QrCode className="h-4 w-4 mr-2" />
                          Show QR
                        </Button>
                        <Button
                          onClick={() => handleAddToWallet(card)}
                          variant="outline"
                          size="sm"
                        >
                          <Wallet className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>
                            Joined: {format(card.joinedDate, "MMM d, yyyy")}
                          </span>
                          <span>{card.totalRewardsEarned} rewards earned</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Available Rewards</h2>
              <p className="text-muted-foreground">
                Redeem your earned rewards
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loyaltyCards
                .filter((card) => card.currentPunches >= card.punchesRequired)
                .map((card) => (
                  <Card key={card.id}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={card.businessLogo} />
                          <AvatarFallback>
                            {card.businessName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{card.businessName}</CardTitle>
                          <CardDescription>
                            {card.rewardDescription}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Gift className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-600">
                            Ready to redeem!
                          </span>
                        </div>
                        <Button onClick={() => handleShowQR(card)}>
                          <QrCode className="h-4 w-4 mr-2" />
                          Show QR
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {loyaltyCards.filter(
                (card) => card.currentPunches >= card.punchesRequired,
              ).length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Gift className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No rewards available
                    </h3>
                    <p className="text-gray-500 text-center">
                      Keep collecting punches to earn rewards!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Notifications</h2>
              <p className="text-muted-foreground">
                Stay updated on your loyalty progress
              </p>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => {
                const getIcon = () => {
                  switch (notification.type) {
                    case "reward":
                      return <Gift className="h-5 w-5 text-green-600" />;
                    case "punch":
                      return <Star className="h-5 w-5 text-blue-600" />;
                    case "welcome":
                      return <Check className="h-5 w-5 text-purple-600" />;
                    default:
                      return <Bell className="h-5 w-5 text-gray-600" />;
                  }
                };

                return (
                  <Card
                    key={notification.id}
                    className={
                      !notification.isRead ? "border-blue-200 bg-blue-50" : ""
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">{getIcon()}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {format(notification.timestamp, "MMM d, h:mm a")}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Your account details and statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={customerProfile.avatar} />
                    <AvatarFallback className="text-lg">
                      {customerProfile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {customerProfile.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {customerProfile.phone}
                    </p>
                    {customerProfile.email && (
                      <p className="text-muted-foreground">
                        {customerProfile.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {customerProfile.totalCards}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Loyalty Cards
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {customerProfile.totalPunches}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Punches
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {customerProfile.totalRewards}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Rewards Earned
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Member since{" "}
                    {format(customerProfile.joinedAt, "MMMM d, yyyy")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* QR Code Modal */}
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Your QR Code</DialogTitle>
            <DialogDescription>
              Show this code to the staff to earn punches or redeem rewards
            </DialogDescription>
          </DialogHeader>
          {selectedCard && (
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-white rounded-lg border">
                <QRCode value={selectedCard.qrCodeData} size={200} level="M" />
              </div>
              <div className="text-center">
                <h3 className="font-medium">{selectedCard.businessName}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedCard.programName}
                </p>
                {selectedCard.currentPunches >= selectedCard.punchesRequired ? (
                  <Badge className="mt-2 bg-green-100 text-green-800">
                    Ready to redeem reward!
                  </Badge>
                ) : (
                  <p className="text-xs text-muted-foreground mt-2">
                    {selectedCard.currentPunches} /{" "}
                    {selectedCard.punchesRequired} punches
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerApp;
