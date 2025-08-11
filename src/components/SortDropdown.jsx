import React from 'react';

const SORT_OPTIONS = [
  { value: 'none', label: 'Sort By' },
  { value: 'title-asc', label: 'Title A→Z' },
  { value: 'title-desc', label: 'Title Z→A' },
  { value: 'rating-desc', label: 'Rating High→Low' },
  { value: 'rating-asc', label: 'Rating Low→High' },
  { value: 'release-asc', label: 'Release Old→New' },
  { value: 'release-desc', label: 'Release New→Old' },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <select
      id="sort-select"
      className="form-select w-auto ms-auto"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Sort movies"
    >
      {SORT_OPTIONS.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
