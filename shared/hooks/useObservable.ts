import { Observable } from "@nozbe/watermelondb/utils/rx";
import { useEffect, useState } from "react";

export default function useObservable<T>(
    observable?: Observable<T>
): T | undefined {
    const [value, setValue] = useState<T | undefined>(undefined);

    useEffect(() => {
        if (!observable?.subscribe) return;

        const subscription = observable.subscribe(setValue);

        return () => subscription.unsubscribe();
    }, [observable]);

    return value;
}