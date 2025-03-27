"use client";
import React from "react";
import {
  Bell,
  Shield,
  Clock,
  Zap,
  CheckCircle,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function App() {
  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="py-40 px-6 bg-gradient-to-br from-gray-900 to-gray-950">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-7xl font-extrabold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
              Monitor Your Services with Confidence
            </h1>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Real-time monitoring, instant alerts, and comprehensive insights
              to keep your services reliable and efficient.
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-3 px-8 py-4 text-lg rounded-lg transition-all shadow-lg hover:shadow-blue-500/50">
                  <Zap className="w-5 h-5" />
                  Start Monitoring
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-gray-700 hover:border-gray-500 text-gray-300 px-8 py-4 text-lg rounded-lg transition-all"
              >
                View Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-16">
              Powerful Monitoring Features
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <FeatureCard
                icon={<Bell className="w-10 h-10 text-blue-500" />}
                title="Instant Alerts"
                description="Get notified immediately when your services experience downtime or performance issues."
              />
              <FeatureCard
                icon={<Shield className="w-10 h-10 text-purple-500" />}
                title="Security First"
                description="Enterprise-grade security with encrypted communications and detailed audit logs."
              />
              <FeatureCard
                icon={<Clock className="w-10 h-10 text-green-500" />}
                title="24/7 Monitoring"
                description="Round-the-clock monitoring from multiple global locations for accurate insights."
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-32 bg-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <StatCard
                icon={<CheckCircle className="w-10 h-10 text-green-400" />}
                number="99.99%"
                label="Average Uptime"
              />
              <StatCard
                icon={<Globe className="w-10 h-10 text-blue-400" />}
                number="<10ms"
                label="Global Response Time"
              />
              <StatCard
                icon={<Zap className="w-10 h-10 text-yellow-400" />}
                number="24/7"
                label="Support Available"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative overflow-hiddenrounded-lg bg-gray-800 border border-gray-700 hover:border-blue-500 shadow-lg transition-all">
      <Card className="bg-gray-800/90 border-none">
        <CardHeader className="flex items-center gap-6">
          <div className="p-4 bg-gray-900 rounded-full">{icon}</div>
          <CardTitle className="text-white text-2xl font-bold">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">{description}</p>
        </CardContent>
      </Card>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-900 opacity-0 hover:opacity-40 transition-all duration-300" />
    </div>
  );
}

function StatCard({
  icon,
  number,
  label,
}: {
  icon: React.ReactNode;
  number: string;
  label: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-800 border border-gray-700 hover:border-purple-500 shadow-lg transition-all">
      <Card className="bg-gray-800/90 border-none text-center py-12">
        <div className="flex justify-center items-center mb-6">{icon}</div>
        <div className="text-5xl font-extrabold text-blue-400 mb-4">
          {number}
        </div>
        <div className="text-gray-400 text-lg">{label}</div>
      </Card>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-900 opacity-0 hover:opacity-40 transition-all duration-300" />
    </div>
  );
}

export default App;
