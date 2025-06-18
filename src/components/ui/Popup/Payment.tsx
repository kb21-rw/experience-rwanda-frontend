import React, { useState, SetStateAction, Dispatch } from "react";
import { Input } from "../Input";
import MomoPaymentForm from "./MomoPaymentForm";
import { Button } from "../Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ClientData, MomoFormInputs } from "@/types/Popup";
import { postData } from "@/utils/request";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const PaymentPopup = ({
  setCurrentStep,
  clientData,
  tripId,
}: {
  setCurrentStep: Dispatch<SetStateAction<"userInfo" | "payment">>;
  clientData?: ClientData;
  tripId: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MomoFormInputs>();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "momo">("momo");
  const router = useRouter();

  const onSubmit: SubmitHandler<MomoFormInputs> = async (data) => {
    if (paymentMethod === "momo") {
      const { payingPhoneNumber } = data;
      const response = await postData(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/charge-momo`,
        { ...clientData, tripId, payingPhoneNumber }
      );

      if (response.status === "success") {
        router.push(response.meta.authorization.redirect);
      }
    } else if (paymentMethod === "card") {
      const response = await postData(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/charge-card`,
        { ...clientData, tripId }
      );
      if (response.data.status === "success") {
        router.push(response.data.data.link);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold text-center mb-10">Payment Details</h2>
      <div className="space-y-4">
        <div
          className={`p-4 border rounded-lg cursor-pointer flex items-center space-x-2 text-base font-semibold ${
            paymentMethod === "card"
              ? "border-gray-700 bg-white"
              : "border-gray-300"
          }`}
          onClick={() => setPaymentMethod("card")}
        >
          <Input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
            className="w-4 h-4"
          />
          <span>Card Payment</span>
        </div>

        <div
          className={`p-4 border rounded-lg cursor-pointer flex flex-col gap-2 ${
            paymentMethod === "momo"
              ? "border-gray-700 bg-white"
              : "border-gray-300"
          }`}
          onClick={() => setPaymentMethod("momo")}
        >
          <div className="flex items-center space-x-2 font-semibold">
            <Input
              type="radio"
              name="payment"
              value="momo"
              checked={paymentMethod === "momo"}
              onChange={() => setPaymentMethod("momo")}
              className="w-4 h-4"
            />
            <span>Mobile Payment</span>
          </div>
          {paymentMethod === "momo" && (
            <MomoPaymentForm register={register} errors={errors} />
          )}
        </div>
        <div className="mt-5 flex gap-5">
          <Button
            onClick={() => setCurrentStep("userInfo")}
            variant="secondary"
            className="w-full"
          >
            Back
          </Button>

          <Button
            type="submit"
            variant="default"
            className="w-full flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Complete payment"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PaymentPopup;
