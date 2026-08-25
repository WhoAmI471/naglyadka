import type { CSSProperties } from 'react';

/** Pill toggle used for filters, theme and language switches. */
export function chip(on: boolean): CSSProperties {
  return {
    padding: '6px 12px',
    borderRadius: 20,
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 12,
    fontWeight: 600,
    transition: 'all 0.18s ease',
    ...(on
      ? { border: '1px solid var(--primary)', background: 'var(--primary-soft)', color: 'var(--primary)' }
      : { border: '1px solid var(--line)', background: 'transparent', color: 'var(--muted)' }),
  };
}

/** Elevated clickable surface — subject cards and aid cards. */
export const card: CSSProperties = {
  padding: 16,
  border: '1px solid var(--line)',
  borderRadius: 16,
  background: 'var(--card)',
  backdropFilter: 'blur(6px)',
  boxShadow: 'var(--shadow)',
  cursor: 'pointer',
  transition: 'transform 0.18s ease, border-color 0.18s ease',
  display: 'block',
  color: 'inherit',
  textAlign: 'left',
};

/** "interactive" / "soon" marker on an aid card. */
export function badge(live: boolean): CSSProperties {
  return {
    padding: '3px 8px',
    borderRadius: 20,
    fontSize: 10.5,
    fontWeight: 600,
    ...(live
      ? { background: 'var(--primary-soft)', color: 'var(--primary)' }
      : { border: '1px solid var(--line)', color: 'var(--dim)' }),
  };
}

export const sectionLabel: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--dim)',
};

export const sidebarLabel: CSSProperties = {
  fontSize: 10.5,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--dim)',
};

export const panel: CSSProperties = {
  border: '1px solid var(--line)',
  borderRadius: 16,
  background: 'var(--card)',
  padding: 16,
};

export const softPanel: CSSProperties = {
  border: '1px solid var(--line)',
  borderRadius: 16,
  background: 'var(--card-2)',
  padding: 18,
};

export const smallChip: CSSProperties = {
  padding: '3px 8px',
  borderRadius: 20,
  fontSize: 10.5,
  fontWeight: 600,
  border: '1px solid var(--line)',
  color: 'var(--muted)',
};

export const gradientSquare = (size: number, radius: number, font: number): CSSProperties => ({
  width: size,
  height: size,
  flex: `0 0 ${size}px`,
  borderRadius: radius,
  background: 'linear-gradient(135deg, #1f6feb, #7047ef)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: font,
  fontWeight: 700,
});

export const primaryButton: CSSProperties = {
  padding: '9px 16px',
  borderRadius: 10,
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 12.5,
  fontWeight: 600,
  color: '#fff',
  background: 'linear-gradient(135deg, #1f6feb, #7047ef)',
  boxShadow: '0 4px 14px rgba(31,111,235,0.32)',
};

export const ghostButton: CSSProperties = {
  padding: '9px 16px',
  borderRadius: 10,
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 12.5,
  fontWeight: 600,
  color: 'var(--text)',
  background: 'var(--card)',
  border: '1px solid var(--line-2)',
  transition: 'border-color 0.18s ease',
};

export const backLink: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 12.5,
  color: 'var(--dim)',
  cursor: 'pointer',
  transition: 'color 0.18s ease',
};
