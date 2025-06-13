import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Smartphone,
  QrCode,
  Gift,
  Users,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  Check,
} from "lucide-react";

const HomePage = () => {
  const features = [
    {
      icon: <Building2 className="h-8 w-8 text-blue-600" />,
      title: "Business Dashboard",
      description:
        "Create loyalty programs, generate QR codes, and track customer progress",
      benefits: [
        "Set up custom loyalty programs",
        "Generate scannable QR codes",
        "View customer analytics",
        "Track punch history",
      ],
    },
    {
      icon: <Smartphone className="h-8 w-8 text-green-600" />,
      title: "Customer App",
      description:
        "Digital loyalty cards that customers can access on their phones",
      benefits: [
        "Phone number sign-up",
        "Digital punch cards",
        "Apple/Google Wallet integration",
        "Real-time notifications",
      ],
    },
    {
      icon: <QrCode className="h-8 w-8 text-purple-600" />,
      title: "QR Code System",
      description:
        "Seamless scanning system for adding punches and redeeming rewards",
      benefits: [
        "Quick customer check-in",
        "Instant punch validation",
        "Reward redemption",
        "No POS integration needed",
      ],
    },
  ];

  const stats = [
    {
      label: "Businesses Served",
      value: "500+",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      label: "Active Customers",
      value: "25K+",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Punches Processed",
      value: "100K+",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      label: "Rewards Redeemed",
      value: "15K+",
      icon: <Gift className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LoyaltyPro</h1>
                <p className="text-sm text-gray-500">
                  Digital Loyalty Cards for Small Business
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/business">
                <Button variant="outline">
                  <Building2 className="h-4 w-4 mr-2" />
                  Business Login
                </Button>
              </Link>
              <Link to="/customer">
                <Button>
                  <Smartphone className="h-4 w-4 mr-2" />
                  Customer App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            🚀 Replace Paper Punch Cards Today
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Digital Loyalty Cards
            <br />
            <span className="text-blue-600">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Help small businesses create and manage digital loyalty punch cards.
            No POS integration required - just scan QR codes and reward your
            customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/business">
              <Button size="lg" className="w-full sm:w-auto">
                <Building2 className="h-5 w-5 mr-2" />
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/customer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Smartphone className="h-5 w-5 mr-2" />
                Try Customer App
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Go Digital
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A complete solution for businesses and customers to manage loyalty
              programs without the hassle
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-center space-x-2"
                      >
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in minutes, not hours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Create Your Program
              </h3>
              <p className="text-gray-600">
                Set up your loyalty program with custom rewards and punch
                requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customers Join</h3>
              <p className="text-gray-600">
                Customers scan your QR code to sign up with their phone number
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan & Reward</h3>
              <p className="text-gray-600">
                Scan customer QR codes to add punches and track rewards
                automatically
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose LoyaltyPro?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-blue-200 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      No POS Integration Required
                    </h3>
                    <p className="text-blue-100">
                      Works alongside your existing systems without any complex
                      setup
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="h-6 w-6 text-blue-200 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Quick Setup</h3>
                    <p className="text-blue-100">
                      Get your digital loyalty program running in under 10
                      minutes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-blue-200 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Customer Friendly</h3>
                    <p className="text-blue-100">
                      Simple phone number signup with Apple/Google Wallet
                      integration
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-6 w-6 text-blue-200 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Real-time Analytics</h3>
                    <p className="text-blue-100">
                      Track customer behavior and program performance instantly
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Perfect For:</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-green-300" />
                    <span>Coffee shops & cafes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-green-300" />
                    <span>Restaurants & food trucks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-green-300" />
                    <span>Salons & barbershops</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-green-300" />
                    <span>Retail stores</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-green-300" />
                    <span>Service businesses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Ditch Paper Punch Cards?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of businesses already using LoyaltyPro to reward their
            customers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/business">
              <Button size="lg" className="w-full sm:w-auto">
                <Building2 className="h-5 w-5 mr-2" />
                Start Your Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/customer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Smartphone className="h-5 w-5 mr-2" />
                Download Customer App
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold">LoyaltyPro</h3>
                <p className="text-sm text-gray-400">
                  Digital loyalty made simple
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © 2023 LoyaltyPro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
