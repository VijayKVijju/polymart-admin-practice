import { useEffect, useState } from "react";

// API service
import { fetchListings } from "../services/listingService";

// Card component
import ListingCard from "../components/cards/ListingCard";

// Styles
import "../styles/ListingManagement.css";

const ListingManagement = () => {
  const [pendingListings, setPendingListings] = useState([]);
  const [liveListings, setLiveListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      const listings = await fetchListings();

      setPendingListings(
        listings.filter(item => item.status !== "active")
      );

      setLiveListings(
        listings.filter(item => item.status === "active")
      );
    } catch (error) {
      console.error("❌ Failed to load listings:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="loading-text">Loading listings...</p>;
  }

  return (
    <div className="listing-container">

      {/* Pending Listings */}
      <h3 className="section-title">Pending Listings</h3>
      <div className="listing-grid">
        {pendingListings.map(item => (
          <ListingCard key={item._id} item={item} />
        ))}
      </div>

      {/* Live Offers */}
      <h3 className="section-title">Live Offers</h3>
      <div className="listing-grid">
        {liveListings.map(item => (
          <ListingCard key={item._id} item={item} />
        ))}
      </div>

    </div>
  );
};

export default ListingManagement;