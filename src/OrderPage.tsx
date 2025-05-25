import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/OrderPage.css';

const OrderPage: React.FC = () => {
  const navigate = useNavigate();

  const [newName, setNewName] = useState('');
  const [nameCandidates, setNameCandidates] = useState<string[]>([]);
  const [currentOrder, setCurrentOrder] = useState({
    name: '',
    quantity: 1,
    comment: '',
  });
  const [orderList, setOrderList] = useState<
    { name: string; quantity: number; comment: string }[]
  >([]);

  const handleAddName = () => {
    const trimmedName = newName.trim();
    if (!trimmedName) {
      alert('名前を入力してください');
      return;
    }
    if (nameCandidates.includes(trimmedName)) {
      alert('すでに追加されています');
      return;
    }
    setNameCandidates((prev) => [...prev, trimmedName]);
    setNewName('');
  };

  const handleAddOrder = () => {
    if (!currentOrder.name) {
      alert('注文者を選択してください');
      return;
    }
    setOrderList([...orderList, currentOrder]);
    setCurrentOrder({ name: '', quantity: 1, comment: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (orderList.length === 0) {
      alert('注文が追加されていません');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderList),
        credentials: 'include', // 必要に応じて
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '注文の送信に失敗しました');
      }

      const data = await response.json();
      alert(data.message || '注文が正常に送信されました');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert(
        `❌ エラーが発生しました: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  return (
    <div className="order-page" style={{ maxWidth: 400, margin: '0 auto', textAlign: 'left' }}>
      <h1>注文ページ</h1>

      {/* 注文者追加欄 */}
      <section
        style={{
          marginBottom: 24,
          padding: 12,
          border: '1px solid #ccc',
          borderRadius: 6,
          backgroundColor: '#fafafa',
        }}
      >
        <h3>注文者を追加する</h3>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="新しい注文者名を入力"
          style={{ width: '70%', marginRight: 8 }}
          aria-label="新しい注文者名"
        />
        <button type="button" onClick={handleAddName}>
          追加
        </button>
      </section>

      {/* 注文フォーム */}
      <form onSubmit={handleSubmit}>
        <label>
          注文者:
          <select
            value={currentOrder.name}
            onChange={(e) => setCurrentOrder({ ...currentOrder, name: e.target.value })}
            style={{ width: '100%', marginTop: 4, marginBottom: 12 }}
            aria-required="true"
          >
            <option value="">選択してください</option>
            {nameCandidates.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label>
          数量:
          <input
            type="number"
            value={currentOrder.quantity}
            min={1}
            onChange={(e) =>
              setCurrentOrder({ ...currentOrder, quantity: Number(e.target.value) })
            }
            required
            style={{ width: '100%', marginTop: 4, marginBottom: 12 }}
          />
        </label>

        <label>
          串の種類:
          <textarea
            value={currentOrder.comment}
            onChange={(e) => setCurrentOrder({ ...currentOrder, comment: e.target.value })}
            style={{ width: '100%', marginTop: 4, marginBottom: 12 }}
          />
        </label>

        <button type="button" onClick={handleAddOrder} style={{ marginBottom: 20 }}>
          ＋ 注文を追加
        </button>

        {orderList.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <h3>追加された注文リスト</h3>
            <ul>
              {orderList.map((order, idx) => (
                <li key={idx}>
                  {order.name} - {order.quantity}個 - {order.comment || 'コメントなし'}
                </li>
              ))}
            </ul>
          </section>
        )}

        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#652324',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          注文を送信
        </button>
      </form>
    </div>
  );
};

export default OrderPage;
