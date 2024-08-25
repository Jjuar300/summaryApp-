import "./styles/images.css";
import { useDispatch, useSelector } from "react-redux";
import { setFileName, setImageClick } from "../../Redux/imageContainer";
import {IKImage} from 'imagekitio-react'; 
import LazyLoad from "react-lazyload";

export default function Images() {
  const URLENDPOINT = import.meta.env.IMAGEKIT_URL_KEY; 
  const isTranslate = useSelector((state) => state.imageContainer.isImageClick);
  const dispatch = useDispatch();
  const publicKey = import.meta.env.IMAGEKIT_PLUBLIC_KEY;

const images = [
    'azy.jpg', 
    'tower.jpg', 
    'flower.jpg', 
    'outwinter.jpg', 
    'triku.jpg', 
  ]

  const handleClick = (imageName) => {
    dispatch(setFileName(imageName));
    if (imageName) return dispatch(setImageClick(!isTranslate));
  };

  return (
  <div>

      <div className="imagetitle">Images</div>
 <div className={"images"}>
        {images.map((image, index) => (
       
        <LazyLoad
        key={index}
        >
            <IKImage
          onClick={() => handleClick(image)}
          className="darkimage"
          loading="lazy"
          role="presentation"
          decoding="async"
          key={index}
          publicKey={publicKey}
          urlEndpoint={'https://ik.imagekit.io/4pwok1cjp/'}
          path={`${image}`}
          />
        </LazyLoad>
       
       ))}

        <button className="upload">UPLOAD</button>
      </div>

  </div>
  );
}
