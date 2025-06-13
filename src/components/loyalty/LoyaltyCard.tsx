import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface LoyaltyCardProps {
  businessName?: string;
  businessLogo?: string;
  punchCount?: number;
  maxPunches?: number;
  lastPunchDate?: string;
  rewardThreshold?: number;
  onPunchAdded?: () => void;
}

const LoyaltyCard = ({
  businessName = "Coffee Haven",
  businessLogo = "https://api.dicebear.com/7.x/avataaars/svg?seed=coffeeshop",
  punchCount = 3,
  maxPunches = 10,
  lastPunchDate = "2023-05-15",
  rewardThreshold = 10,
  onPunchAdded,
}: LoyaltyCardProps) => {
  const progress = (punchCount / maxPunches) * 100;
  const isRewardAvailable = punchCount >= rewardThreshold;

  return (
    <Card className="w-full max-w-[350px] bg-white shadow-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-white p-1">
            <img
              src={businessLogo}
              alt={`${businessName} logo`}
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <h3 className="font-bold text-white text-lg">{businessName}</h3>
        </div>
        {isRewardAvailable && (
          <Badge
            variant="secondary"
            className="bg-yellow-300 text-yellow-800 animate-pulse"
          >
            Reward Ready!
          </Badge>
        )}
      </CardHeader>

      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">
              {punchCount} / {maxPunches} Punches
            </span>
            <span className="text-xs text-gray-500">
              Last visit: {lastPunchDate}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: maxPunches }).map((_, index) => (
            <motion.div
              key={index}
              className={`aspect-square rounded-full flex items-center justify-center ${index < punchCount ? "bg-blue-600 text-white" : "bg-gray-100 border border-gray-300"}`}
              initial={index === punchCount - 1 ? { scale: 0 } : { scale: 1 }}
              animate={{ scale: 1 }}
              transition={
                index === punchCount - 1
                  ? { type: "spring", stiffness: 500, damping: 15 }
                  : {}
              }
            >
              {index < punchCount && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-center">
          {isRewardAvailable ? (
            <p className="text-sm font-medium text-green-600">
              You've earned a reward! 🎉
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              {rewardThreshold - punchCount} more{" "}
              {rewardThreshold - punchCount === 1 ? "visit" : "visits"} until
              your next reward
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyCard;
