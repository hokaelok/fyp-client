import { useNavigate } from "react-router-dom";

import DataTableColumnHeader from "../../dataTable/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BranchColumns = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    accessorKey: "address.city",
  },
  {
    header: "State",
    accessorKey: "address.state",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const branch = row.original;
      const navigate = useNavigate();

      const handleViewBranch = () => {
        navigate(`${location.pathname}/branch/${branch.id}`);
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
              onClick={handleViewBranch}
            >
              Go to Branch
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export default BranchColumns;