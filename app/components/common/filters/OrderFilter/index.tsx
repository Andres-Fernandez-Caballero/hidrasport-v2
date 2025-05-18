import { useState } from 'react';
import { OrderStatus, OrderStatusLabels } from '../../../../../interfaces/IOrder';

interface OrderFilterProps {
  onSubmit: (filters: { status?: string; startDate: string; endDate: string }) => void;
}

const OrderFilter: React.FC<OrderFilterProps> = ({ onSubmit }) => {
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2030-01-01');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload =
      status === ''
        ? { startDate, endDate }
        : { status, startDate, endDate };

    onSubmit(payload);
  };


  return (
    <div className="flex justify-center px-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full max-w-4xl bg-white/10 rounded-lg p-4 shadow"
      >
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 px-2 border rounded w-full sm:w-auto text-sm"
        >
          {Object.values(OrderStatus).map((statusValue) => (
            <option key={statusValue} value={statusValue}>
              {OrderStatusLabels[statusValue as OrderStatus]}
            </option>
          ))}
          <option value="">Todos</option>
        </select>


        <div className="flex flex-col sm:flex-row items-center gap-1 w-full sm:w-auto">
          <label className="text-sm">Start:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-10 px-2 border rounded text-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-1 w-full sm:w-auto">
          <label className="text-sm">End:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-10 px-2 border rounded text-sm"
          />
        </div>

        <button
          type="submit"
          className="h-10 px-4 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Aplicar filtros
        </button>
      </form>
    </div>
  );
};

export default OrderFilter;
