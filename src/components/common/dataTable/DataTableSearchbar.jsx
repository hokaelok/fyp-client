import { Input } from "@/components/ui/input";

const DataTableSearchbar = ({ table, column, placeholder, className }) => {
  return (
    <Input
      className={className}
      placeholder={placeholder}
      value={table.getColumn(column)?.getFilterValue() || ''}
      onChange={(event) => {
        table.getColumn(column)?.setFilterValue(event.target.value);
      }}
    />
  );
};

export default DataTableSearchbar;
