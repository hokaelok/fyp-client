import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Loader2, Pencil } from 'lucide-react';
import fileAPI from '@/api/common/fileAPI';

const ImageUpload = ({ previewUrl, setValue, setValueKey }) => {
  const [preview, setPreview] = useState(previewUrl);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setUploading(true);

      try {
        const response = await fileAPI.uploadFile('profile', file);
        setValue(setValueKey, response.url);
        setPreview(response.url);
      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="relative w-full h-full">
      {uploading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <img src={preview} className="object-cover w-full h-full" />
      )}
      <Input
        type="file"
        id="imageUpload"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
      <Label
        htmlFor="imageUpload"
        className="absolute bottom-0 right-0 bg-white rounded-full p-2 border border-gray-300 cursor-pointer"
      >
        <Pencil className="w-3 h-3 text-gray-800" />
      </Label>
    </div>
  );
};

export default ImageUpload;
