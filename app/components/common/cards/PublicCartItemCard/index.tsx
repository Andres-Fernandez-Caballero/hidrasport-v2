import React from 'react';
import Image from 'next/image';
import { ICartBase } from '@interfaces/ICart';
import { SERVER_URL } from '@config/index';

interface PublicCartItemCardProps {
  item: ICartBase;
  onIncrease: () => void;
  onDecrease: () => void;
  onQuantityChange: (value: number) => void;
}

const PublicCartItemCard: React.FC<PublicCartItemCardProps> = ({ item, onIncrease, onDecrease, onQuantityChange }) => {
  return (
    <div className="cart-item flex flex-col items-center space-y-4 border border-gray-300 p-4 rounded-lg">
      <div className="relative w-24 h-24 mb-4">
        <Image
          src={SERVER_URL + item.img}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="item-details text-center">
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
        <p className="text-sm text-gray-500">Color: {item.color}</p>
        <p className="text-sm text-gray-500">Size: {item.size}</p>
        <p className="text-sm text-gray-500 mb-2">Price: ${item.price}</p>
        <div className="quantity flex items-center justify-center space-x-2">
          <button
            className="bg-gray-200 text-gray-600 p-1 rounded"
            onClick={onDecrease}
          >
            -
          </button>
          <input
            type="number"
            value={item.quantity}
            min="0"
            className="w-16 text-center border border-gray-300 rounded"
            onChange={(e) => onQuantityChange(parseInt(e.target.value, 10))}
          />
          <button
            className="bg-gray-200 text-gray-600 p-1 rounded"
            onClick={onIncrease}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicCartItemCard;
