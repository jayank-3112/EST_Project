import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchClimateChanges } from '../services/api.js';
import "../styles/ClimateChangeList.css";

const ClimateChangeList = () => {
  const [climateChanges, setClimateChanges] = useState([]);

  useEffect(() => {
    const getClimateChanges = async () => {
      const result = await fetchClimateChanges();
      setClimateChanges(result.data);
    };
    getClimateChanges();
  }, []);

  return (
    <div className="climate-change-list">
      <h1>Climate Changes in Indonesia</h1>
      <ul>
        {climateChanges.map((climateChange) => (
          <li key={climateChange._id}>
            <Link to={`/climate-change/${climateChange._id}`}>
              {climateChange.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClimateChangeList;
