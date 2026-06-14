import { useCallback, useEffect, useState } from 'react'
import {paymentRepository} from "../data/payment.repository";
import ModelPayment from "../../../local_database/model/model.payments";

type UsePaymentsByCreditIdReturn = {
    payments: ModelPayment[]
    loading: boolean
    error: string | null
    refetch: () => Promise<void>
}

export function usePaymentsByCreditId(
    creditId: string
): UsePaymentsByCreditIdReturn {
    const [payments, setPayments] = useState<ModelPayment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchPayments= async () => {
        if (!creditId) return

        try {
            setLoading(true)
            setError(null)

            const result =
                await paymentRepository.getPaymentsByCreditId(
                    creditId
                )

            setPayments(result)
        } catch (err) {
            console.error(err)
            setError('Failed to load payments')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPayments().then()
    }, [])

    return {
        payments,
        loading,
        error,
        refetch: fetchPayments,
    }
}