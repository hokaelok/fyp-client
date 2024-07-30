import { useNavigate } from "react-router-dom";
import { toShortDateFormat, toShortDateTimeFormat } from "@/lib/data-formatter";

import DataTableColumnHeader from "@/components/common/dataTable/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const BusinessPickupColumns = [
  {
    header: "User Name",
    accessorKey: "user.name",
  },
  {
    header: "User Phone",
    accessorKey: "contact_number",
  },
  {
    header: "Branch Name",
    accessorKey: "branch.name",
  },
  {
    header: "Waste Type",
    accessorKey: "waste_type",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.waste_payload.map((payload) => (
          <Badge key={payload.id} className="capitalize text-center pb-[4px]">
            {payload.label}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    header: "City",
    accessorKey: "city",
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
      <DataTableColumnHeader column={column} title="Completed Date" />
    ),
    accessorKey: "completed_at",
    cell: ({ row }) => {
      const completedAt = row.original.completed_at;
      const status = row.original.status;

      if (status === 'pending') {
        return <span className="font-semibold text-gray-500">Acceptance Pending</span>;
      } else if (status === 'rejected') {
        return <span className="font-semibold text-red-500">Rejected</span>;
      } else if (!completedAt) {
        return <span className="font-semibold text-yellow-500">Pickup Pending</span>;
      } else {
        return <span>{toShortDateTimeFormat(completedAt)}</span>;
      }
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested Pickup Date" />
    ),
    accessorKey: "request_pickup_time",
    cell: ({ row }) => toShortDateTimeFormat(row.original.request_pickup_time),
  },
  {
    header: "Requested Date",
    accessorKey: "created_at",
    cell: ({ row }) => toShortDateFormat(row.original.requested_at),
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
              className="font-medium"
              onClick={handleViewPickup}
            >
              View Pickup Request
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export default BusinessPickupColumns;
