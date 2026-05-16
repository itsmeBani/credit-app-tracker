import {useState} from "react";
import {Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {ImagePickerAsset} from "expo-image-picker";
import {Directory, File as ExpoFile, Paths} from "expo-file-system";

export function useImageManager() {
    const [image, setImage] = useState<ImagePickerAsset | null>(null);
    const [loading, setLoading] = useState(false);

    const requestPermission = async () => {
        const gallery =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        const camera =
            await ImagePicker.requestCameraPermissionsAsync();

        if (
            gallery.status !== "granted" ||
            camera.status !== "granted"
        ) {
            Alert.alert(
                "Permission required",
                "Camera and Gallery permissions are needed."
            );
            return false;
        }

        return true;
    };

    const pickImage = async () => {
        const isGranted = await requestPermission();
        if (!isGranted) return;

        try {
            setLoading(true);

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "images",
                allowsEditing: true,
                quality: 1,
                aspect:[1,1]
            });

            if (!result.canceled) {
                setImage(result.assets[0]);
                return result.assets[0].uri
            }
        } finally {
            setLoading(false);
        }
    };

    const takePhoto = async () => {
        const isGranted = await requestPermission();
        if (!isGranted) return;

        try {
            setLoading(true);

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 1,
                aspect:[1,1]
            });

            if (!result.canceled) {
                setImage(result.assets[0]);
            }
        } finally {
            setLoading(false);
        }
    };






    const clearImage = () => setImage(null);

     const getAllUploadFiles = () => {
        // 1. Reference the directory
        const uploadDir = new Directory(Paths.document, "uploads");

        // 2. If it doesn't exist → return empty
        if (!uploadDir.exists) {
            return [];
        }

        // 3. List all items
        const items = uploadDir.list();

        // 4. Filter only files (ignore subfolders)
        const files = items.filter((item) => item instanceof ExpoFile);

        // 5. Return useful data
        return files.map((file) => ({
            name: file.name,
            uri: file.uri,
        }));
    };
    return {
        image,
        loading,
        getAllUploadFiles,
        pickImage,
        takePhoto,
        clearImage,
    };
}