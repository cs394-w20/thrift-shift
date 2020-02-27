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
    productDb.on(
        "value",
        snapshot => {
            setProduct(snapshot.val());
        },
        error => alert(error)
    );
}

const getProductBidInfo = (productId, setBidIds) => {
    const productBidDb = db.ref(`/Products/${productId}/bid/`);
    productBidDb.on(
        "value",
        snapshot => {
            if(snapshot.val()) {
                let bidIds = Object.keys(snapshot.val());
                bidIds.pop();
                setBidIds(bidIds); 
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

const addBid = (userId, productId, product, bidAmount) => {
    const bidId = db.ref().child(`/Products/${productId}/bid/`).push().key;
    var updateProduct = {};
    updateProduct[`/Products/${productId}/bid/${bidId}`] = {
        buyerId: userId,
        price: bidAmount,
        time: Date.now()
    };

    var highestBidAmount = null;
    if (!product.bid || bidAmount > product.bid.highestBid) {
        highestBidAmount = bidAmount;
    } else {
        highestBidAmount = product.bid.highestBid;
    }
    console.log('new highest bid', highestBidAmount);

    updateProduct[`/Products/${productId}/bid/highestBid`] = highestBidAmount;
    db.ref().update(updateProduct);

    // const updateUser = {};
    // updateUser[`/Users/${usedId}/Products/` + productId] = true;
    // db.ref().update(updateUser);
    return productId
}

const getRole = (usedId, setUserRole) => {

    const productDb = db.ref("Users/"+usedId+"/role");
    productDb.once(
        "value",
        snapshot => {
            setUserRole(snapshot.val());
        },
        error => alert(error)
    );

}

const addRole = (usedId, role) => {
    const updateUser = {};
    updateUser[`/Users/${usedId}/role`] = role;
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



export {getUserProductsInfo, getProductInfo, addProduct, getAllProductInfo, addRole, getRole, addBid, getProductBidInfo, getBidInfo}