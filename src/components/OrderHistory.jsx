import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../hooks/useAuth';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      // Запрашиваем заказы ТОЛЬКО текущего пользователя
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id) // Фильтр по ID пользователя
        .order('created_at', { ascending: false }); // Сначала новые

      if (error) {
        console.error('Ошибка при загрузке заказов:', error);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) return <p>Загрузка истории заказов...</p>;

  if (orders.length === 0) {
    return <p>У вас пока нет заказов.</p>;
  }

  return (
    <div className="order-history">
      <h3>Мои заказы</h3>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <span>Заказ №{order.id}</span>
            <span>{new Date(order.created_at).toLocaleDateString()}</span>
          </div>
          <div className="order-items">
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <img src={`${import.meta.env.BASE_URL}images/${item.img}`} alt={item.title} />
                <span>{item.title} (x{item.count})</span>
              </div>
            ))}
          </div>
          <div className="order-total">
            Итого: <strong>{order.total} ₽</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;