export const isUploadedUrl = (uri?: string): boolean => {
    if (!uri) return false;

    return uri.startsWith("http://") || uri.startsWith("https://");
};