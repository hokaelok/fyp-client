import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';

const DataTableColumnHeader = ({ column, title, className }) => {
  if (!column.getCanSort()) {
    return (
      <div className={className}>
        {title}
      </div>
    );
  }

  const renderSortIcon = () => {
    const sort = column.getIsSorted();

    if (!sort) {
      return <ArrowUpDown className='ml-2 h-4 w-4' />;
    }

    return sort === 'desc' ?
      <ArrowDown className='ml-2 h-4 w-4' /> :
      <ArrowUp className='ml-2 h-4 w-4' />;
  };

  return (
    <div className={className}>
      <Button
        variant="ghost"
        size="sm"
        onClick={column.getToggleSortingHandler()}
      >
        {title}
        {renderSortIcon()}
      </Button>
    </div >
  );
};

export default DataTableColumnHeader;