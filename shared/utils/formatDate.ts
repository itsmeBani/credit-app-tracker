export const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();

    const isToday =
        now.toDateString() === date.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
        yesterday.toDateString() === date.toDateString();

    const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

    if (isToday) {
        return `Today  ${time}`;
    }

    if (isYesterday) {
        return `Yesterday ${time}`;
    }

    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
    });
};