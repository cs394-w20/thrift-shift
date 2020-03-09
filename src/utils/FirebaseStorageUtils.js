import firebase from "firebase/app";
import "firebase/storage";
import EXIF from 'exif-js'

const st = firebase.storage();

const getProductImage = (image_id, setImageURL) => {
  // Get image reference
  const imageRef = firebase.storage().ref(`product_images/${image_id}`);
  // Get the download URL
  imageRef
    .getDownloadURL()
    .then(function (url) {
      setImageURL(url);
    })
    .catch(function (error) {
      console.log("error", error);
    });
};

const uploadProductImage = (image, productId, setProgress, handleClose, addProduct) => {
  const uploadTask = st.ref().child(`product_images/${productId}`).put(image);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      handleClose();
      addProduct();
    }
  );
}

const uploadLQImage = (image, productId, setProgress, handleClose, addProduct) => {
  let reader = new FileReader()
  let img = new Image();
  let rotImg = new Image();

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  reader.readAsDataURL(image);

  reader.onload = e => {
    img.src = e.target.result;
  };

  img.onload = () => {
    rotImg.src = rotateImage(img).src
  };

  rotImg.onload = () => {
    console.log(rotImg)
    var originWidth = rotImg.width;
    var originHeight = rotImg.height;
    var maxWidth = 600, maxHeight = 600;
    var targetWidth = originWidth, targetHeight = originHeight;
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    context.clearRect(0, 0, targetWidth, targetHeight);
    context.drawImage(rotImg, 0, 0, targetWidth, targetHeight);
    canvas.toBlob(blob => {
      uploadProductImage(blob, productId, setProgress, handleClose, addProduct);
    })
  }
}

function rotateImage(image) {
  var width = image.width;
  var height = image.height;
  var canvas = document.createElement("canvas")
  var ctx = canvas.getContext('2d');
  var newImage = new Image();

  //Image rotation
  EXIF.getData(image, function () {
    var orientation = EXIF.getTag(this, 'Orientation');
    console.log('orientation:' + orientation);
    switch (orientation) {
      // No rotation
      case 1:
        console.log('0°');
        newImage = image;
        break;
      // 90
      case 6:
        console.log('90°');
        canvas.height = width;
        canvas.width = height;
        ctx.rotate(Math.PI / 2);
        ctx.translate(0, -height);
        ctx.drawImage(image, 0, 0)
        newImage.src = canvas.toDataURL('Image/jpeg', 1)
        break;
      // 180
      case 3:
        console.log('180°');
        canvas.height = height;
        canvas.width = width;
        ctx.rotate(Math.PI);
        ctx.translate(-width, -height);
        ctx.drawImage(image, 0, 0)
        newImage.src = canvas.toDataURL('Image/jpeg', 1)
        break;
      // 270
      case 8:
        console.log('270°');
        canvas.height = width;
        canvas.width = height;
        ctx.rotate(-Math.PI / 2);
        ctx.translate(-height, 0);

        ctx.drawImage(image, 0, 0)
        newImage.src = canvas.toDataURL('Image/jpeg', 1)
        break;
      case undefined:
        console.log('undefined');
        newImage = image;
        break;
    }
  }
  );
  return newImage;
}

export { getProductImage, uploadProductImage, uploadLQImage }
