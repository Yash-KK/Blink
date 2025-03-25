import React from "react";
import {
  Activity,
  Bell,
  Shield,
  Clock,
  Server,
  ArrowRight,
} from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Monitor Your Services with Confidence
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Real-time monitoring, instant alerts, and comprehensive insights
              for your applications and services.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                <span>Start Monitoring</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-gray-700 hover:border-gray-600 px-6 py-3 rounded-lg transition-colors">
                View Demo
              </button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gray-800/50" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Powerful Monitoring Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Bell className="w-6 h-6 text-blue-500" />}
                title="Instant Alerts"
                description="Get notified immediately when your services experience downtime or performance issues."
              />
              <FeatureCard
                icon={<Shield className="w-6 h-6 text-blue-500" />}
                title="Security First"
                description="Enterprise-grade security with encrypted communications and detailed audit logs."
              />
              <FeatureCard
                icon={<Clock className="w-6 h-6 text-blue-500" />}
                title="24/7 Monitoring"
                description="Round-the-clock monitoring from multiple global locations for accurate insights."
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <StatCard number="99.99%" label="Average Uptime" />
              <StatCard number="<10ms" label="Response Time" />
              <StatCard number="24/7" label="Support Available" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Monitoring?
            </h2>
            <p className="text-gray-400 mb-8">
              Join thousands of companies that trust UptimeGuard for their
              monitoring needs.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg flex items-center space-x-2 mx-auto transition-colors">
              <span>Get Started Now</span>
              <Server className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-6 h-6 text-blue-500" />
                <span className="text-xl font-bold">UptimeGuard</span>
              </div>
              <p className="text-gray-400">
                Reliable monitoring for modern applications.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
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
    <div className="p-6 rounded-lg bg-gray-800 border border-gray-700 hover:border-blue-500 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
      <div className="text-3xl font-bold text-blue-400 mb-2">{number}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

export default App;
