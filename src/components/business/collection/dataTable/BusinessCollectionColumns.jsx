import { useNavigate } from "react-router-dom";
import { toShortDateFormat, toShortDateTimeFormat } from "@/lib/data-formatter";

import DataTableColumnHeader from "@/components/common/dataTable/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const BusinessCollectionColumns = [
  {
    header: "Branch Name",
    accessorKey: "requestor_branch.name",
    enableHiding: false,
  },
  {
    header: "Collector Name",
    accessorKey: "collector_branch.name",
    enableHiding: false,
  },
  {
    header: "Request Date",
    accessorKey: "requested_at",
    cell: ({ row }) => toShortDateFormat(row.original.requested_at),
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request Pickup Date" />
    ),
    accessorKey: "request_pickup_time",
    cell: ({ row }) => toShortDateTimeFormat(row.original.request_pickup_time),
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      let colorClass = "";
      switch (status) {
        case "pending":
          colorClass = "text-yellow-500";
          break;
        case "accepted":
          colorClass = "text-green-500";
          break;
        case "rejected":
          colorClass = "text-red-500";
          break;
        default:
          colorClass = "text-gray-500";
      }
      return (
        <span className={`capitalize font-semibold ${colorClass}`}>
          {status}
        </span>
      );
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Accepted Date" />
    ),
    accessorKey: "accepted_rejected_at",
    cell: ({ row }) => row.original.accepted_rejected_at ? toShortDateFormat(row.original.accepted_rejected_at) : "N/A",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Completed Date" />
    ),
    accessorKey: "completed_at",
    cell: ({ row }) => row.original.completed_at ? toShortDateTimeFormat(row.original.completed_at) : "N/A",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const pickup = row.original;
      const navigate = useNavigate();

      const handleViewPickup = () => {
        navigate(`${location.pathname}/${pickup.id}`);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={handleViewPickup}
              className="font-medium"
            >
              View Pickup Request
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default BusinessCollectionColumns;