import React, { useState, useRef } from 'react';
import { Camera, MapPin, Mail, Calendar, Star, Users, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/common/Card/Card';
import { Button } from '../../components/common/Button/Button';
import { Input } from '../../components/common/Input/Input';
import styles from './Profile.module.css';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    skillsOffered: user?.skillsOffered?.join(', ') || '',
    skillsWanted: user?.skillsWanted?.join(', ') || '',
    isPublic: user?.isPublic || true,
  });
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit
      setEditData({
        name: user?.name || '',
        location: user?.location || '',
        skillsOffered: user?.skillsOffered?.join(', ') || '',
        skillsWanted: user?.skillsWanted?.join(', ') || '',
        isPublic: user?.isPublic || true,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        name: editData.name,
        location: editData.location,
        skillsOffered: editData.skillsOffered.split(',').map(s => s.trim()).filter(Boolean),
        skillsWanted: editData.skillsWanted.split(',').map(s => s.trim()).filter(Boolean),
        isPublic: editData.isPublic,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server
      const reader = new FileReader();
      reader.onload = () => {
        updateProfile({ profilePhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = (type: 'offered' | 'wanted') => {
    const skill = type === 'offered' ? newSkillOffered : newSkillWanted;
    if (!skill.trim()) return;

    if (type === 'offered') {
      const currentSkills = editData.skillsOffered ? editData.skillsOffered.split(',').map(s => s.trim()) : [];
      if (!currentSkills.includes(skill.trim())) {
        setEditData(prev => ({
          ...prev,
          skillsOffered: [...currentSkills, skill.trim()].join(', ')
        }));
      }
      setNewSkillOffered('');
    } else {
      const currentSkills = editData.skillsWanted ? editData.skillsWanted.split(',').map(s => s.trim()) : [];
      if (!currentSkills.includes(skill.trim())) {
        setEditData(prev => ({
          ...prev,
          skillsWanted: [...currentSkills, skill.trim()].join(', ')
        }));
      }
      setNewSkillWanted('');
    }
  };

  const removeSkill = (skillToRemove: string, type: 'offered' | 'wanted') => {
    if (type === 'offered') {
      const skills = editData.skillsOffered.split(',').map(s => s.trim()).filter(s => s !== skillToRemove);
      setEditData(prev => ({ ...prev, skillsOffered: skills.join(', ') }));
    } else {
      const skills = editData.skillsWanted.split(',').map(s => s.trim()).filter(s => s !== skillToRemove);
      setEditData(prev => ({ ...prev, skillsWanted: skills.join(', ') }));
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Card className={styles.profileCard}>
        <div className={styles.header}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarContainer}>
              <img
                src={user.profilePhoto || `https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop`}
                alt={user.name}
                className={styles.avatar}
              />
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={styles.photoButton}
                  aria-label="Change profile photo"
                >
                  <Camera size={16} />
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className={styles.hiddenInput}
            />
          </div>

          <div className={styles.info}>
            {isEditing ? (
              <Input
                value={editData.name}
                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                className={styles.nameInput}
              />
            ) : (
              <h1 className={styles.name}>{user.name}</h1>
            )}

            <div className={styles.details}>
              <div className={styles.detail}>
                <MapPin size={16} />
                {isEditing ? (
                  <Input
                    value={editData.location}
                    onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Location"
                  />
                ) : (
                  <span>{user.location}</span>
                )}
              </div>
              
              <div className={styles.detail}>
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
              
              <div className={styles.detail}>
                <Calendar size={16} />
                <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <Star size={16} />
                <span>{user.rating.toFixed(1)} rating</span>
              </div>
              <div className={styles.stat}>
                <Users size={16} />
                <span>{user.totalSwaps} swaps</span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            {isEditing ? (
              <>
                <Button variant="primary" onClick={handleSave}>
                  <Save size={16} />
                  Save
                </Button>
                <Button variant="secondary" onClick={handleEditToggle}>
                  <X size={16} />
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={handleEditToggle}>
                <Edit3 size={16} />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div className={styles.skillsGrid}>
        <Card className={styles.skillsCard}>
          <h2 className={styles.skillsTitle}>Skills I Offer</h2>
          {isEditing && (
            <div className={styles.addSkill}>
              <Input
                value={newSkillOffered}
                onChange={(e) => setNewSkillOffered(e.target.value)}
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === 'Enter' && addSkill('offered')}
              />
              <Button size="sm" onClick={() => addSkill('offered')}>
                Add
              </Button>
            </div>
          )}
          <div className={styles.skills}>
            {(isEditing ? editData.skillsOffered.split(',').map(s => s.trim()).filter(Boolean) : user.skillsOffered).map((skill, index) => (
              <div key={index} className={`${styles.skill} ${styles.offered}`}>
                {skill}
                {isEditing && (
                  <button
                    onClick={() => removeSkill(skill, 'offered')}
                    className={styles.removeSkill}
                    aria-label="Remove skill"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className={styles.skillsCard}>
          <h2 className={styles.skillsTitle}>Skills I Want</h2>
          {isEditing && (
            <div className={styles.addSkill}>
              <Input
                value={newSkillWanted}
                onChange={(e) => setNewSkillWanted(e.target.value)}
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === 'Enter' && addSkill('wanted')}
              />
              <Button size="sm" onClick={() => addSkill('wanted')}>
                Add
              </Button>
            </div>
          )}
          <div className={styles.skills}>
            {(isEditing ? editData.skillsWanted.split(',').map(s => s.trim()).filter(Boolean) : user.skillsWanted).map((skill, index) => (
              <div key={index} className={`${styles.skill} ${styles.wanted}`}>
                {skill}
                {isEditing && (
                  <button
                    onClick={() => removeSkill(skill, 'wanted')}
                    className={styles.removeSkill}
                    aria-label="Remove skill"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {isEditing && (
        <Card className={styles.settingsCard}>
          <h2 className={styles.settingsTitle}>Privacy Settings</h2>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={editData.isPublic}
              onChange={(e) => setEditData(prev => ({ ...prev, isPublic: e.target.checked }))}
            />
            <span>Make my profile public</span>
          </label>
        </Card>
      )}
    </div>
  );
};