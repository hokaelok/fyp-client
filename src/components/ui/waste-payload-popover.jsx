"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const WastePayloadPopover = ({ items, onChange }) => {
  const [payload, setPayload] = useState(items);

  const handleQuantityChange = (id, quantity) => {
    const updatedPayload = payload.map(item => item.id === id ? { ...item, quantity: parseInt(quantity) } : item);
    setPayload(updatedPayload);
    const filteredPayload = updatedPayload.filter(item => item.quantity > 0);
    onChange(filteredPayload);
  };

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button variant="outline">Fill E-waste Payload</Button>
      </PopoverTrigger>
      <PopoverContent className="h-72 overflow-hidden overflow-y-scroll">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">E-Waste Payload</h4>
            <p className="text-sm text-muted-foreground">
              Fill the e-waste payload you want to dispose.
            </p>
          </div>
          <div className="grid gap-2">
            {payload.map((item) => (
              <div key={item.id} className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor={item.id} className="capitalize">{item.label}</Label>
                <Input
                  id={item.id}
                  value={item.quantity}
                  type="number"
                  className="col-span-2 h-8 w-40"
                  min="0"
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WastePayloadPopover;
