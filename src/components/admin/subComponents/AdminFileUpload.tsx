import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

interface AdminFileUploadInterface {
  images: any[];
  setImages: (i: any[]) => void;
  handleSubmit: () => void;
  uploadLoading: boolean;
}

const AdminFileUpload = ({
  images,
  setImages,
  handleSubmit,
  uploadLoading,
}: AdminFileUploadInterface) => {
  const onImgChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onImgChange}
      maxNumber={1}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div className="imgConUploadWrapper">
          <div
            className={`imgUploadCon ${isDragging ? `active` : ``}`}
            {...dragProps}
            onClick={onImageUpload}
          >
            <h3 className="uploadText">
              Click Area or drag and drop your image here!
            </h3>
          </div>
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <div className="imgWrapp">
                <img loading="lazy" src={image.dataURL} alt="" width={70} />
                <span className="imgName">{image?.file?.name}</span>
              </div>
              <div className="btnConn">
                <div className="rightt">
                  <div>
                    <button
                      className="replaceBtn"
                      onClick={() => onImageUpdate(index)}
                    >
                      Replace
                    </button>
                  </div>
                  <div>
                    <button
                      className="removeBtn"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="rightt">
                  <button
                    disabled={uploadLoading}
                    className="submitBtn"
                    onClick={() => handleSubmit()}
                  >
                    {uploadLoading ? `Uploading` : `Submit`}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
};

export default AdminFileUpload;
