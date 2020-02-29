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

const getProductBidInfo = (productId, setProductBids) => {
    const productBidDb = db.ref(`/Products/${productId}/bid/`);
    productBidDb.on(
        "value",
        snapshot => {
            if(snapshot.val()) {
                setProductBids(snapshot.val());
            }
        },
        error => alert(error)
    );
}

const getBidInfo = (productId, bidId, setBid) => {
    const bidDb = db.ref(`/Products/${productId}/bid/${bidId}`)
    bidDb.on(
        "value",
        snapshot => {
            setBid(snapshot.val());
        },
        error => alert(error)
    );
}

const addProduct = (userId, product) =>{
    const productId = db.ref().child('Products').push().key;
    const updateProduct = {};
    const updateUser = {};
    updateProduct['/Products/' + productId] = product;
    updateUser[`/Users/${userId}/Products/` + productId] = true;
    db.ref().update(updateProduct);
    db.ref().update(updateUser);
    return productId
}

const addBid = (userId, productId, product, bidAmount) => {
    const bidId = db.ref().child(`/Products/${productId}/bid/`).push().key;
    var updateProduct = {};
    updateProduct[`/Products/${productId}/bid/${bidId}`] = {
        buyerId: userId,
        price: Number(bidAmount),
        time: Date.now()
    };

    var highestBidAmount = 0;
    if (!product.bid || Number(bidAmount) > product.bid.highestBid) {
        highestBidAmount = Number(bidAmount);
    } else {
        highestBidAmount = product.bid.highestBid;
    }

    updateProduct[`/Products/${productId}/bid/highestBid`] = highestBidAmount;
    db.ref().update(updateProduct);

    // const updateUser = {};
    // updateUser[`/Users/${userId}/Products/` + productId] = true;
    // db.ref().update(updateUser);
    return productId
}

const getRole = (userId, setUserRole) => {

    const productDb = db.ref("Users/"+userId+"/role");
    productDb.once(
        "value",
        snapshot => {
            setUserRole(snapshot.val());
        },
        error => alert(error)
    );
}

const addRole = (userId, role) => {
    const updateUser = {};
    updateUser[`/Users/${userId}/role`] = role;
    db.ref().update(updateUser);
}

const getAllProductInfo = (setAllProductId) => {
    const getProductInfo = snapshot => {
        if (snapshot.val()) {
          let allproductIdArr = Object.keys(snapshot.val());
          setAllProductId(allproductIdArr);
        }
    }

    const ProductDb = db.ref("Products");
    ProductDb.on("value", getProductInfo, error => alert(error));
}

const addUserInfo = (user) => {
    var name = user.displayName;
    var email = user.email;
    var userId = user.uid;
    const updateUserInfo = {};
    updateUserInfo[`/Users/${userId}/name`] = name;
    updateUserInfo[`/Users/${userId}/email`] = email;
    db.ref().update(updateUserInfo);
}

const getBuyerInfo = (bid, setBuyerName, setBuyerEmail) => {
    var buyerId = bid.buyerId;
    const userDb = db.ref(`Users/${buyerId}`);
    userDb.on(
                    "value",
                    snapshot => {
                        if(snapshot.val()) {
                            setBuyerName(snapshot.val().name);
                            setBuyerEmail(snapshot.val().email);
                        }
                    },
                    error => alert(error));
}

export {getUserProductsInfo, getProductInfo, addProduct, getAllProductInfo, addRole, getRole, addBid, getProductBidInfo, getBidInfo, addUserInfo, getBuyerInfo }
