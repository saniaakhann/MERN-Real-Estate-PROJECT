import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  MdLocationOn,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";

export default function ListingItem({ listing }) {
  const { currentUser } = useSelector((state) => state.user);

  const [isFavorite, setIsFavorite] = useState(false);

  // Check saved favorite from the backend when the card loads
  useEffect(() => {
    const checkFavorite = async () => {
      if (!currentUser?._id || !listing?._id) {
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:3000/api/user/${currentUser._id}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok && data.favorites) {
          const alreadyFavorite = data.favorites.some(
            (id) => id.toString() === listing._id.toString()
          );

          setIsFavorite(alreadyFavorite);
        }
      } catch (error) {
        console.error("Failed to check favorite:", error);
      }
    };

    checkFavorite();
  }, [currentUser?._id, listing?._id]);

  // Add/remove favorite
  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await fetch(
        `http://localhost:3000/api/user/favorite/${listing._id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update favorite");
      }

      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Favorite error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="relative bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      {/* Favorite button */}
      <button
        onClick={handleFavorite}
        type="button"
        className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
        aria-label="Add to favorites"
      >
        {isFavorite ? (
          <MdFavorite className="text-red-500 text-2xl" />
        ) : (
          <MdFavoriteBorder className="text-slate-600 text-2xl" />
        )}
      </button>

      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />

        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>

          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>

          <p className="text-slate-500 mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>

          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>

            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    offer: PropTypes.bool.isRequired,
    discountPrice: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
  }).isRequired,
};