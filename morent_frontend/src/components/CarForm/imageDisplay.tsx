import { Dispatch, SetStateAction } from 'react';

import { close } from '../../assets/icons';

type ImageDisplayProps = {
  existImages: Array<{ url: string; file: File }> | [];
  setExistImages: Dispatch<SetStateAction<{ url: string; file: File }>>;
  selectedImages: Array<{ url: string; file: File }> | [];
  setSelectedImages: Dispatch<SetStateAction<{ url: string; file: File }>>;
  images: Array<File> | [];
  setImages: Dispatch<SetStateAction<Array<File>>>;
};

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  existImages,
  setExistImages,
  selectedImages,
  setSelectedImages,
  images,
  setImages,
}) => {
  const displayImages =
    selectedImages.length > 0 ? selectedImages : existImages;

  return (
    <div className='flex gap-3 mb-3'>
      {displayImages.map((image, i) => (
        <div key={i} className='relative '>
          <img
            src={image.url}
            alt='user images'
            className='w-24 h-24 rounded-md'
          />
          <button
            className='absolute top-[-5px] right-[-5px] border-white-200  border-2 rounded-full bg-white-100'
            onClick={() => {
              setExistImages(existImages.filter((e) => e.url !== image.url));
              setSelectedImages(
                selectedImages.filter((e) => e.url !== image.url),
              );
              selectedImages.length > 0 &&
                setImages(images.filter((e) => e.name !== image.file[0].name));
            }}
          >
            <img src={close} alt='delete image icon' className='p-[2px]' />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;
