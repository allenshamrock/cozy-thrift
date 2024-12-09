"use client";
import { setOrderAsCompleted } from "@/actions/orderActions";
import Button from "../Button";
import { useState } from "react";
import toast from "react-hot-toast";

export default function setOrderAsCompletedBtn({ id }: { id: number }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAsCompleted = (id: number) => {
    setIsLoading(true);
    setOrderAsCompleted(id)
      .then((response) => {
        if (!response.success) {
          toast("Something went wrong,please try again");
        } else {
          toast.success("Order completed");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong,please try again");
        setIsLoading(false);
        console.log( err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button
      onClick={() => handleAsCompleted(id)}
      loading={isLoading}
      solid
      className="bg-secondary text-sm border-none"
      label={isLoading ? "Loading...." : "Set as completed"}
    />
  );
}
