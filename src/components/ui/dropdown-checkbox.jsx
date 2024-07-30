"use client";

import * as React from "react";
import { useController } from 'react-hook-form';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const DropdownMenuCheckboxes = ({ name, control, items }) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: items.filter(item => item.checked).map(item => item.label),
  });

  const handleCheckedChange = (id, checked) => {
    const newCheckedItems = checked
      ? [...value, items.find(item => item.id === id).label]
      : value.filter(label => label !== items.find(item => item.id === id).label);
    onChange(newCheckedItems);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Select
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="h-40 overflow-y-scroll">
        {items.map((item) => (
          <DropdownMenuCheckboxItem
            onSelect={(e) => e.preventDefault()}
            key={item.id}
            checked={value.includes(item.label)}
            onCheckedChange={checked => handleCheckedChange(item.id, checked)}
            className='capitalize'
          >
            {item.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuCheckboxes;
