import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, MessageCircle, Star, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button/Button';
import { Card } from '../../components/common/Card/Card';
import styles from './Home.module.css';

const features = [
  {
    icon: <Users size={24} />,
    title: 'Connect with Learners',
    description: 'Find people who have skills you want to learn and offer your expertise in return.',
  },
  {
    icon: <MessageCircle size={24} />,
    title: 'Easy Communication',
    description: 'Send swap requests and coordinate learning sessions with built-in messaging.',
  },
  {
    icon: <Star size={24} />,
    title: 'Build Your Reputation',
    description: 'Rate and review swap partners to build trust in the community.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Safe & Secure',
    description: 'Verified profiles and secure platform ensure a safe learning environment.',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Web Developer',
    content: 'I learned Python from a data scientist while teaching them React. Amazing platform!',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    name: 'Mike Chen',
    role: 'Designer',
    content: 'The community here is incredible. I\'ve made lasting connections and learned so much.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
  {
    name: 'Emily Davis',
    role: 'Marketing Specialist',
    content: 'Skillsy helped me transition into tech by learning coding from experienced developers.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  },
];

export const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Exchange Skills,
              <br />
              <span className={styles.highlight}>Grow Together</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Connect with learners worldwide and swap skills in a collaborative community.
              Teach what you know, learn what you need.
            </p>
            <div className={styles.heroActions}>
              {isAuthenticated ? (
                <Link to="/browse">
                  <Button size="lg">
                    Start Browsing
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="ghost" size="lg">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className={styles.heroImage}>
            <img
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
              alt="People collaborating and learning together in a modern workspace"
              className={styles.heroImg}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose Skillsy?</h2>
          <p className={styles.sectionSubtitle}>
            Join thousands of learners who are already growing their skills through our platform
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Card key={index} className={styles.featureCard} hover>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3 className={styles.stepTitle}>Create Your Profile</h3>
            <p className={styles.stepDescription}>
              List the skills you can teach and what you want to learn
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3 className={styles.stepTitle}>Find Match</h3>
            <p className={styles.stepDescription}>
              Browse profiles and connect with people who complement your skills
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3 className={styles.stepTitle}>Start Learning</h3>
            <p className={styles.stepDescription}>
              Exchange knowledge through video calls, projects, or in-person meetups
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What Our Community Says</h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className={styles.testimonialCard}>
              <p className={styles.testimonialContent}>"{testimonial.content}"</p>
              <div className={styles.testimonialAuthor}>
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className={styles.testimonialAvatar}
                />
                <div>
                  <div className={styles.testimonialName}>{testimonial.name}</div>
                  <div className={styles.testimonialRole}>{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className={styles.cta}>
          <Card className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Ready to Start Learning?</h2>
            <p className={styles.ctaSubtitle}>
              Join our community of learners and start exchanging skills today
            </p>
            <div className={styles.ctaActions}>
              <Link to="/register">
                <Button size="lg">
                  Create Account
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      )}
    </div>
  );
};