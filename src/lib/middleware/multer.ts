import multer from "multer";
//import { createJestPreset } from "ts-jest";
import { randomUUID } from "crypto";
import mime from "mime";
//import retryTimes = jest.retryTimes;

export const generatePhotoFilename = (mimeType: string) => {
    const randomFilename = `${randomUUID()}-${Date.now()}`;
    const fileExtensions = mime.getExtension(mimeType);
    const filename = `${randomFilename}.${fileExtensions}`;

    return filename;
}


const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, callback) => {
        return callback(null, generatePhotoFilename(file.mimetype));
    }
});

const MAX_SIZE_IN_MEGABYTES = 6 * 1024 * 1024;

const VALID_MIME_TYPES = ["image/jpeg"];

const fileFilter: multer.Options["fileFilter"] = (req,file,callback) =>{
    if(VALID_MIME_TYPES.includes(file.mimetype)){
        callback(null, true);
    }else {
        callback(new Error("Error: The uploaded file must be a JPG"));
    }
}


export const multerOptions = {
    fileFilter,
    limits: {
        fileSize: MAX_SIZE_IN_MEGABYTES
    }
};

export const initMulterMiddleware = () => {
    return multer({storage, ...multerOptions});
}
