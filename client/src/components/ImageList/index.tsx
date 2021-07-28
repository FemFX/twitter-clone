import { IImageObj } from "../AddTweetForm";
import { useStyles } from "../../pages/Home";

interface IImageListProps {
  classes: ReturnType<typeof useStyles>;
  images: IImageObj[];
}

const ImageList: React.FC<IImageListProps> = ({
  classes,
  images,
}: IImageListProps): React.ReactElement | null => {
  if (!images.length) {
    return null;
  }
  return (
    <div className={classes.imagesList}>
      {images.map((obj) => (
          <div
            key={obj.blobUrl}
            className={classes.imagesListItem}
            style={{ backgroundImage: `url(${obj})` }}
          ></div>
      ))}
    </div>
  );
};

export default ImageList;
