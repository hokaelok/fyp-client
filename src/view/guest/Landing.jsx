import { Link } from 'react-router-dom';

import Footer from '@/components/guest/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Landing = () => {
  const features = [
    {
      title: 'Convenient Pickup',
      description: 'Schedule a pickup for your e-waste at your convenience.',
    },
    {
      title: 'Eco-friendly Disposal',
      description: 'Ensuring that all e-waste is disposed of in an environmentally friendly manner.',
    },
    {
      title: 'Rewards Program',
      description: 'Earn rewards for recycling your electronics responsibly.',
    },
  ];

  const benefits = [
    {
      title: 'For Consumers',
      description: 'Easily recycle old electronics and earn rewards.',
    },
    {
      title: 'For Shop Owners',
      description: 'Offer recycling services to customers and increase foot traffic.',
    },
    {
      title: 'For Collectors',
      description: 'Access a steady stream of e-waste for recycling and disposal.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <main className="flex-grow w-full">
        <section id="features" className="flex flex-col items-center justify-center py-20 bg-gray-100">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join the E-waste Recycling Movement</h2>
          <p className="text-lg text-gray-700 mb-6">
            Helping consumers, shop owners, and collectors responsibly recycle electronics.
          </p>
          <Link to="/register" >
            <Button size="lg" className="font-bold">
              Start Your E-waste Journey
            </Button>
          </Link>
        </section>
        <section id="features" className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="mb-5">
                      {feature.title}
                    </CardTitle>
                    <CardDescription>
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="bg-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Benefits for All Users</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="mb-5">
                      {benefit.title}
                    </CardTitle>
                    <CardDescription>
                      {benefit.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Get Started Today!</h3>
            <p className="text-lg text-gray-700 mb-6">
              Join us in making a positive impact on the environment by recycling your e-waste.
            </p>
            <Link to="/register" >
              <Button size="lg" className="font-bold">
                Start Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;