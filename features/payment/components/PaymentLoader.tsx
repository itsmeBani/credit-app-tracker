import { View, StyleSheet } from "react-native";
import {SafeAreaContainer} from "../../../shared/components/SafeLayoutContainer";
import {SafeAreaView} from "react-native-safe-area-context";

export function PaymentLoader() {
    return (
        <SafeAreaView style={styles.container}>

            {/* Balance */}
            <View style={styles.center}>
                <View style={styles.smallBadge} />
                <View style={styles.balanceBox} />
            </View>

            {/* Payment Type */}
            <View style={styles.section}>
                <View style={styles.label} />
                <View style={styles.input} />
            </View>

            {/* Partial Amount */}
            <View style={styles.section}>
                <View style={styles.label} />
                <View style={styles.input} />
            </View>

            {/* Note */}
            <View style={styles.section}>
                <View style={styles.labelSmall} />
                <View style={styles.textarea} />
            </View>

            {/* Button */}
            <View style={styles.button} />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
        gap: 24,
    },

    center: {
        alignItems: "center",
        gap: 12,
    },

    section: {
        gap: 8,
    },

    // Balance
    smallBadge: {
        width: 80,
        height: 24,
        borderRadius: 999,
        backgroundColor: "#e5e7eb",
    },

    balanceBox: {
        width: 200,
        height: 56,
        borderRadius: 12,
        backgroundColor: "#e5e7eb",
    },

    // Labels
    label: {
        width: 110,
        height: 16,
        borderRadius: 6,
        backgroundColor: "#e5e7eb",
    },

    labelSmall: {
        width: 60,
        height: 16,
        borderRadius: 6,
        backgroundColor: "#e5e7eb",
    },

    // Inputs
    input: {
        width: "100%",
        height: 48,
        borderRadius: 10,
        backgroundColor: "#e5e7eb",
    },

    textarea: {
        width: "100%",
        height: 96,
        borderRadius: 10,
        backgroundColor: "#e5e7eb",
    },

    // Button
    button: {
        width: "100%",
        height: 56,
        borderRadius: 12,
        backgroundColor: "#e5e7eb",
    },
});