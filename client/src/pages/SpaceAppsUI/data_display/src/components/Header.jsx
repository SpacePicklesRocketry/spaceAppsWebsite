import React from 'react';

export default function Header({ mission, overallStatus }) {
  return (
    <div className="header">
      <div className="header-left">
        <div className="header-title-row">
          <h1>{mission?.name || 'Mock Space Module'}</h1>
          <div className={`status-badge ${overallStatus?.toLowerCase() || 'unknown'}`}>Status: {overallStatus || 'UNKNOWN'}</div>
        </div>
      </div>
      <div className="header-right">
      </div>
    </div>
  );
}
