import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style/Menu.css';
import { useCart } from './CartContext';
import { baseURL } from './App'

interface MenuItem {
  menu_item_id: number;
  price: number;
  name: string;
  description?: string;
  category: string;
}

const Menu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { cart, addToCart, updateCartItemQuantity } = useCart();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get<MenuItem[]>(`${baseURL}/menu`);
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
    // const dummyMenuItems: MenuItem[] = [
    //   { menu_item_id: 1, price: 10.99, name: 'Burger', description: 'A delicious burger', category: 'Main Courses' },
    //   { menu_item_id: 2, price: 5.99, name: 'Fries', description: 'Crispy fries', category: 'Appetizers' },
    //   { menu_item_id: 3, price: 7.99, name: 'Salad', description: 'Fresh garden salad', category: 'Appetizers' },
    //   { menu_item_id: 4, price: 12.99, name: 'Steak', description: 'Juicy steak', category: 'Main Courses' },
    //   { menu_item_id: 5, price: 3.99, name: 'Ice Cream', description: 'Vanilla ice cream', category: 'Desserts' },
    //   { menu_item_id: 6, price: 2.99, name: 'Soda', description: 'Refreshing soda', category: 'Beverages' },
    // ];
    // setMenuItems(dummyMenuItems);
  }, []);

  const categories = ['All', 'Vegetarian', 'Non Veg', 'Vegan', 'Halal'];

  const filteredItems = menuItems.filter((item: MenuItem) =>
    (category === 'All' || item.category === category) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCartItemQuantity = (menuItemId: number) => {
    const cartItem = cart.find(item => item.menu_item_id === menuItemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="menu-items">
        {filteredItems.map(item => {
          const quantity = getCartItemQuantity(item.menu_item_id);
          return (
            <div key={item.menu_item_id} className="menu-item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              {quantity === 0 ? (
                <button onClick={() => addToCart({ ...item, quantity: 1 })}>Add to Cart</button>
              ) : (
                <div className="quantity-controls">
                  <button onClick={() => updateCartItemQuantity(item.menu_item_id, quantity - 1)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => updateCartItemQuantity(item.menu_item_id, quantity + 1)}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Link to="/cart" className="cart-link">
        <button>Go to Cart</button>
      </Link>
    </div>
  );
};

export default Menu;