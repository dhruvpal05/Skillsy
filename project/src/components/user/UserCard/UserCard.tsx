import React from 'react';
import { MapPin, Star, Clock, MessageCircle } from 'lucide-react';
import { User } from '../../../types';
import { Card } from '../../common/Card/Card';
import { Button } from '../../common/Button/Button';
import styles from './UserCard.module.css';

interface UserCardProps {
  user: User;
  onViewProfile: (userId: string) => void;
  onRequestSwap: (userId: string) => void;
  currentUserId?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onViewProfile,
  onRequestSwap,
  currentUserId,
}) => {
  const isOwnProfile = currentUserId === user.id;
  
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return styles.available;
      case 'busy':
        return styles.busy;
      case 'offline':
        return styles.offline;
      default:
        return '';
    }
  };

  const formatAvailability = (availability: string) => {
    return availability.charAt(0).toUpperCase() + availability.slice(1);
  };

  return (
    <Card hover className={styles.card}>
      <div className={styles.header}>
        <img
          src={user.profilePhoto || `https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop`}
          alt={user.name}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <h3 className={styles.name}>{user.name}</h3>
          <div className={styles.location}>
            <MapPin size={14} />
            <span>{user.location}</span>
          </div>
          <div className={styles.rating}>
            <Star size={14} />
            <span>{user.rating.toFixed(1)} ({user.totalSwaps} swaps)</span>
          </div>
        </div>
        <div className={`${styles.availability} ${getAvailabilityColor(user.availability)}`}>
          <Clock size={12} />
          <span>{formatAvailability(user.availability)}</span>
        </div>
      </div>

      <div className={styles.skills}>
        <div className={styles.skillSection}>
          <h4 className={styles.skillTitle}>Offers</h4>
          <div className={styles.skillTags}>
            {user.skillsOffered.slice(0, 3).map((skill, index) => (
              <span key={index} className={`${styles.skillTag} ${styles.offered}`}>
                {skill}
              </span>
            ))}
            {user.skillsOffered.length > 3 && (
              <span className={styles.moreSkills}>
                +{user.skillsOffered.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className={styles.skillSection}>
          <h4 className={styles.skillTitle}>Wants</h4>
          <div className={styles.skillTags}>
            {user.skillsWanted.slice(0, 3).map((skill, index) => (
              <span key={index} className={`${styles.skillTag} ${styles.wanted}`}>
                {skill}
              </span>
            ))}
            {user.skillsWanted.length > 3 && (
              <span className={styles.moreSkills}>
                +{user.skillsWanted.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onViewProfile(user.id)}
          fullWidth
        >
          View Profile
        </Button>
        {!isOwnProfile && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onRequestSwap(user.id)}
            fullWidth
          >
            <MessageCircle size={16} />
            Request Swap
          </Button>
        )}
      </div>
    </Card>
  );
};