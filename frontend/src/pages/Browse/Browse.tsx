import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin } from 'lucide-react';
import { User, SearchFilters } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/common/Input/Input';
import { Button } from '../../components/common/Button/Button';
import { Card } from '../../components/common/Card/Card';
import { UserCard } from '../../components/user/UserCard/UserCard';
import { Pagination } from '../../components/common/Pagination/Pagination';
import { LoadingSpinner } from '../../components/common/LoadingSpinner/LoadingSpinner';
import styles from './Browse.module.css';

// Mock data - replace with actual API calls
const MOCK_USERS: User[] = [
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    location: 'New York, NY',
    profilePhoto: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    skillsOffered: ['Python', 'Machine Learning', 'Data Science'],
    skillsWanted: ['React', 'TypeScript', 'Frontend Design'],
    availability: 'available',
    isPublic: true,
    rating: 4.9,
    totalSwaps: 23,
    joinedDate: '2023-02-10',
    lastActive: '2024-01-20T10:00:00Z',
  },
  {
    id: '3',
    email: 'mike@example.com',
    name: 'Mike Johnson',
    location: 'Austin, TX',
    profilePhoto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    skillsOffered: ['Node.js', 'GraphQL', 'MongoDB'],
    skillsWanted: ['DevOps', 'Docker', 'AWS'],
    availability: 'busy',
    isPublic: true,
    rating: 4.7,
    totalSwaps: 18,
    joinedDate: '2023-03-15',
    lastActive: '2024-01-19T15:30:00Z',
  },
  {
    id: '4',
    email: 'sarah@example.com',
    name: 'Sarah Davis',
    location: 'Seattle, WA',
    profilePhoto: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    skillsOffered: ['UI/UX Design', 'Figma', 'Adobe Creative Suite'],
    skillsWanted: ['React', 'CSS Animations', 'Frontend Development'],
    availability: 'available',
    isPublic: true,
    rating: 4.8,
    totalSwaps: 31,
    joinedDate: '2022-11-08',
    lastActive: '2024-01-21T09:15:00Z',
  },
];

export const Browse: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    skill: '',
    location: '',
    availability: '',
    page: 1,
    limit: 12,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, [filters]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredUsers = MOCK_USERS;

      // Apply filters
      if (filters.skill) {
        filteredUsers = filteredUsers.filter(user =>
          user.skillsOffered.some(skill => 
            skill.toLowerCase().includes(filters.skill!.toLowerCase())
          ) ||
          user.skillsWanted.some(skill => 
            skill.toLowerCase().includes(filters.skill!.toLowerCase())
          )
        );
      }

      if (filters.location) {
        filteredUsers = filteredUsers.filter(user =>
          user.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }

      if (filters.availability && filters.availability !== 'all') {
        filteredUsers = filteredUsers.filter(user =>
          user.availability === filters.availability
        );
      }

      setUsers(filteredUsers);
      setTotalPages(Math.ceil(filteredUsers.length / filters.limit));
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value, // Reset to first page when changing filters
    }));
  };

  const handleViewProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const handleRequestSwap = (userId: string) => {
    navigate(`/swaps/new?userId=${userId}`);
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

      {isLoading ? (
        <div className={styles.loading}>
          <LoadingSpinner size="lg" text="Loading users..." />
        </div>
      ) : (
        <>
          <div className={styles.results}>
            <p className={styles.resultsCount}>
              Found {users.length} user{users.length !== 1 ? 's' : ''}
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

          {users.length === 0 && !isLoading && (
            <div className={styles.noResults}>
              <p>No users found matching your criteria.</p>
              <Button
                variant="secondary"
                onClick={() => setFilters({
                  skill: '',
                  location: '',
                  availability: '',
                  page: 1,
                  limit: 12,
                })}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={(page) => handleFilterChange('page', page)}
              showInfo
              totalItems={users.length}
              itemsPerPage={filters.limit}
            />
          )}
        </>
      )}
    </div>
  );
};