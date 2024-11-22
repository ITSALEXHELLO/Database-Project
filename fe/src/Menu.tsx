import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './style/Menu.css';

const Menu: React.FC = () => {
  const { tableNumber } = useParams<{ tableNumber: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Appetizers', 'Main Courses', 'Desserts', 'Beverages'];
  const menuItems = [
    { name: 'Spring Rolls', category: 'Appetizers' },
    { name: 'Grilled Chicken', category: 'Main Courses' },
    { name: 'Chocolate Cake', category: 'Desserts' },
    { name: 'Lemonade', category: 'Beverages' },
    // Add more items as needed
  ];

  const filteredItems = menuItems.filter(item =>
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
          <div key={item.name} className="menu-item">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;