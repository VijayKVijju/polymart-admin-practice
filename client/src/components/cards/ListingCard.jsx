const ListingCard = ({ item }) => {
  return (
    <div className="listing-card">
      <div className="listing-card-title">
        {item.polymerGrade}
      </div>

      <div className="listing-card-subtitle">
        {item.polymerType} / Film Grade
      </div>
    </div>
  );
};

export default ListingCard;