import { createSlice } from "@reduxjs/toolkit";
const cartSlice=createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0
    },
    reducers:{
        addProduct:(state,action)=>{
            state.quantity+=1;
            state.products.push(action.payload);
            state.total+=action.payload.price*action.payload.quantity;
        },
        incrementQuantity:(state,action)=>{
            const product=state.products.find(p=>p._id===action.payload);
            if(product){
                product.quantity+=1;
                state.total+=product.price;
            }
        },
        decrementQuantity:(state,action)=>{
            const product=state.products.find(p=>p._id===action.payload);
            if(product){
                if(product.quantity===1){
                    state.products=state.products.filter(p=>p._id!==action.payload);
                    state.quantity-=1;
                    state.total-=product.price;
                } else {
                    product.quantity-=1;
                    state.total-=product.price;
                }
            }
        }
    }
})

export const { addProduct, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;