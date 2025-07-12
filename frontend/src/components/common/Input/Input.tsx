import React, { forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    const inputClasses = [
      styles.input,
      leftIcon && styles.hasLeftIcon,
      rightIcon && styles.hasRightIcon,
      hasError && styles.error,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.container}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined
            }
            {...props}
          />
          {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
        </div>
        {error && (
          <p id={`${inputId}-error`} className={styles.errorText} role="alert">
            {error}
          </p>
        )}
        {helpText && !error && (
          <p id={`${inputId}-help`} className={styles.helpText}>
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';