import React, { useContext, useState, useEffect} from 'react'

import styled from 'styled-components'

import { Link, useNavigate  } from 'react-router-dom'

import { CartContext } from '../contexts/cartContext'

const Basket = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const {
    getItems,
    clearBasket,
  } = useContext(CartContext);

  useEffect(() =>{
    setCartItems(getItems());
  }, [getItems]);

  const renderCart = () => {
    const cartItems = getItems();

    if (cartItems.length > 0 ){
      return cartItems.map((p) =>(
        <React.Fragment>
        <div>
          <Link to={`/products/${p.id}`}>{p.title}</Link>
        </div>
        <BasketQty>
          {p.quantity}
        </BasketQty>
        <BasketPrice>
          &pound;{p.price}
        </BasketPrice>

        </React.Fragment>
      ));
    } else{
      return <div>The basket is currently empty</div>
    }
    }

    const renderTotal = () => {
      const cartItems = getItems();

      const total = cartItems.reduce((total, item) => (total + item.price*item.quantity), 0);
      return total;
    }
  
  return (
    <BasketContainer>
        <BasketTitle>Shopping Basket</BasketTitle>
        <BasketButton onClick={() => navigate('/checkout')}>Checkout</BasketButton>
        <BasketTable>
          <BasketHeader>
            <h4>Item</h4>
            <h4>Quantity</h4>
            <h4>Price</h4>
          </BasketHeader>
          <BasketHeaderLine/>

          <BasketHeader>
            {renderCart()}
          </BasketHeader>
          <BasketHeaderLine/>
          </BasketTable>
          <BasketButton onClick={() =>setCartItems(clearBasket()) }>Clear</BasketButton>
          <BasketTotal>Total: ${renderTotal()}</BasketTotal>
        
    </BasketContainer>
  )
}

export default Basket;

const BasketContainer = styled.div`
       display: grid;
       paddind: 20px;
       grid-template-columns: 1fr 1fr 1fr;
       grid-template-rows: 1fr 1fr 1fr;
       `;

const BasketTable = styled.div`
        grid-column: 1/span 3;
        grid-template-rows: 0.25fr 1fr 0.25fr 0.25fr;
        column-gap: 20px;
        padding-left: 10px;
        `;
const BasketHeader = styled.div`
        display: grid;
        grid-template-columns: 1fr 0.5fr 0.5fr;
        `;
const BasketHeaderLine = styled.hr`
        margin-bottom: 20px;
        border: 1px solid gray;
        `;                
const BasketTitle = styled.h2`
        grid-column: 1/span 3;
        padding-bottom: 20px;
        `;
const BasketQty = styled.h3`
        font-size: 18px;
        font-weight: bold;
        display: grid;
        grid-template-columns: 0.1fr 0.05fr 0.1fr 0.1fr;
        `;                
const BasketPrice = styled.h3`
        font-size: 20px;
        font-weight: bold;
        `;
const BasketTotal = styled.h2`
        justify-self: end;
        `;
const BasketButton = styled.button`
        border-radius: 8px;
        height: 40px;
        `;                