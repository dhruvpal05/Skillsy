import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin } from 'lucide-react';
import { User } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useUsers } from '../../hooks/useUsers';
import { Input } from '../../components/common/Input/Input';
import { Button } from '../../components/common/Button/Button';
import { Card } from '../../components/common/Card/Card';
import { UserCard } from '../../components/user/UserCard/UserCard';
import { Pagination } from '../../components/common/Pagination/Pagination';
import { LoadingSpinner } from '../../components/common/LoadingSpinner/LoadingSpinner';
import styles from './Browse.module.css';

export const Browse: React.FC = () => {
  const [filters, setFilters] = useState({
    skill: '',
    location: '',
    availability: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const { users, loading, error, pagination, loadMore } = useUsers(filters);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleViewProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const handleRequestSwap = (userId: string) => {
    navigate(`/swaps/new?userId=${userId}`);
  };

  const handleLoadMore = () => {
    loadMore();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Browse Users</h1>
        <p className={styles.subtitle}>Find people to swap skills with</p>
      </div>

      <Card className={styles.searchCard}>
        <div className={styles.searchContainer}>
          <Input
            type="text"
            placeholder="Search by skill..."
            value={filters.skill}
            onChange={(e) => handleFilterChange('skill', e.target.value)}
            leftIcon={<Search size={20} />}
            className={styles.searchInput}
          />

          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            className={styles.filterButton}
          >
            <Filter size={20} />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className={styles.filters}>
            <Input
              type="text"
              placeholder="Location..."
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              leftIcon={<MapPin size={20} />}
            />

            <select
              value={filters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
              className={styles.select}
            >
              <option value="">All Availability</option>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        )}
      </Card>

      {error && (
        <div className={styles.error}>
          <p>Error: {error}</p>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      )}

      {loading && users.length === 0 ? (
        <div className={styles.loading}>
          <LoadingSpinner size="lg" text="Loading users..." />
        </div>
      ) : (
        <>
          <div className={styles.results}>
            <p className={styles.resultsCount}>
              Found {pagination.total} user{pagination.total !== 1 ? 's' : ''}
            </p>
          </div>

          <div className={styles.grid}>
            {users.map(userItem => (
              <UserCard
                key={userItem.id}
                user={userItem}
                currentUserId={user?.id}
                onViewProfile={handleViewProfile}
                onRequestSwap={handleRequestSwap}
              />
            ))}
          </div>

          {users.length === 0 && !loading && (
            <div className={styles.noResults}>
              <p>No users found matching your criteria.</p>
              <Button
                variant="secondary"
                onClick={() => setFilters({
                  skill: '',
                  location: '',
                  availability: '',
                })}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {pagination.totalPages > 1 && pagination.page < pagination.totalPages && (
            <div className={styles.loadMore}>
              <Button
                variant="secondary"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};