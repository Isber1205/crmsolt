"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { useFormStatus } from "react-dom";
import { toast } from 'react-toastify';

interface buttonProps {
  text: string
  variant?:
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
}

export function SubmitButton({ text, variant }: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button 
          variant={variant} 
          type="submit" 
          onClick={() => toast.success('Item created successfully')}
        >
          {text}
        </Button>
      )}
    </>
  );
}

export function ShoppingBagButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full mt-5" size="lg">
          <Loader2 className="mr-4 h-5 w-5 animate-spin" />Please Wait
        </Button>
      ) : (
        <Button 
          className="w-full mt-5" 
          size="lg" 
          type="submit"
          onClick={() => toast.success('Agregado al carrito')}
        >
          <ShoppingBag className="mr-4 h-5 w-5" />Add to Cart
        </Button>
      )}
    </>
  )
}

export function DeleteItem() {
  const {pending} = useFormStatus()

  return (
    <>
      {pending ? (
        <button disabled className="font-medium text-primary text-end">Removing...</button>
      ) : (
        <button 
          type="submit" 
          className="font-medium text-primary text-end"
          onClick={() => toast.success('Elimado del carrito')}
        >
          Delete
        </button>
      )}
    </>
  )
}

export function CheckoutButton() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button 
          type="submit" 
          size="lg" 
          className="w-full mt-5"
          onClick={() => toast.success('Checkout completed')}
        >
          Checkout
        </Button>
      )}
    </>
  )
}