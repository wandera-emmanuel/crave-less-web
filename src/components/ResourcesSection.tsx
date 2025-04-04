
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Phone, Users, Globe } from 'lucide-react';

const ResourcesSection: React.FC = () => {
  const resources = [
    {
      id: 1,
      title: "Understanding Addiction",
      description: "Learn about the science of addiction, withdrawal, and recovery processes.",
      icon: <BookOpen className="h-5 w-5 text-teal" />,
      link: "#",
    },
    {
      id: 2,
      title: "Support Groups",
      description: "Connect with others who understand what you're going through.",
      icon: <Users className="h-5 w-5 text-teal" />,
      link: "#",
    },
    {
      id: 3,
      title: "Hotlines & Crisis Support",
      description: "Get immediate help from trained professionals 24/7.",
      icon: <Phone className="h-5 w-5 text-teal" />,
      link: "#",
    },
    {
      id: 4,
      title: "Online Communities",
      description: "Join forums and online groups dedicated to recovery and support.",
      icon: <Globe className="h-5 w-5 text-teal" />,
      link: "#",
    },
  ];

  const motivationalQuotes = [
    "Recovery is not a race. You don't have to feel guilty if it takes you longer than you thought it would.",
    "Every day is a new opportunity to change your life.",
    "Progress, not perfection.",
    "You're not a failure if you relapse. You're only a failure if you stop trying.",
    "The most important part of recovery is self-forgiveness."
  ];

  // Get a random quote from the array
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <section id="resources" className="py-12 relative bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-heading">Helpful Resources</h2>
        
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-light-blue/30 p-6 md:p-8 rounded-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-medium mb-4 text-navy">Daily Inspiration</h3>
              <p className="text-lg md:text-xl italic mb-6 text-gray-700">"{randomQuote}"</p>
              <p className="text-sm text-gray-500">Remember: Small steps every day lead to big changes over time.</p>
            </div>
            <div className="waves-container">
              <div className="waves">
                <div className="wave wave-1" style={{ backgroundColor: 'rgba(62, 171, 184, 0.3)' }}></div>
                <div className="wave wave-2" style={{ backgroundColor: 'rgba(136, 212, 152, 0.2)' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <Card key={resource.id} className="floating-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {resource.icon}
                  <CardTitle>{resource.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{resource.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Explore Resources
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Need professional help? Don't hesitate to reach out to local healthcare providers.
          </p>
          <Button className="bg-teal hover:bg-teal/90">
            Find Professional Help
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
