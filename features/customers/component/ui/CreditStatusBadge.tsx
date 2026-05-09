import React from "react";
import { Text, View } from "react-native";
import {CreditStatus} from "../../../../local_database/types";


type CreditStatusBadgeProps = {
    status: CreditStatus;
    className?: string;
    textClassName?: string;
};

const STATUS_STYLES = {
    UNPAID: {
        label: "Unpaid",
        container: "bg-red-100 dark:bg-red-100/10",
        text: "text-red-600 dark:text-red-600",
    },
    PARTIAL: {
        label: "Partial",
        container: "bg-orange-200/60 dark:bg-orange-200/20",
        text: "text-amber-600",
    },
    PAID: {
        label: "Paid",
        container: "bg-green-100 dark:bg-green-100/20 ",
        text: "text-green-500",
    },
} satisfies Record<CreditStatus, {
    label: string;
    container: string;
    text: string;
}>;

export function CreditStatusBadge({
                                      status,
                                      className = "",
                                      textClassName = "",
                                  }: CreditStatusBadgeProps) {

    const styles = STATUS_STYLES[status];

    return (
        <View
            className={`
                px-3 py-1 rounded-full self-start
                ${styles.container}
                ${className}
            `}
        >
            <Text
                className={`
                    text-xs font-bold font-jakarta uppercase
                    ${styles.text}
                    ${textClassName}
                `}
            >
                {styles.label}
            </Text>
        </View>
    );
}