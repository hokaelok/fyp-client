import { useNavigate } from "react-router-dom";
import { toShortDateTimeFormat } from "@/lib/data-formatter";

import DataTableColumnHeader from "../../dataTable/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const EventColumns = [
  {
    header: "Event Name",
    accessorKey: "name",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
    accessorKey: "start_time",
    cell: ({ row }) => toShortDateTimeFormat(row.original.start_time),
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Time" />
    ),
    accessorKey: "end_time",
    cell: ({ row }) => toShortDateTimeFormat(row.original.end_time),
  },
  {
    header: "City",
    accessorKey: "city",
  },
  {
    header: "State",
    accessorKey: "state",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const event = row.original;
      const navigate = useNavigate();

      const handleViewEvent = () => {
        navigate(`${location.pathname}/${event.id}`);
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
              onClick={handleViewEvent}
            >
              Go to Event
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export default EventColumns;
