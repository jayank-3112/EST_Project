import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDisasterById } from '../services/api.js';
import '../styles/DisasterDetails.css';

const DisasterDetails = () => {
  const { id } = useParams();
  const [disaster, setDisaster] = useState(null);

  useEffect(() => {
    const getDisaster = async () => {
      try {
        const result = await fetchDisasterById(id);
        setDisaster(result.data);
      } catch (error) {
        console.error("Error fetching disaster details:", error);
      }
    };
    getDisaster();
  }, [id]);

  if (!disaster) return <p className="loading">Loading...</p>;

  return (
    <div className="disaster-details">
      <h2>{disaster.name}</h2>
      <p>{disaster.description}</p>
      <h4>Impact:</h4>
      <p>{disaster.impact}</p>
      <h4>Associated Climate Change:</h4>
      {disaster.climateChange ? (
        <p>
          <a href={`/climate-change/${disaster.climateChange}`}>
            View Climate Change Details
          </a>
        </p>
      ) : (
        <p>No associated climate change found.</p>
      )}
    </div>
  );
};

export default DisasterDetails;
