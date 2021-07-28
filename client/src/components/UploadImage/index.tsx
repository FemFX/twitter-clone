import { useRef, useEffect,  useCallback } from "react";
import { IconButton } from "@material-ui/core";
import { Image, RemoveCircle } from "@material-ui/icons";
import { IImageObj } from "../AddTweetForm";
import { useStyles } from "../../pages/Home";

interface IUploadImagesProps {
  classes: ReturnType<typeof useStyles>;
  images: IImageObj[];
  onChangeImages: (callback: (prev: IImageObj[]) => IImageObj[]) => void;
}

const UploadImage: React.FC<IUploadImagesProps> = ({
  classes,
  images,
  onChangeImages,
}: IUploadImagesProps): React.ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleChangeFile = useCallback((e: any) => {
    if (e.target) {
      const file = e.target.files[0];
      if (file) {
        const fileObj = new Blob([file]);
        onChangeImages((prev) => [
          ...prev,
          {
            blobUrl: URL.createObjectURL(fileObj),
            file,
          },
        ]);
      }
    }
  }, []);

  const handleRemoveImage = (url: string) => {
    onChangeImages((prev) => prev.filter((obj) => obj.blobUrl !== url));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("change", handleChangeFile);
    }
  }, []);
  return (
    <>
      <IconButton color="primary" onClick={handleClick}>
        <Image style={{ fontSize: 26 }} />{" "}
      </IconButton>
      <input ref={inputRef} type="file" hidden />
      <div className={classes.imagesList}>
        {images.map((obj) => (
          <div
            key={obj.blobUrl}
            className={classes.imagesListItem}
            style={{ backgroundImage: `url(${obj.blobUrl})` }}
          >
            <IconButton onClick={() => handleRemoveImage(obj.blobUrl)}>
              <RemoveCircle style={{ opacity: 0.6 }} />
            </IconButton>
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadImage;
