import React from 'react';
import './App.css';
import Checkout from './components/checkout';
import Header from './components/header';
import ECommerce from './api/ecommerce';
const checkout = new Checkout();
const ecommerce = new ECommerce();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: [],
      cartArray: [],
      price: 0
    };
  }

  componentDidMount = async () => {
    const store = await ecommerce.getSKUs();
    this.setState({store});
  }

  ScanItems = (item) => {
    checkout.scan(item);
    this.setState({ cartArray: [...this.state.cartArray, item] }, async () => {
      const listOfProducts = checkout.cumulateProducts(this.state.cartArray, this.state.store);
      const totalPrice = await ecommerce.getCost(listOfProducts);
      this.setState({ price: totalPrice });
    });
  };

  render = () => {
    const { store, cartArray, price } = this.state;
    return (
      <>
        <Header />
        <div className="box">
          {
            store && store.map((item) => {
              return (
                <div className="card" key={item.sku}>
                    <img src={require(`${item.img}`)} alt={item.name} width="250" height="250" />
                    <div className="card-title">Name: {item.name}</div>
                    <div className="card-title">SKU: {item.sku}</div>
                    <div className="card-title">Price: ${item.price}</div>
                    <div
                      className="card-title addButton"
                      onClick={() => {
                        this.ScanItems(item);
                      }}
                    >
                      Add
                    </div>
                </div>
              );
            })}
        </div>
        <div className="ecommerce-cart">
          <h2>Total ${price}</h2>
          { 
            cartArray && cartArray.map((cart, index) => {
              return (
                <div className="ecommerce-row" key={index}>
                  <span className="ecommerce-sku">{cart.name}</span>
                  <span className="ecommerce-space">:   </span>
                  <span className="ecommerce-column">${cart.price}</span>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

export default App;
