import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchClimateChangeById } from '../services/api.js';
import "../styles/ClimateChangeDetails.css";

const ClimateChangeDetails = () => {
  const { id } = useParams();
  const [climateChange, setClimateChange] = useState(null);

  useEffect(() => {
    const getClimateChange = async () => {
      const result = await fetchClimateChangeById(id);
      setClimateChange(result.data);
    };
    getClimateChange();
  }, [id]);

  if (!climateChange) return <p className="loading">Loading...</p>;

  return (
    <div className="climate-change-details">
      <h2>{climateChange.name}</h2>
      <p>{climateChange.description}</p>
      <h3>Causes:</h3>
      <p>{climateChange.causes.join(', ')}</p>
      <h4>Disasters:</h4>
      <ul>
        {climateChange.disasters && climateChange.disasters.map((disaster) => (
          <li key={disaster._id}>
            <Link to={`/disaster/${disaster._id}`}>
              {disaster.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClimateChangeDetails;
