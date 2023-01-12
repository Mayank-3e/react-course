import React, { useReducer } from "react"
export const CartContext = React.createContext()

const cartReducer=(state,action)=>
{
    if(action.type==='add')
    {
        const newTot=state.totalAmount + action.item.price*action.item.amount
        const curid=state.items.findIndex(item=>item.id===action.item.id)
        if(curid<0)
        {
            const newItems=state.items.concat(action.item)
            return {items: newItems, totalAmount: newTot}
        }
        const updItems=[...state.items]
        updItems[curid]={...state.items[curid], amount: state.items[curid].amount+action.item.amount}
        return {items: updItems, totalAmount: newTot}
    }
    if(action.type==='remove')
    {
        const curid=state.items.findIndex(item=>item.id===action.id)
        const curItem=state.items[curid]
        const newTot=state.totalAmount - curItem.price
        let updItems
        if(curItem.amount===1) updItems=state.items.filter(item=>item.id!==action.id)
        else
        {
            updItems=[...state.items]
            updItems[curid]={...curItem, amount: curItem.amount-1}
        }
        return {items: updItems, totalAmount: newTot}
    }
}

export const CartProvider=props=>
{
    const [cartState,dispatchCart]=useReducer(cartReducer,{items: [], totalAmount: 0})
    const cartCtx =
    {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: item => dispatchCart({type: 'add', item: item}),
        removeItem: id => dispatchCart({type: 'remove', id: id})
    }

    return <CartContext.Provider value={{cartCtx}}>
        {props.children}
    </CartContext.Provider>
}