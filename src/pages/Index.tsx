import React from 'react';
import Header from '@/components/Header';
import AddictionTracker from '@/components/AddictionTracker';
import DailyCheckIn from '@/components/DailyCheckIn';
import ProgressChart from '@/components/ProgressChart';
import ResourcesSection from '@/components/ResourcesSection';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-32 bg-hero-pattern">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-heading">
            Break Free from Addictive Habits
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            Your personal companion on the journey to overcoming addiction. Track your progress, celebrate milestones, and find support when you need it most.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-teal hover:bg-teal/90 text-white px-8 py-6 rounded-full text-lg">
              Start Your Journey
            </Button>
            <Button variant="outline" className="px-8 py-6 rounded-full text-lg">
              Learn More
            </Button>
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-navy">Your Progress Dashboard</h2>
              <ProgressChart />
            </div>
          </div>
        </div>
      </section>
      
      {/* Other sections */}
      <AddictionTracker />
      <DailyCheckIn />
      <ResourcesSection />
      
      {/* Footer */}
      <footer className="py-8 bg-navy text-white/90">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-teal flex items-center justify-center">
                <span className="text-white font-bold text-sm">CR</span>
              </div>
              <span className="font-bold text-lg">CraveLess</span>
            </div>
            
            <div className="text-sm text-white/70">
              © {new Date().getFullYear()} CraveLess. All rights reserved.
            </div>
            
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-white/80 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
