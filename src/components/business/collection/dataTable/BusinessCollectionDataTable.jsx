import React, { useState } from 'react';

import DataTableSearchbar from '@/components/common/dataTable/DataTableSearchbar';
import DataTableViewOptions from '@/components/common/dataTable/DataTableViewOptions';
import DataTable from '@/components/common/dataTable/DataTable';
import DataTablePagination from '@/components/common/dataTable/DataTablePagination';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

const BusinessCollectionDataTable = ({
  columns,
  data,
  searchColumn,
  isFetchingData
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    }
  });

  return (
    <>
      <div className="flex justify-between py-4">
        <DataTableSearchbar
          table={table}
          column={searchColumn}
          placeholder="Search..."
          className="max-w-sm"
        />

        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Link to="/business/collection/hotspots">
                <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Request Collection
                </Button>
              </Link>
            </DialogTrigger>

            <DialogContent className="overflow-y-scroll max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className='mb-2'>
                  Request Collection Form
                </DialogTitle>
                <DialogDescription>
                  Please fill out the form below to request a collection.
                </DialogDescription>
              </DialogHeader>


            </DialogContent>
          </Dialog>

          <DataTableViewOptions table={table} />
        </div>
      </div>

      <div className="rounded-t-md border">
        <DataTable table={table} isFetchingData={isFetchingData} />
      </div>

      <div className="rounded-b-md border-b border-l border-r py-3">
        <DataTablePagination table={table} />
      </div>
    </>
  );
};

export default BusinessCollectionDataTable;
