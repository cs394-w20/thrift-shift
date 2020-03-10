import firebase from "firebase"
import 'firebase/database';
import { version } from "react";

const db = firebase.database();

const getUserInfo = (userId, setUserInfo) => {
    const userDb = db.ref(`/Users/${userId}`)
    userDb.on(
        "value",
        snapshot => {
            if (snapshot.val()) {
                setUserInfo(snapshot.val())
            }
        }
    )
}

const getUserProductsInfo = (userId, setProductIds) => {
    const getProductInfo = snapshot => {
        if (snapshot.val()) {
            let productIdArr = Object.keys(snapshot.val());
            setProductIds(productIdArr);
        }
    };

    const userProductDb = db.ref(`Users/${userId}/Products`);
    userProductDb.on("value", getProductInfo, error => alert(error));
}

const getBuyerBid = (userId, setBids) => {
    const productDb = db.ref(`Users/${userId}/buyerBid`);
    productDb.on(
        "value",
        snapshot => {
            if (snapshot.val()) {
                setBids(snapshot.val())
            }
        },
        error => alert(error)
    )
}

const getProductInfo = (productId, setProduct) => {
    const productDb = db.ref("Products/" + productId);
    productDb.on(
        "value",
        snapshot => {
            if (snapshot.val()) {
                setProduct(snapshot.val());
            }
        },
        error => alert(error)
    );
}

const getProductBidInfo = (productId, setProductBids) => {
    const productBidDb = db.ref(`/Products/${productId}/bid/`);
    productBidDb.on(
        "value",
        snapshot => {
            if (snapshot.val()) {
                setProductBids(snapshot.val());
            }
        },
        error => alert(error)
    );
}

const getBidInfo = (bidId, setBid) => {
    const bidDb = db.ref(`/bid/${bidId}`)
    bidDb.once(
        "value",
        snapshot1 => {
            const buyerDb = db.ref(`/Users/${snapshot1.val().buyerId}`)
            buyerDb.once(
                "value",
                snapshot2 => {
                    setBid({
                        ...snapshot1.val(),
                        buyerName: snapshot2.val().name,
                        buyerEmail: snapshot2.val().email,
                        buyerAddress: snapshot2.val().address
                    })
                }
            )
        },
        error => alert(error)
    )
}

const getBidInfoWithProduct = (bidId, setBid) => {
    const bidDb = db.ref(`/bid/${bidId}`)
    bidDb.on(
        "value",
        snapshot1 => {
            const productDb = db.ref(`/Products/${snapshot1.val().productId}`)
            productDb.once(
                "value",
                snapshot2 => {
                    setBid({
                        ...snapshot1.val(),
                        product: snapshot2.val()
                    })
                }
            )
        },
        error => alert(error)
    )
}

const addProduct = (userId, product) => {
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
    // Id under bid
    const bidId = db.ref().child('/bid').push().key;
    // Id under product
    const productBidId = db.ref().child(`/Products/${productId}/bid/`).push().key;
    // Id under buyer
    const buyerBidId = db.ref().child(`/Users/${userId}/bid/`).push().key;

    var updateProduct = {};

    updateProduct[`/bid/${bidId}`] = {
        buyerId: userId,
        productId: productId,
        price: Number(bidAmount),
        time: Date.now(),
        // Unread: Seller haven't view the bid
        // Read: Seller viewed the bid but no further actions
        // Accepted: Seller Accepted this bid
        // Declined: Seller Accepted other bid
        // Verified: Buyer viewed accept/decline of this bid
        status: "Unread"
    };

    updateProduct[`/Products/${productId}/bid/${productBidId}`] = bidId
    updateProduct[`/Users/${userId}/buyerBid/${buyerBidId}`] = bidId

    var highestBidAmount = 0;
    if (!product.bid || Number(bidAmount) > product.bid.highestBid) {
        highestBidAmount = Number(bidAmount);
    } else {
        highestBidAmount = product.bid.highestBid;
    }

    updateProduct[`/Products/${productId}/bid/highestBid`] = highestBidAmount;
    db.ref().update(updateProduct);

    return productId
}


const deleteBid = (bidId, productId, buyerId) => {
    const updateDeleteBid = {};
    updateDeleteBid[`/bid/${bidId}`] = null;
    db.ref(`/Products/${productId}/bid/${bidId}`).remove();
    db.ref(`/Users/${buyerId}/buyerBid/${bidId}`).remove();
    db.ref().update(updateDeleteBid);
}

const getRole = (userId, setUserRole) => {
    const productDb = db.ref("Users/" + userId + "/role");
    productDb.once(
        "value",
        snapshot => {
            setUserRole(snapshot.val());
        },
        error => alert(error)
    );
}
const getAddress = (userId, setAddress) => {
    const productDb = db.ref("Users/" + userId + "/address");
    productDb.once(
        "value",
        snapshot => {
            setAddress(snapshot.val());
        },
        error => alert(error)
    );

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

const setUserProfile = (userId, profile) => {
    const updateUserInfo = {};
    updateUserInfo[`/Users/${userId}/name`] = profile.name;
    updateUserInfo[`/Users/${userId}/email`] = profile.email;
    updateUserInfo[`/Users/${userId}/address`] = profile.address;
    updateUserInfo[`/Users/${userId}/role`] = profile.role;
    db.ref().update(updateUserInfo);
}

const getBuyerInfo = (bid, setBuyerName, setBuyerEmail, setBuyerAdrress) => {
    var buyerId = bid.buyerId;
    const userDb = db.ref(`Users/${buyerId}`);
    userDb.on(
        "value",
        snapshot => {
            if (snapshot.val()) {
                setBuyerName(snapshot.val().name);
                setBuyerEmail(snapshot.val().email);
                setBuyerAdrress(snapshot.val().address);
            }
        },
        error => alert(error));
}


const acceptBid = (bidId, productId) => {
    const updateBidAccept = {};
    updateBidAccept[`/bid/${bidId}/status`] = "Accepted";
    updateBidAccept[`/Products/${productId}/sold`] = true;
    db.ref().update(updateBidAccept);
}

const verifyBid = (bidId) => {
    const updateBidView = {};
    updateBidView[`/bid/${bidId}/status`] = "Verified";
    db.ref().update(updateBidView);
}

const alterBuyerNotificationCount = (userId, increase) => {
    const userDb = db.ref(`Users/${userId}/buyerNotification`);
    userDb.transaction((buyerNotification) => {
        if (buyerNotification === null) {
            return 1
        } else {
            if (increase) {
                return buyerNotification + 1
            } else {
                return buyerNotification - 1
            }
        }
    })
}

const alterSellerNotificationCount = (userId, increase) => {
    const userDb = db.ref(`Users/${userId}/sellerNotification`);
    userDb.transaction((sellerNotification) => {
        if (sellerNotification === null) {
            return 1
        } else {
            if (increase) {
                return sellerNotification + 1
            } else {
                return sellerNotification - 1
            }
        }
    })
}

const isBidRead = (bidId) => {
    const bidDb = db.ref(`bid/${bidId}`);
    var status;
    bidDb.on(
        "value",
        snapshot => {
            if (snapshot.val()) {
                status = snapshot.val().status
            }
        },
        error => alert(error));
    return status !== 'Accepted';
}

export { getUserInfo, acceptBid, verifyBid, alterSellerNotificationCount, alterBuyerNotificationCount, 
    getBidInfoWithProduct, getBuyerBid, getUserProductsInfo, getProductInfo, addProduct, getAllProductInfo, 
    setUserProfile, getRole, addBid, getProductBidInfo, getBidInfo, getBuyerInfo, isBidRead, deleteBid }
