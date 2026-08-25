'use client';

import { useApp } from '@/context/AppContext';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '11px 18px',
        borderRadius: 12,
        border: '1px solid var(--line-2)',
        background: 'var(--card)',
        backdropFilter: 'blur(8px)',
        boxShadow: 'var(--shadow)',
        fontSize: 13,
        color: 'var(--text)',
        animation: 'toastin 0.22s ease',
        zIndex: 50,
      }}
    >
      {toast}
    </div>
  );
}
