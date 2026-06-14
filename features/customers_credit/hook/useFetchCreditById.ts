import { useEffect, useState } from "react";
import { creditRepository } from "../data/credits.repository";
import ModelCredit from "../../../local_database/model/model.credits";
import {appToast} from "../../../shared/components/toast";

export const useFetchCreditById = (id: string) => {
    const [credit, setCredit] = useState<ModelCredit | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCredit = async () => {
        if (!id) return;

        setLoading(true);
        setError(null);

        try {
            const result = await creditRepository.getCreditById(id);
            setCredit(result);
        } catch (e: any) {

            setError(e?.message ?? "Failed to fetch credit");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCredit();
    }, [id]);

    return {
        credit,
        loading,
        error,
        refetch: fetchCredit,
    };
};