import { useNavigate } from "react-router-dom";
import { toShortDateTimeFormat } from "@/lib/data-formatter";

import DataTableColumnHeader from "@/components/common/dataTable/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const BusinessRewardColumns = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Point Required" />
    ),
    accessorKey: "required_points",
  },
  {
    header: "Claimable Start Date",
    accessorKey: "start_time",
    cell: ({ row }) => toShortDateTimeFormat(row.original.start_time),
  },
  {
    header: "Claimable End Date",
    accessorKey: "end_time",
    cell: ({ row }) => toShortDateTimeFormat(row.original.end_time),
  },
  {
    header: "Expiry Date",
    accessorKey: "expiry_time",
    cell: ({ row }) => toShortDateTimeFormat(row.original.expiry_time),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const reward = row.original;
      const navigate = useNavigate();

      const handleViewReward = () => {
        navigate(`${location.pathname}/${reward.id}`);
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
              onClick={handleViewReward}
              className="font-medium"
            >
              Go to Reward
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default BusinessRewardColumns;
