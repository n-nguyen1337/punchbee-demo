import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  QrCode,
  Users,
  Gift,
  TrendingUp,
  Camera,
  Bell,
  Settings,
  LogOut,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import QRCode from "react-qr-code";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";

interface LoyaltyProgram {
  id: string;
  name: string;
  description: string;
  punchesRequired: number;
  rewardDescription: string;
  isActive: boolean;
  qrCodeData: string;
  customersEnrolled: number;
  totalPunches: number;
  rewardsRedeemed: number;
  createdAt: Date;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  totalPunches: number;
  currentPunches: number;
  rewardsEarned: number;
  lastVisit: Date;
  joinedAt: Date;
}

interface PunchHistory {
  id: string;
  customerId: string;
  customerName: string;
  programId: string;
  programName: string;
  punchesAdded: number;
  timestamp: Date;
  staffMember: string;
}

const BusinessDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isCreateProgramOpen, setIsCreateProgramOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<LoyaltyProgram | null>(
    null,
  );

  const [programs, setPrograms] = useState<LoyaltyProgram[]>([]);

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      totalPunches: 23,
      currentPunches: 3,
      rewardsEarned: 2,
      lastVisit: new Date("2023-06-15"),
      joinedAt: new Date("2023-01-20"),
    },
    {
      id: "2",
      name: "Mike Chen",
      phone: "+1 (555) 987-6543",
      totalPunches: 45,
      currentPunches: 5,
      rewardsEarned: 4,
      lastVisit: new Date("2023-06-14"),
      joinedAt: new Date("2023-01-25"),
    },
  ]);

  const [punchHistory, setPunchHistory] = useState<PunchHistory[]>([
    {
      id: "1",
      customerId: "1",
      customerName: "Sarah Johnson",
      programId: "1",
      programName: "Coffee Lovers Club",
      punchesAdded: 1,
      timestamp: new Date("2023-06-15T10:30:00"),
      staffMember: "John Doe",
    },
    {
      id: "2",
      customerId: "2",
      customerName: "Mike Chen",
      programId: "1",
      programName: "Coffee Lovers Club",
      punchesAdded: 2,
      timestamp: new Date("2023-06-14T14:15:00"),
      staffMember: "Jane Smith",
    },
  ]);

  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
    punchesRequired: 10,
    rewardDescription: "",
  });

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase
        .from('loyalty_programs')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error && data) {
        setPrograms(
          data.map((p: any) => ({
            id: p.id.toString(),
            name: p.name,
            description: p.description,
            punchesRequired: p.punches_required,
            rewardDescription: p.reward_description,
            isActive: p.is_active,
            qrCodeData: p.qr_code_data,
            customersEnrolled: p.customers_enrolled || 0,
            totalPunches: p.total_punches || 0,
            rewardsRedeemed: p.rewards_redeemed || 0,
            createdAt: new Date(p.created_at),
          }))
        );
      }
    }
    fetchPrograms()
  }, [])

  const handleCreateProgram = async () => {
    if (
      !newProgram.name ||
      !newProgram.description ||
      !newProgram.rewardDescription
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const program: LoyaltyProgram = {
      id: Date.now().toString(),
      ...newProgram,
      isActive: true,
      qrCodeData: `loyalty-program-${Date.now()}`,
      customersEnrolled: 0,
      totalPunches: 0,
      rewardsRedeemed: 0,
      createdAt: new Date(),
    };

    setPrograms([...programs, program]);
    const { error } = await supabase.from('loyalty_programs').insert({
      name: program.name,
      description: program.description,
      punches_required: program.punchesRequired,
      reward_description: program.rewardDescription,
      is_active: program.isActive,
      qr_code_data: program.qrCodeData,
    });
    if (error) console.error(error);
    setNewProgram({
      name: "",
      description: "",
      punchesRequired: 10,
      rewardDescription: "",
    });
    setIsCreateProgramOpen(false);
    toast.success("Loyalty program created successfully!");
  };

  const handleScanQR = () => {
    // Mock QR scan result
    const mockCustomer =
      customers[Math.floor(Math.random() * customers.length)];
    const mockProgram = programs[Math.floor(Math.random() * programs.length)];

    // Add punch to customer
    const updatedCustomers = customers.map((customer) => {
      if (customer.id === mockCustomer.id) {
        const newCurrentPunches = customer.currentPunches + 1;
        const newTotalPunches = customer.totalPunches + 1;
        const rewardEarned = newCurrentPunches >= mockProgram.punchesRequired;

        return {
          ...customer,
          currentPunches: rewardEarned ? 0 : newCurrentPunches,
          totalPunches: newTotalPunches,
          rewardsEarned: rewardEarned
            ? customer.rewardsEarned + 1
            : customer.rewardsEarned,
          lastVisit: new Date(),
        };
      }
      return customer;
    });

    setCustomers(updatedCustomers);

    // Add to punch history
    const newPunch: PunchHistory = {
      id: Date.now().toString(),
      customerId: mockCustomer.id,
      customerName: mockCustomer.name,
      programId: mockProgram.id,
      programName: mockProgram.name,
      punchesAdded: 1,
      timestamp: new Date(),
      staffMember: "Current User",
    };

    setPunchHistory([newPunch, ...punchHistory]);
    setIsScannerOpen(false);

    const rewardEarned =
      mockCustomer.currentPunches + 1 >= mockProgram.punchesRequired;
    if (rewardEarned) {
      toast.success(`🎉 ${mockCustomer.name} earned a reward!`);
    } else {
      toast.success(`Punch added for ${mockCustomer.name}`);
    }
  };

  const totalStats = {
    totalCustomers: customers.length,
    totalPrograms: programs.length,
    totalPunches: programs.reduce((sum, p) => sum + p.totalPunches, 0),
    totalRewards: programs.reduce((sum, p) => sum + p.rewardsRedeemed, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PunchBee</h1>
                <p className="text-sm text-gray-500">Business Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsScannerOpen(true)}
                className="flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Scan QR Code
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Customers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalStats.totalCustomers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Active members
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Programs
                  </CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalStats.totalPrograms}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Loyalty programs
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Punches
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalStats.totalPunches}
                  </div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Rewards Redeemed
                  </CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalStats.totalRewards}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total redeemed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest customer punches and rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {punchHistory.slice(0, 5).map((punch) => (
                    <div
                      key={punch.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {punch.customerName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {punch.customerName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {punch.programName} • {punch.punchesAdded} punch
                            {punch.punchesAdded > 1 ? "es" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {format(punch.timestamp, "MMM d, h:mm a")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Programs Tab */}
          <TabsContent value="programs" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Loyalty Programs</h2>
                <p className="text-muted-foreground">
                  Manage your loyalty programs and QR codes
                </p>
              </div>
              <Dialog
                open={isCreateProgramOpen}
                onOpenChange={setIsCreateProgramOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Program
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Loyalty Program</DialogTitle>
                    <DialogDescription>
                      Set up a new loyalty program for your customers
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Program Name</Label>
                      <Input
                        id="name"
                        value={newProgram.name}
                        onChange={(e) =>
                          setNewProgram({ ...newProgram, name: e.target.value })
                        }
                        placeholder="e.g., Coffee Lovers Club"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newProgram.description}
                        onChange={(e) =>
                          setNewProgram({
                            ...newProgram,
                            description: e.target.value,
                          })
                        }
                        placeholder="e.g., Buy 10 coffees, get 1 free!"
                      />
                    </div>
                    <div>
                      <Label htmlFor="punches">Punches Required</Label>
                      <Input
                        id="punches"
                        type="number"
                        value={newProgram.punchesRequired}
                        onChange={(e) =>
                          setNewProgram({
                            ...newProgram,
                            punchesRequired: parseInt(e.target.value),
                          })
                        }
                        min="1"
                        max="20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reward">Reward Description</Label>
                      <Input
                        id="reward"
                        value={newProgram.rewardDescription}
                        onChange={(e) =>
                          setNewProgram({
                            ...newProgram,
                            rewardDescription: e.target.value,
                          })
                        }
                        placeholder="e.g., Free coffee of your choice"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateProgramOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateProgram}>
                      Create Program
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <Card key={program.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {program.name}
                        </CardTitle>
                        <CardDescription>{program.description}</CardDescription>
                      </div>
                      <Badge
                        variant={program.isActive ? "default" : "secondary"}
                      >
                        {program.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Customers</p>
                        <p className="font-medium">
                          {program.customersEnrolled}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Punches</p>
                        <p className="font-medium">{program.totalPunches}</p>
                      </div>
                    </div>

                    <div className="flex justify-center p-4 bg-white rounded-lg border">
                      <QRCode value={program.qrCodeData} size={120} level="M" />
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Customers</h2>
              <p className="text-muted-foreground">
                View and manage your loyalty program members
              </p>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Total Punches</TableHead>
                      <TableHead>Current Punches</TableHead>
                      <TableHead>Rewards Earned</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={customer.avatar} />
                              <AvatarFallback>
                                {customer.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Joined{" "}
                                {format(customer.joinedAt, "MMM d, yyyy")}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{customer.phone}</p>
                            {customer.email && (
                              <p className="text-xs text-muted-foreground">
                                {customer.email}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{customer.totalPunches}</TableCell>
                        <TableCell>{customer.currentPunches}</TableCell>
                        <TableCell>{customer.rewardsEarned}</TableCell>
                        <TableCell>
                          {format(customer.lastVisit, "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Punch History</h2>
              <p className="text-muted-foreground">
                Track all customer punch activity
              </p>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Punches Added</TableHead>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Date & Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {punchHistory.map((punch) => (
                      <TableRow key={punch.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {punch.customerName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {punch.customerName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{punch.programName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            +{punch.punchesAdded} punch
                            {punch.punchesAdded > 1 ? "es" : ""}
                          </Badge>
                        </TableCell>
                        <TableCell>{punch.staffMember}</TableCell>
                        <TableCell>
                          {format(punch.timestamp, "MMM d, yyyy h:mm a")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* QR Scanner Modal */}
      <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan Customer QR Code</DialogTitle>
            <DialogDescription>
              Point your camera at the customer's QR code to add a punch
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <Camera className="h-16 w-16 text-gray-400" />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Camera view would appear here in a real implementation
            </p>
            <Button onClick={handleScanQR} className="w-full">
              Simulate Scan (Demo)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessDashboard;
