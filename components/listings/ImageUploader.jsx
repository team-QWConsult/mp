import React, { useState, useEffect, useRef } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import Sortable from "sortablejs";
import {
  Upload as IconImageAdd,
  Trash as IconTrash,
  Edit3 as IconEdit,
} from "react-feather"; // Assuming these are your custom icons and button components

const ImageUploader = ({ initialImages = [], maxFiles = 20, form, field }) => {
  const [images, setImages] = useState(field.value);
  const [pendingImages, setPendingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [croppingImage, setCroppingImage] = useState(null);
  const [croppingImageIndex, setCroppingImageIndex] = useState(null);
  const cropperRef = useRef(null);
  const shImagesRef = useRef(null);

  const cloudName = "geoffokumustudio";
  const uploadPreset = "jv-land";

  useEffect(() => {
    if (shImagesRef.current && images.length > 0) {
      Sortable.create(shImagesRef.current, {
        onEnd: (event) => {
          let tempArr = Array.from(event.from.children).map(
            (child) => child.dataset.id
          );
          setImages(tempArr);
        },
      });
    }
  }, [images]);

  const selectFile = (event) => {
    if (event.target.files.length < 1) {
      return;
    }

    if (images.length + event.target.files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images.`);
      return;
    }

    Array.from(event.target.files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (!pendingImages.includes(reader.result)) {
          setPendingImages([...pendingImages, reader.result]);
        }
      };
    });
  };

  const openCropperByIndex = (index) => {
    openCropper(pendingImages[index], index);
  };

  const openCropper = (imageSrc, index) => {
    setCroppingImage(imageSrc);
    setCroppingImageIndex(index);
    setTimeout(() => {
      const imageElement = document.getElementById("croppingImage");
      cropperRef.current = new Cropper(imageElement, {
        aspectRatio: 7 / 6,
        viewMode: 1,
      });
    }, 1000);
  };

  const closeCropper = () => {
    if (cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = null;
    }
    setCroppingImage(null);
    setCroppingImageIndex(null);
  };

  const cropImage = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCroppedCanvas();
      const croppedImage = canvas.toDataURL("image/jpeg");
      setPendingImages(
        pendingImages.map((img, idx) =>
          idx === croppingImageIndex ? croppedImage : img
        )
      );
      closeCropper();
    }
  };

  const uploadToCloudinary = async (base64Image) => {
    const formData = new FormData();
    formData.append("file", base64Image);
    formData.append("upload_preset", uploadPreset);

    const transformation = { width: 1400, format: "jpg" };
    const transformationString = Object.keys(transformation)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            transformation[key]
          )}`
      )
      .join("&");

    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const response = await fetch(apiUrl, { method: "POST", body: formData });
    return await response.json();
  };

  const uploadAllImages = async () => {
    setLoading(true);
    for (let i = 0; i < pendingImages.length; i++) {
      const cloudinaryResponse = await uploadToCloudinary(pendingImages[i]);
      setImages([
        ...images,
        {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.url,
          secure_url: cloudinaryResponse.secure_url,
        },
      ]);

      form.setFieldValue(field.name, [
        ...field.value,
        {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.url,
          secure_url: cloudinaryResponse.secure_url,
        },
      ]);
    }
    setLoading(false);
    setPendingImages([]);
  };

  return (
    <div className="w-full grid gap-4 mt-2 mb-4">
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 text-white">
          Uploading Images ...
        </div>
      )}
      <div
        className={`flex justify-center items-center border-2 border-gray-300 dark:border-dark-line border-dashed rounded-md h-48 overflow-y-hidden ${
          images.length > 0 && "border-orange-500 dark:border-pink-500"
        }`}
      >
        <div className="space-y-1 text-center px-6 pt-5 pb-6 w-full">
          <IconImageAdd className="mx-auto h-12 w-12 text-gray-400" />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <label
              className="relative cursor-pointer bg-transparent rounded-md font-medium text-orange-500 dark:text-pink-500"
              htmlFor="post_image"
            >
              <p className="text-gray-500 dark:text-white space-y-1 text-center">
                <span className="text-orange-500 dark:text-primary text-center block">
                  Upload Images
                </span>
                <span className="block text-xs text-gray-500">
                  PNG, JPG, JPEG; Max {maxFiles} Images
                </span>
              </p>
            </label>
          </div>
        </div>
        <input
          className="sr-only"
          id="post_image"
          name="post_image"
          type="file"
          multiple
          onChange={selectFile}
        />
      </div>
      <div className="block" id="sh-images" ref={shImagesRef}>
        {images.length > 0 &&
          images.map((image, index) => (
            <div
              key={image.url}
              data-id={image.url}
              className="image-item group relative h-[160px] inline-block w-[30%] p-1 object-cover rounded"
            >
              <div className="absolute top-3 right-3 tracking-wider">
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((img) => img !== image))
                  }
                  className="h-8 w-8 rounded-full bg-white border flex items-center justify-center"
                >
                  <IconTrash className="h-4 w-auto text-red-600" />
                </button>
              </div>
              <img
                src={image.secure_url}
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
      </div>
      {pendingImages.length > 0 && (
        <div
          className="fixed inset-0 bg-white z-[1000] flex flex-col"
          aria-hidden="true"
        >
          <div className="px-4 h-[80px] border-b flex justify-between items-center w-full max-w-7xl mx-auto">
            <h3 className="text-lg">Upload Images</h3>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="bg-primary hover:bg-black"
                onClick={uploadAllImages}
              >
                Upload All
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600"
                onClick={() => setPendingImages([])}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="h-[calc(100vh-80px)] overflow-y-auto w-full bg-gray-200">
            <div className="p-6 grid grid-cols-4 gap-4 w-full max-w-6xl mx-auto">
              {pendingImages.map((image, index) => (
                <div
                  key={image}
                  data-id={image}
                  className="group relative h-[240px] block p-1 object-cover rounded"
                >
                  <div className="absolute top-3 right-3 text-white tracking-wider">
                    <button
                      type="button"
                      onClick={() => openCropperByIndex(index)}
                      className="h-8 w-8 rounded-full bg-white border flex mb-2 items-center justify-center"
                    >
                      <IconEdit className="h-4 w-auto text-blue-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPendingImages(
                          pendingImages.filter((img) => img !== image)
                        )
                      }
                      className="h-8 w-8 rounded-full bg-white border flex items-center justify-center"
                    >
                      <IconTrash className="h-4 w-auto text-red-600" />
                    </button>
                  </div>
                  <img
                    src={image.url}
                    alt=""
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
          {croppingImage && (
            <div className="fixed inset-0 bg-black/20 z-[100] flex items-center justify-center">
              <div className="w-full md:w-3/4 h-[450px] bg-white rounded-md">
                <div className="w-full">
                  <div className="p-4 flex w-full justify-between items-center">
                    <h5 className="modal-title">Crop Image</h5>
                    <button
                      type="button"
                      onClick={closeCropper}
                      className="text-xl"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body h-[300px] cropper-bg">
                    <img
                      id="croppingImage"
                      src={croppingImage}
                      style={{
                        maxWidth: "100%",
                        height: "100%",
                        width: "auto",
                        margin: "0 auto",
                      }}
                    />
                  </div>
                  <div className="p-4 flex gap-4">
                    <button
                      type="button"
                      className="bg-primary hover:bg-black"
                      onClick={cropImage}
                    >
                      Crop Image
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-600"
                      onClick={closeCropper}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
