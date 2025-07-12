import React from 'react';
import { Clock, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { SwapRequest } from '../../../types';
import { Card } from '../../common/Card/Card';
import { Button } from '../../common/Button/Button';
import styles from './SwapRequestCard.module.css';

interface SwapRequestCardProps {
  swapRequest: SwapRequest;
  currentUserId: string;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onCancel?: (id: string) => void;
  onAddFeedback?: (swapId: string) => void;
}

export const SwapRequestCard: React.FC<SwapRequestCardProps> = ({
  swapRequest,
  currentUserId,
  onAccept,
  onReject,
  onCancel,
  onAddFeedback,
}) => {
  const isRequester = swapRequest.requesterId === currentUserId;
  const isTarget = swapRequest.targetUserId === currentUserId;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className={styles.pendingIcon} />;
      case 'accepted':
        return <CheckCircle size={16} className={styles.acceptedIcon} />;
      case 'rejected':
        return <XCircle size={16} className={styles.rejectedIcon} />;
      case 'completed':
        return <CheckCircle size={16} className={styles.completedIcon} />;
      case 'cancelled':
        return <XCircle size={16} className={styles.cancelledIcon} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return styles.pending;
      case 'accepted':
        return styles.accepted;
      case 'rejected':
        return styles.rejected;
      case 'completed':
        return styles.completed;
      case 'cancelled':
        return styles.cancelled;
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div className={styles.exchange}>
          <div className={styles.skill}>
            <span className={styles.skillLabel}>
              {isRequester ? 'You offer:' : 'They offer:'}
            </span>
            <span className={styles.skillName}>{swapRequest.offeredSkill}</span>
          </div>
          <div className={styles.arrow}>⇄</div>
          <div className={styles.skill}>
            <span className={styles.skillLabel}>
              {isRequester ? 'You want:' : 'They want:'}
            </span>
            <span className={styles.skillName}>{swapRequest.requestedSkill}</span>
          </div>
        </div>
        
        <div className={`${styles.status} ${getStatusColor(swapRequest.status)}`}>
          {getStatusIcon(swapRequest.status)}
          <span>{swapRequest.status.charAt(0).toUpperCase() + swapRequest.status.slice(1)}</span>
        </div>
      </div>

      {swapRequest.message && (
        <div className={styles.message}>
          <MessageCircle size={16} />
          <p>"{swapRequest.message}"</p>
        </div>
      )}

      <div className={styles.meta}>
        <span>Created: {formatDate(swapRequest.createdAt)}</span>
        {swapRequest.completedAt && (
          <span>Completed: {formatDate(swapRequest.completedAt)}</span>
        )}
      </div>

      <div className={styles.actions}>
        {isTarget && swapRequest.status === 'pending' && (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAccept?.(swapRequest.id)}
            >
              Accept
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onReject?.(swapRequest.id)}
            >
              Reject
            </Button>
          </>
        )}

        {isRequester && swapRequest.status === 'pending' && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onCancel?.(swapRequest.id)}
          >
            Cancel Request
          </Button>
        )}

        {swapRequest.status === 'completed' && onAddFeedback && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAddFeedback(swapRequest.id)}
          >
            Add Feedback
          </Button>
        )}
      </div>
    </Card>
  );
};