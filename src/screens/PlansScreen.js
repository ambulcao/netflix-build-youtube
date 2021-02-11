import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import './PlansScreen.css';
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
const [products, setProducts] = useState([]);
const user = useSelector(selectUser);

useEffect(() => {
    db.collection('products')
        .where("active", "==", true)
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection("prices").get();
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })   
            });
            setProducts(products);
        });
}, []);

    console.log(products);

    const loadCheckout = async (priceId) => {
        const docRef = await db
            .collection('customers')
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });
        docRef.onSnapshot(async(snap) => {
            const {error, sessionId} = snap.data();

            if(error) {
                alert(`An error occured: ${error.message}`);
            }

            if(sessionId) {
                const stripe = await loadStripe("pk_test_51IJ30UFg5mMdWFjNVHKBwfnzol5f0fez6elN6l0oVn3PTSyGoj9nM5isEQwFooc3j0G1kYvo3pXqq0Pw0yjnnUXE00mcedT33I");
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    return (
        <div className="plansScreen">
            {Object.entries(products).map(([productId, productData]) => {
               return(
                   <div className="plansScreen_plans">
                        <div className="plansScreen_info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => loadCheckout(productData.prices.priceId)}>Subscribe</button>
                   </div>
               );
            })}
        </div>
    )
}

export default PlansScreen;
