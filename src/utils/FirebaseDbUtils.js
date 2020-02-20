import firebase from "firebase"
import 'firebase/database';

const db = firebase.database();

const getUserProductsInfo = (userId, setProductIds) => {
    console.log(userId)
    const getProductInfo = snapshot => {
        if (snapshot.val()) {
          let productIdArr = Object.keys(snapshot.val());
          setProductIds(productIdArr);
        }
    };

    const userProductDb = db.ref(`Users/${userId}/Products`);
    userProductDb.on("value", getProductInfo, error => alert(error));
}

const getProductInfo = (productId, setProduct) => {
    const productDb = db.ref("Products/" + productId);
    productDb.once(
        "value",
        snapshot => {
            setProduct(snapshot.val());
        },
        error => alert(error)
    );
}

const addProduct = (usedId, product) =>{
    const productId = db.ref().child('Products').push().key;
    const updateProduct = {};
    const updateUser = {};
    updateProduct['/Products/' + productId] = product;
    updateUser[`/Users/${usedId}/Products/` + productId] = true;
    db.ref().update(updateProduct);
    db.ref().update(updateUser);
    return productId
}

export {getUserProductsInfo, getProductInfo, addProduct}