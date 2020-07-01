import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findElementByAtrr } from './utils';
import App from './App';
import Header from './components/header';

describe('renders header', () => {
  let shallowWrapper;
  configure({ adapter: new Adapter() });
  beforeEach((props = {}) => {
    shallowWrapper = shallow(<App />);
  });
  it('Should render header without errors', () => {
    expect(shallowWrapper.find(Header)).toHaveLength(1);
  });
});

describe('renders stack of cards', () => {
  configure({ adapter: new Adapter() });
  const store = [
    {
      sku: 'mbp',
      name: 'MacBook Pro',
      price: '1399.99',
      img: './images/image2.jpg',
    },
    {
      sku: 'atv',
      name: 'Apple TV',
      price: '109.5',
      img: './images/image3.jpg',
    },
    {
      sku: 'vga',
      name: 'VGA adapter',
      price: '30',
      img: './images/image4.jpg',
    },
    {
      sku: 'ipd',
      name: 'Super iPad',
      price: '549.99',
      img: './images/image1.jpg',
    },
  ];
  let wrapper;
  beforeEach((props = {}) => {
    wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.setState({
      store,
    });
    instance.forceUpdate();
  });
  it('Should render 4 cards without errors', () => {
    expect(wrapper.find('.box').at(0).children(0)).toHaveLength(store.length);
  });

  it('Should render 5 card-elements in each SKY card without errors', () => {
    expect(wrapper.find('.card').at(0).children()).toHaveLength(5);
  });

  it('Should render card with image & src without errors', () => {
    expect(wrapper.find('.card').at(0).children().at(0).type()).toBe('img');
    expect(wrapper.find('.card').at(0).children().at(0).props().hasOwnProperty('src')).toBe(true);
  });

  it('Should render 4 card-title in each SKY card without errors', () => {
    expect(wrapper.find('.card').at(0).children().find('.card-title')).toHaveLength(4);
  });

  it('Should render 1 button in each SKY card without errors', () => {
    expect(wrapper.find('.addButton')).toHaveLength(store.length);
  });
});

describe('renders Total checkout', () => {
  let shallowWrapper;
  configure({ adapter: new Adapter() });
  beforeEach((props = {}) => {
    shallowWrapper = shallow(<App />);
  });
  it('Should render without errors', () => {
    const wrapper = findElementByAtrr(shallowWrapper, 'ecommerce-cart');
    expect(wrapper.html()).toContain('Total');
  });
});
