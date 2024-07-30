import { useSelector } from 'react-redux';

import Hero from '@/components/ui/hero';
import Headquarter from './Headquarter';
import BranchList from './BranchList';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";

const Organization = () => {
  const userType = useSelector((state) => state.user.userType);

  return (
    <>
      <Hero
        title="Organization"
        subtitle="Manage your organization settings"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <Tabs defaultValue="headquarter" className='mb-5'>
          <TabsList className=" max-w-80 flex justify-around">
            <TabsTrigger value="headquarter"
              className="flex-1 text-center text-md data-[state=active]:bg-blue-500 data-[state=active]:text-white py-2 rounded-t-lg"
            >
              Headquarter
            </TabsTrigger>
            {userType !== 'collector' && (
              <TabsTrigger value="branch"
                className="flex-1 text-center text-md data-[state=active]:bg-blue-500 data-[state=active]:text-white py-2 rounded-t-lg"
              >
                Branch
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="headquarter">
            <Headquarter />
          </TabsContent>

          <TabsContent value="branch">
            <BranchList />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default Organization;