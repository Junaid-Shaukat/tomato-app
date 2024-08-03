import userModel from "../models/userModel.js"

//add items to user cart

const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = userData.cartData;

        // Initialize cartData if it's not an object
        if (!cartData || typeof cartData !== 'object') {
            cartData = {};
        }

        // Check if the itemId already exists in cartData
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1; // Initialize the item with quantity 1
        } else {
            cartData[req.body.itemId] += 1; // Increment the item quantity
        }

        // Update the user's cartData in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Internal server error" });
    }
};


//remove items from user cart
const removeFromCart = async (req, res) => {
        try {
            let userData = await userModel.findById(req.body.userId);
            let cartData = await userData.cartData;
            if(cartData[req.body.itemId]>0){
                cartData[req.body.itemId]-=1;
                
            }
            await userModel.findByIdAndUpdate(req.body.userId,{cartData});
            res.json({success:true,message:"Item removed from cart"});
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Internal server error"});
        }
}


//fetch user cart data

const getCart = async (req, res) => {
            try {
                let userData = await userModel.findById(req.body.userId);
                let cartData = await userData.cartData;
                res.json({success:true,cartData});
            } catch (error) {
                console.log(error);
                res.json({success:false,message:"Internal server error"});
            }
}

export { addToCart, removeFromCart, getCart };