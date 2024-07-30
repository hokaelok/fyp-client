import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Hero from '@/components/ui/hero';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card';

import {
  TabletSmartphone,
  Laptop,
  Monitor,
  Tv,
  Keyboard,
  Mouse,
  Headset,
  Mic,
  Camera,
  Printer,
  Router,
  BatteryCharging,
  Microwave,
  AirVent,
  WashingMachine,
} from 'lucide-react';

const eWasteData = [
  {
    title: 'Mobile Devices',
    description: 'Proper disposal methods for old and unused mobile devices.',
    icons: [<TabletSmartphone className="w-12 h-12 text-blue-700" />],
    link: 'mobile-phones',
  },
  {
    title: 'Computers',
    description: 'How to recycle or donate your old laptops & desktops.',
    icons: [<Laptop className="w-12 h-12 text-blue-700" />],
    link: 'laptops',
  },
  {
    title: 'Screens & TVs',
    description: 'Dispose of your old TVs responsibly.',
    icons: [<Monitor className="w-12 h-12 text-blue-700" />, <Tv className="w-12 h-12 text-blue-700" />],
    link: 'televisions',
  },
  {
    title: 'Computer Accessories',
    description: 'Recycling and disposal of used computer accessories like keyboards & mice',
    icons: [<Keyboard className="w-12 h-12 text-blue-700" />, <Mouse className="w-12 h-12 text-blue-700" />],
    link: 'keyboards-mice',
  },
  {
    title: 'Audio Devices',
    description: 'Proper recycling and disposal methods for old headsets & microphones.',
    icons: [<Headset className="w-12 h-12 text-blue-700" />, <Mic className="w-12 h-12 text-blue-700" />],
    link: 'headsets',
  },
  {
    title: 'Cameras',
    description: 'Proper disposal methods for old digital and film cameras.',
    icons: [<Camera className="w-12 h-12 text-blue-700" />],
    link: 'cameras',
  },
  {
    title: 'Printers & Scanners',
    description: 'Proper disposal methods for old printers and scanners.',
    icons: [<Printer className="w-12 h-12 text-blue-700" />],
    link: 'printers-scanners',
  },
  {
    title: 'Networking Equipment',
    description: 'Proper disposal methods for routers, modems, and other networking equipment.',
    icons: [<Router className="w-12 h-12 text-blue-700" />],
    link: 'networking-equipment',
  },
  {
    title: 'Batteries',
    description: 'Recycling and disposal of used batteries.',
    icons: [<BatteryCharging className="w-12 h-12 text-blue-700" />],
    link: 'batteries',
  },
  {
    title: 'Microwaves',
    description: 'Safe disposal and recycling of old microwaves.',
    icons: [<Microwave className="w-12 h-12 text-blue-700" />],
    link: 'microwaves',
  },
  {
    title: 'Air Conditioners',
    description: 'How to safely dispose of or recycle old air conditioners.',
    icons: [<AirVent className="w-12 h-12 text-blue-700" />],
    link: 'air-conditioners',
  },
  {
    title: 'Washing Machines',
    description: 'Guidelines for recycling and disposing of old washing machines.',
    icons: [<WashingMachine className="w-12 h-12 text-blue-700" />],
    link: 'washing-machines',
  },
];


const ConsumerEducationList = () => {
  const location = useLocation();

  return (
    <>
      <Hero
        title="E-Waste Disposal Guide"
        subtitle="Learn about e-waste & why proper disposal is crucial for the environment"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <h3 className='text-2xl font-bold p-1 mb-4'>
          E-Waste Types
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {eWasteData.map((item, index) => (
            <Link
              key={index}
              to={`${location.pathname}/${item.link}`}
              className='no-underline'
            >
              <Card className='w-full cursor-pointer hover:shadow-lg transition-shadow duration-200'>
                <CardHeader>
                  <div className="flex items-center justify-center bg-blue-100 rounded-t-lg w-full h-36">
                    {item.icons.map((icon, index) => (
                      <div key={index} className="flex items-center justify-center mx-2">
                        {icon}
                      </div>
                    ))}
                  </div>
                  <CardTitle className="pt-3">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default ConsumerEducationList;