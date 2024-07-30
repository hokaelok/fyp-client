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

const BusinessPickupDataTable = ({
  columns,
  data,
  searchColumn,
  isFetchingData
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

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

        <DataTableViewOptions table={table} />
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

export default BusinessPickupDataTable;
