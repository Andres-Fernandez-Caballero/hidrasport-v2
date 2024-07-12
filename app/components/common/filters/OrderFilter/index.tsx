import { useState } from 'react';
import { OrderStatus } from '../../../../../interfaces/IOrder';

interface OrderFilterProps {
  onSubmit: (filters: { status: string; startDate: string; endDate: string }) => void;
}

const OrderFilter: React.FC<OrderFilterProps> = ({ onSubmit }) => {
  const [status, setStatus] = useState(OrderStatus.PENDING);
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2030-01-01');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ status, startDate, endDate });
  };

  return (
    <div className='flex justify-center items-top'>
      <form onSubmit={handleSubmit} className='flex'>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as OrderStatus)}
        className="p-2 border rounded"
      >
        <option value="" disabled>
          Select status...
        </option>
        {Object.values(OrderStatus).map((statusValue) => (
          <option key={statusValue} value={statusValue}>
            {statusValue}
          </option>
        ))}
      </select>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Aplicar filtros</button>
      </form>
    </div>
  );
};

export default OrderFilter;
