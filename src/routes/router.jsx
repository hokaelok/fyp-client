import { createBrowserRouter, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Layout
import GuestLayout from "@/view/guest/GuestLayout";
import ConsumerLayout from "@/view/consumer/ConsumerLayout";
import BusinessLayout from "@/view/business/BusinessLayout";
import CollectorLayout from "@/view/collector/CollectorLayout";

// Common
import Landing from "@/view/guest/Landing";
import Login from "@/view/guest/Login";
import Register from "@/view/guest/Register";
import Profile from "@/view/common/profile/Profile";
import Organization from "@/view/common/company/Organization";
import EventList from "@/view/common/events/EventList";
import EventDetail from "@/view/common/events/EventDetail";
import NotFound from "@/view/common/NotFound";

// Consumer
import ConsumerHotspots from "@/view/consumer/hotspots/ConsumerHotspots";
import ConsumerHotspotDetail from "@/view/consumer/hotspots/ConsumerHotspotDetail";
import ConsumerRequestList from "@/view/consumer/request/ConsumerRequestList";
import ConsumerRequestDetail from "@/view/consumer/request/ConsumerRequestDetail";
import ConsumerRewardList from "@/view/consumer/rewards/ConsumerRewardList";
import ConsumerRewardDetail from "@/view/consumer/rewards/ConsumerRewardDetail";
import ConsumerRedeemedRewardList from "@/view/consumer/rewards/ConsumerRedeemedRewardList";
import ConsumerRedeemedRewardDetail from "@/view/consumer/rewards/ConsumerRedeemedRewardDetail";
import ConsumerPointsHistory from "@/view/consumer/rewards/ConsumerPointsHistory";
import ConsumerEducationList from "@/view/consumer/education/ConsumerEducationList";
import ConsumerEducationDetail from "@/view/consumer/education/ConsumerEducationDetail";

// Business
import BranchDetail from "@/view/common/company/BranchDetail";
import BusinessPickupList from "@/view/business/pickup/BusinessPickupList";
import BusinessPickupDetail from "@/view/business/pickup/BusinessPickupDetail";
import BusinessCollectionList from "@/view/business/collection/BusinessCollectionList";
import BusinessCollectionDetail from "@/view/business/collection/BusinessCollectionDetail";
import BusinessHotspots from "@/view/business/collection/BusinessHotspots";
import BusinessHotspotDetail from "@/view/business/collection/BusinessHotspotDetail";
import BusinessRewardList from "@/view/business/rewards/BusinessRewardList";
import BusinessRewardDetail from "@/view/business/rewards/BusinessRewardDetail";

// Collector
import CollectorPickupList from "@/view/collector/pickup/CollectorPickupList";
import CollectorPickupDetail from "@/view/collector/pickup/CollectorPickupDetail";

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      { path: '', element: <Landing /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ]
  },
  {
    path: 'consumer',
    element: <PrivateRoute allowedRoles={['consumer']} />,
    children: [
      {
        path: '',
        element: <ConsumerLayout />,
        children: [
          { path: '', element: <Navigate to='hotspots' /> },
          { path: 'hotspots', element: <ConsumerHotspots /> },
          { path: 'hotspots/:hotspotType/:hotspotId', element: <ConsumerHotspotDetail /> },
          { path: 'requests', element: <ConsumerRequestList /> },
          { path: 'requests/:requestId', element: <ConsumerRequestDetail /> },
          { path: 'rewards', element: <ConsumerRewardList /> },
          { path: 'rewards/:rewardId', element: <ConsumerRewardDetail /> },
          { path: 'rewards/redeemed', element: <ConsumerRedeemedRewardList /> },
          { path: 'rewards/redeemed/:redeemedRewardId', element: <ConsumerRedeemedRewardDetail /> },
          { path: 'rewards/history', element: <ConsumerPointsHistory /> },
          { path: 'education', element: <ConsumerEducationList /> },
          { path: 'education/:contentId', element: <ConsumerEducationDetail /> },
          { path: 'profile', element: <Profile /> },
        ]
      }
    ]
  },
  {
    path: 'business',
    element: <PrivateRoute allowedRoles={['business']} />,
    children: [
      {
        path: '',
        element: <BusinessLayout />,
        children: [
          { path: '', element: <Navigate to='pickups' /> },
          { path: 'pickups', element: <BusinessPickupList /> },
          { path: 'pickups/:pickupId', element: <BusinessPickupDetail /> },
          { path: 'collection', element: <BusinessCollectionList /> },
          { path: 'collection/:collectionId', element: <BusinessCollectionDetail /> },
          { path: 'collection/hotspots', element: <BusinessHotspots /> },
          { path: 'collection/hotspots/:hotspotId', element: <BusinessHotspotDetail /> },
          { path: 'rewards', element: <BusinessRewardList /> },
          { path: 'rewards/:rewardId', element: <BusinessRewardDetail /> },
          { path: 'events', element: <EventList /> },
          { path: 'events/:eventId', element: <EventDetail /> },
          { path: 'profile', element: <Profile /> },
          { path: 'organization', element: <Organization /> },
          { path: 'organization/branch/:branchId', element: <BranchDetail /> },
        ]
      }
    ]
  },
  {
    path: 'collector',
    element: <PrivateRoute allowedRoles={['collector']} />,
    children: [
      {
        path: '',
        element: <CollectorLayout />,
        children: [
          { path: '', element: <Navigate to='pickups' /> },
          { path: 'pickups', element: <CollectorPickupList /> },
          { path: 'pickups/:pickupId', element: <CollectorPickupDetail /> },
          { path: 'events', element: <EventList /> },
          { path: 'events/:eventId', element: <EventDetail /> },
          { path: 'profile', element: <Profile /> },
          { path: 'organization', element: <Organization /> },
        ]
      }
    ]
  },
  { path: '*', element: <NotFound /> }
]);

export default router;
