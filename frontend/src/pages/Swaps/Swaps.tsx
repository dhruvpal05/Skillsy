import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import { SwapRequest } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../../components/common/Card/Card';
import { Button } from '../../components/common/Button/Button';
import { SwapRequestCard } from '../../components/swap/SwapRequestCard/SwapRequestCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner/LoadingSpinner';
import styles from './Swaps.module.css';

export const Swaps: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'completed' | 'rejected'>('all');
  const { user } = useAuth();
  const { swapRequests, isLoading, loadUserSwapRequests, updateSwapRequest } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      loadUserSwapRequests(user.id);
    }
  }, [user?.id, loadUserSwapRequests]);

  const handleAccept = async (requestId: string) => {
    await updateSwapRequest(requestId, { status: 'accepted' });
  };

  const handleReject = async (requestId: string) => {
    await updateSwapRequest(requestId, { status: 'rejected' });
  };

  const handleCancel = async (requestId: string) => {
    await updateSwapRequest(requestId, { status: 'cancelled' });
  };

  const handleAddFeedback = (swapId: string) => {
    navigate(`/feedback/new?swapId=${swapId}`);
  };

  const filteredRequests = swapRequests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  const getFilterCounts = () => {
    return {
      all: swapRequests.length,
      pending: swapRequests.filter(r => r.status === 'pending').length,
      accepted: swapRequests.filter(r => r.status === 'accepted').length,
      completed: swapRequests.filter(r => r.status === 'completed').length,
      rejected: swapRequests.filter(r => r.status === 'rejected').length,
    };
  };

  const counts = getFilterCounts();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner size="lg" text="Loading your swaps..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Swaps</h1>
        <Button onClick={() => navigate('/browse')}>
          <Plus size={16} />
          New Swap
        </Button>
      </div>

      <Card className={styles.filtersCard}>
        <div className={styles.filters}>
          <div className={styles.filterTabs}>
            {Object.entries(counts).map(([key, count]) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`${styles.filterTab} ${filter === key ? styles.active : ''}`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)} ({count})
              </button>
            ))}
          </div>
        </div>
      </Card>

      {filteredRequests.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Filter size={48} />
          </div>
          <h2>No {filter !== 'all' ? filter : ''} swaps found</h2>
          <p>
            {filter === 'all' 
              ? "You haven't created any swap requests yet."
              : `You don't have any ${filter} swap requests.`
            }
          </p>
          <Button onClick={() => navigate('/browse')}>
            Find Users to Swap With
          </Button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredRequests.map(request => (
            <SwapRequestCard
              key={request.id}
              swapRequest={request}
              currentUserId={user?.id || ''}
              onAccept={handleAccept}
              onReject={handleReject}
              onCancel={handleCancel}
              onAddFeedback={handleAddFeedback}
            />
          ))}
        </div>
      )}
    </div>
  );
};