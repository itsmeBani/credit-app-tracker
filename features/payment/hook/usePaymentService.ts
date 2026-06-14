import { useCallback, useState } from "react";

import { TCreatePayment } from "../types";
import {toast} from "sonner-native";
import {appToast} from "../../../shared/components/toast";
import { paymentService } from "../services/payment";

export function usePaymentService() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const processOutstandingBalance = useCallback(
        async (payload: TCreatePayment) => {
            if (!payload.creditId) return;

            setLoading(true);
            setError(null);

            const paymentResult =await paymentService.processOutstandingBalance(payload);

            if (paymentResult){
                appToast.success(`Paid ₱${payload.amount}` , "Payment successfully");
            }else {
                setError("Failed to process payment");
            }
            setLoading(false);

        },
        []
    );

    return {
        processOutstandingBalance,
        loading,
        error,
    };
}