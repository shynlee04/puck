'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/core/components/Button';
import styles from './styles.module.css';

function LoginPageContent() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || '/edit';

  useEffect(() => {
    // Check if already authenticated
    const session = document.cookie
      .split('; ')
      .find(row => row.startsWith('puck-edit-session='));

    if (session) {
      router.push(returnTo);
    }
  }, [router, returnTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_PASSWORD || 'puck-demo-2024';

    if (password === DEMO_PASSWORD) {
      // Set session cookie
      document.cookie = `puck-edit-session=${DEMO_PASSWORD}; path=/; max-age=86400; SameSite=lax`;
      router.push(returnTo);
    } else {
      setError('Invalid password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1>Puck Editor Login</h1>
          <p>Enter the password to access the page editor</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter demo password"
              required
              className={styles.passwordInput}
            />
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.submitButton}>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Access Editor'}
            </Button>
          </div>
        </form>

        <div className={styles.helpText}>
          <p>Demo password: <code>puck-demo-2024</code></p>
          <p>
            This is a demo authentication system. In production, replace this with proper authentication.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h1>Puck Editor Login</h1>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}