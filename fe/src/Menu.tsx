import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import './style/Menu.css';

interface MenuItem {
  menu_item_id: number;
  price: number;
  name: string;
  description?: string;
  category: string;
}

const Menu: React.FC = () => {
  const { tableNumber } = useParams<{ tableNumber: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const categories = ['All', 'Appetizers', 'Main Courses', 'Desserts', 'Beverages'];

  const filteredItems = menuItems.filter((item: MenuItem) =>
    (category === 'All' || item.category === category) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="menu-container">
      <h2>Menu for Table {tableNumber}</h2>
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
        {filteredItems.map(item => (
          <div key={item.menu_item_id} className="menu-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;