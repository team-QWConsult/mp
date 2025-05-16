import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import Dropzone from "react-dropzone-uploader";

import { Download, Trash } from "react-feather";

const ImagesUpload = ({ form, field }) => {
  const [uploadSignature, setUploadSignature] = useState("");
  const [timestamp, setTimestamp] = useState("");

  // fetch upload signature
  useEffect(() => {
    let shouldFetch = true;

    fetch("/api/images/upload-signature")
      .then((res) => res.json())
      .then((data) => {
        if (shouldFetch) {
          setUploadSignature(data.signature);
          setTimestamp(data.timestamp);
        }
      });

    return () => (shouldFetch = false);
  }, []);

  // upload details
  const getUploadParams = () => {
    return {
      fields: {
        timestamp: timestamp,
        signature: uploadSignature,
        upload_preset: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      },
      url: process.env.NEXT_PUBLIC_UPLOAD_URL,
    };
  };

  const handleChangeStatus = ({ meta, xhr }, status) => {
    if (status === "done") {
      const res = JSON.parse(xhr.response);

      return {
        meta: {
          public_id: res.public_id,
          url: res.secure_url,
          width: res.width,
          height: res.height,
        },
      };
    }
  };

  const handleSubmit = (files, allFiles) => {
    let filesToSave = files.map((f) => ({
      public_id: f.meta.public_id,
      url: f.meta.url,
      width: f.meta.width,
      height: f.meta.height,
    }));

    form.setFieldValue(field.name, [...field.value, ...filesToSave]);

    files.forEach((f) => f.remove());
  };

  const handleDeleteImg = (publicID) => {
    let newImagesState = [
      ...field.value.filter((i) => i.public_id !== publicID),
    ];

    return form.setFieldValue(field.name, newImagesState);
  };

  return (
    <>
      <div>
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          accept="image/*"
          maxFiles={14}
          inputContent="Drag images here or click to upload."
          classNames={{
            dropzone: "img-upload__dragger",
            submitButtonContainer: "img-upload__btn",
          }}
          styles={{
            preview: { padding: 10 },
            inputLabelWithFiles: {
              marginLeft: 16,
              marginRight: 16,
            },
          }}
        />
      </div>
      <div className="img-upload__preview">
        <ReactSortable
          list={field.value.map((i) => ({ ...i, id: i.public_id }))}
          setList={(newList) => {
            let newValue = newList.map(({ public_id, url, width, height }) => ({
              public_id,
              url,
              width,
              height,
            }));

            form.setFieldValue(field.name, newValue);
          }}
        >
          {field.value.map((i) => (
            <div key={i.url} className="img-upload__item">
              <img src={i.url} alt="thumbnail" />
              <div className="img-upload__item-actions">
                <Trash onClick={() => handleDeleteImg(i.public_id)} />
                <a href={i.url} target="_blank" rel="noopener noreferrer">
                  <Download />
                </a>
              </div>
            </div>
          ))}
        </ReactSortable>
      </div>
    </>
  );
};

export default ImagesUpload;
