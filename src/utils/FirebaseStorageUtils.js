import firebase from "firebase/app";
import "firebase/storage";

const st = firebase.storage();

const getProductImage = (image_id, setImageURL) => {
  // Get image reference
  const imageRef = firebase.storage().ref(`${image_id}.jpg`);

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

const uploadProductImage = (image, productId, setProgress, setOpen, addProduct) => {
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
      setOpen(false)
      addProduct()
    }
  );
}

const uploadLQImage = (image, productId, setProgress, setOpen, addProduct) => {
  let reader = new FileReader()
  let img = new Image();

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  reader.readAsDataURL(image);

  reader.onload = e => {
    img.src = e.target.result;
  };

  img.onload = () => {
    console.log(img.width)
    var originWidth = img.width;
    var originHeight = img.height;
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
    context.drawImage(img, 0, 0, targetWidth, targetHeight);
    canvas.toBlob(blob => {
      uploadProductImage(blob, productId, setProgress, setOpen, addProduct)
    })
  };
}

export { getProductImage, uploadProductImage, uploadLQImage }