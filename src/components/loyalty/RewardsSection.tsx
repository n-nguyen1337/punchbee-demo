import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { QrCode, Gift, Clock, Check, ChevronRight } from "lucide-react";

interface Reward {
  id: string;
  title: string;
  description: string;
  requiredPunches: number;
  isRedeemed: boolean;
  expiryDate?: string;
}

interface RewardsSectionProps {
  currentPunches?: number;
  maxPunches?: number;
  rewards?: Reward[];
  onRedeemReward?: (rewardId: string) => void;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({
  currentPunches = 5,
  maxPunches = 10,
  rewards = [
    {
      id: "1",
      title: "Free Coffee",
      description: "Enjoy a complimentary coffee of your choice",
      requiredPunches: 5,
      isRedeemed: false,
    },
    {
      id: "2",
      title: "50% Off Pastry",
      description: "Get half off any pastry with your coffee",
      requiredPunches: 8,
      isRedeemed: false,
    },
    {
      id: "3",
      title: "Free Breakfast Sandwich",
      description: "Redeem a free breakfast sandwich of your choice",
      requiredPunches: 10,
      isRedeemed: false,
      expiryDate: "2023-12-31",
    },
    {
      id: "4",
      title: "Free Coffee",
      description: "Enjoy a complimentary coffee of your choice",
      requiredPunches: 5,
      isRedeemed: true,
      expiryDate: "2023-10-15",
    },
  ],
  onRedeemReward = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("available");

  const availableRewards = rewards.filter((reward) => !reward.isRedeemed);
  const redeemedRewards = rewards.filter((reward) => reward.isRedeemed);

  const handleRedeemClick = (rewardId: string) => {
    onRedeemReward(rewardId);
  };

  const isEligibleForReward = (requiredPunches: number) => {
    return currentPunches >= requiredPunches;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-background rounded-xl shadow-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Rewards</CardTitle>
          <CardDescription>
            Earn punches to unlock special rewards
          </CardDescription>
          <div className="mt-2">
            <Progress
              value={(currentPunches / maxPunches) * 100}
              className="h-2"
            />
            <div className="flex justify-between mt-1 text-sm text-muted-foreground">
              <span>{currentPunches} punches</span>
              <span>{maxPunches} needed for max reward</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="available"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="redeemed">Redeemed</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="mt-4 space-y-4">
              {availableRewards.length > 0 ? (
                availableRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="border rounded-lg p-4 relative"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{reward.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {reward.description}
                        </p>
                        <div className="flex items-center mt-2 text-sm">
                          <Gift className="h-4 w-4 mr-1 text-primary" />
                          <span>{reward.requiredPunches} punches required</span>
                        </div>
                        {reward.expiryDate && (
                          <div className="flex items-center mt-1 text-sm text-amber-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Expires: {reward.expiryDate}</span>
                          </div>
                        )}
                      </div>
                      <Badge
                        variant={
                          isEligibleForReward(reward.requiredPunches)
                            ? "default"
                            : "outline"
                        }
                        className="ml-2"
                      >
                        {isEligibleForReward(reward.requiredPunches)
                          ? "Ready"
                          : `${reward.requiredPunches - currentPunches} more`}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <Button
                        onClick={() => handleRedeemClick(reward.id)}
                        disabled={!isEligibleForReward(reward.requiredPunches)}
                        className="w-full"
                        variant={
                          isEligibleForReward(reward.requiredPunches)
                            ? "default"
                            : "outline"
                        }
                      >
                        {isEligibleForReward(reward.requiredPunches) ? (
                          <>
                            <QrCode className="mr-2 h-4 w-4" /> Generate QR Code
                          </>
                        ) : (
                          "Not Enough Punches"
                        )}
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Gift className="mx-auto h-12 w-12 opacity-20 mb-2" />
                  <p>No available rewards yet</p>
                  <p className="text-sm">Keep collecting punches!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="redeemed" className="mt-4 space-y-4">
              {redeemedRewards.length > 0 ? (
                redeemedRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="border rounded-lg p-4 relative bg-muted/30"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium flex items-center">
                          {reward.title}
                          <Check className="h-4 w-4 ml-2 text-green-500" />
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {reward.description}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-muted-foreground">
                          <Gift className="h-4 w-4 mr-1" />
                          <span>Required {reward.requiredPunches} punches</span>
                        </div>
                      </div>
                      <Badge variant="secondary">Redeemed</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full mt-3 text-muted-foreground"
                    >
                      View Details <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Check className="mx-auto h-12 w-12 opacity-20 mb-2" />
                  <p>No redeemed rewards yet</p>
                  <p className="text-sm">Redeem a reward to see it here</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <Button variant="outline" size="sm">
            View All Rewards
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RewardsSection;
