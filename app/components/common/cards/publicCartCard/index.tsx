import React, { useState } from 'react';
import { IPublicCart } from '@interfaces/ICart';
import PublicCartItemCard from '../PublicCartItemCard';

interface PublicCartCardProps {
  cart: IPublicCart;
  onSubmit: () => void;
}

const PublicCartCard: React.FC<PublicCartCardProps> = ({ cart, onSubmit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [items, setItems] = useState(cart.items.map(item => ({ ...item, quantity: item.quantity || 1 })));

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = newQuantity;
    setItems(updatedItems);
  };

  const handleIncrease = (index: number) => {
    handleQuantityChange(index, items[index].quantity + 1);
  };

  const handleDecrease = (index: number) => {
    handleQuantityChange(index, Math.max(items[index].quantity - 1, 0));
  };

  return (
    <div className="cart-card bg-white shadow-md rounded-lg p-6 border border-gray-200 mx-auto" style={{ width: '80%' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{cart.name}</h2>
        <button
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
          onClick={onSubmit}
        >
          Submit Cart
        </button>
      </div>
      <hr className="border-gray-300 mb-4" />
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition mb-4"
        onClick={toggleExpand}
      >
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </button>

      {isExpanded && (
        <div className="cart-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((item, index) => (
            <PublicCartItemCard
              key={item.id || item.title}
              item={item}
              onIncrease={() => handleIncrease(index)}
              onDecrease={() => handleDecrease(index)}
              onQuantityChange={(value) => handleQuantityChange(index, value)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicCartCard;