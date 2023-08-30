import React, {useState} from "react";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";


const ImageUpload = ({ imageUpload, setImageUpload, setIsImageCountInvalid, isImageCountInvalid }) => {
    
    const [isFileTypeInvalid, setIsFileTypeInvalid] = useState(false);

    const onDrop = (acceptedFiles) => {
        const imageFiles = acceptedFiles.filter((file) => file.type.startsWith("image/"));
        const otherFiles = acceptedFiles.filter((file) => !file.type.startsWith("image/"));
        if (otherFiles.length > 0) {
            setIsFileTypeInvalid(true); 
            return;
          } else {
            setIsFileTypeInvalid(false); 
          }
        const newFiles = [...imageUpload, ...imageFiles];
        for (let i = 0; i < newFiles.length; i++) {
            const file = newFiles[i];
            if (i == 6) {
                return;
            }
            console.log("Nom du fichier:", file.name);
            console.log("Type du fichier:", file.type);
            console.log("Taille du fichier:", file.size);
            console.log("Objet du fichier:", file);
        }
        setImageUpload(newFiles);
    };

    const removeFile = (fileName) => {
        const updatedFiles = imageUpload.filter((file) => file.name !== fileName);
        setImageUpload(updatedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            <div className="w-full mt-10">
                <div {...getRootProps()}>
                    <input {...getInputProps()} multiple />
                    {isDragActive ? (
                        <p className="h-16 bg-gray-200 p-2 rounded">
                            Veuillez déposez les fichiers ici...
                        </p>
                    ) : (
                        <p className="italic cursor-pointer bg-gray-200 p-2 rounded">
                            Veuillez glissez-déposez des fichiers ici ou cliquez pour les sélectionner.
                        </p>
                    )}

                    {isImageCountInvalid && imageUpload.length === 0 && (
                        <div className="text-red-500 w-96">
                            Veuillez sélectionner entre 2 et 6 images.
                        </div>
                    )}
                    {isImageCountInvalid && imageUpload.length === 1 && (
                        <div className="text-red-500 w-96">
                            Veuillez sélectionner au moins 1 image supplémentaires.
                        </div>
                    )}
                    {isFileTypeInvalid && (
          <div className="text-red-500 w-96">Veuillez sélectionner uniquement des images.</div>
        )}
                </div>

                {imageUpload.length > 0 && (
                    <div>
                        {imageUpload.map((file) => (
                            <div key={file.name}>
                                <div className="flex justify-between">
                                    <div className="w-80">
                                        <span className="font-bold">{file.name}</span>
                                    </div>
                                    <button onClick={() => removeFile(file.name)}>
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default ImageUpload;
