"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { checkoutCredits } from "@/lib/actions/transaction.actions";

import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const { toast } = useToast();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Pedido realizado!",
        description: "Você vai receber uma confirmação por e-mail",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Pedido cancelado!",
        description: "Pense melhor e tente novamente quando quiser",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, []);

  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-purple-gradient bg-cover"
        >
          Comprar créditos
        </Button>
      </section>
    </form>
  );
};

export default Checkout;