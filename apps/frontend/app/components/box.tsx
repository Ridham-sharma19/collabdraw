
"use client";

import React from "react";
import Input from "../components/input";
import Button from "../components/btn";

interface RoomBoxProps {
  title: string;
  placeholder: string;
 
  buttonText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export default function RoomBox({
  title,
  placeholder,
 
  buttonText,
  onChange,
  onSubmit,
}: RoomBoxProps) {
  return (
    <div className="bg-neutral-800 text-white p-6 rounded-2xl shadow-lg w-96 mx-auto mt-10 space-y-4 border border-neutral-700 hover:border-neutral-500 transition-colors duration-300">
      <h2 className="text-xl font-semibold text-center">{title}</h2>

      <Input type="text" placeholder={placeholder} onChange={onChange} />
         
         <div className="flex justify-end">
             <Button variant="primary" children={buttonText} onClick={onSubmit}>
       
      </Button>
         </div>
     
    </div>
  );
}

