import firebase from "firebase/app";
import "firebase/storage";

const st = firebase.storage();

const getProductImage = (image_id, setImageURL) => {
    // Get image reference
    const imageRef = firebase.storage().ref(`${image_id}.jpg`);
  
    // Get the download URL
    imageRef
      .getDownloadURL()
      .then(function(url) {
        setImageURL(url);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  };

const uploadProductImage = (image, productId, setProgress) => {
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
    }
);
}

export { getProductImage, uploadProductImage }