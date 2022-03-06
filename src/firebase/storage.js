import { storage } from "../configs/firebase";
import { ref, uploadBytesResumable, deleteObject } from "firebase/storage";

export const uploadImg = (file, fileName) => {
    const sotrageRef = ref(storage, `${fileName}`);
    return uploadBytesResumable(sotrageRef, file);
};

export const deleteImg = async (fileName) => {
    return await deleteObject(ref(storage, fileName));
};
