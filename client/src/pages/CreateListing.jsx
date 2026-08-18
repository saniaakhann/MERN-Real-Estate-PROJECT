import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(formData);

  /* =========================
     CLOUDINARY IMAGE UPLOAD
     ========================= */

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      return setImageUploadError("Please select at least one image");
    }

    if (files.length + formData.imageUrls.length > 6) {
      return setImageUploadError(
        "You can only upload 6 images per listing"
      );
    }

    try {
      setUploading(true);
      setImageUploadError(false);

      const uploadPromises = Array.from(files).map((file) =>
        storeImage(file)
      );

      const urls = await Promise.all(uploadPromises);

      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls],
      }));

      setImageUploadError(false);
    } catch (err) {
      console.error("CLOUDINARY UPLOAD ERROR:", err);
      setImageUploadError(
        err.message || "Image upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  /* =========================
     STORE IMAGE IN CLOUDINARY
     ========================= */

  const storeImage = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error(
        "Cloudinary environment variables are missing"
      );
    }

    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Cloudinary response:", result);

      throw new Error(
        result.error?.message || "Cloudinary image upload failed"
      );
    }

    return result.secure_url;
  };

  /* =========================
     REMOVE IMAGE
     ========================= */

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  /* =========================
     HANDLE FORM CHANGE
     ========================= */

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData((prev) => ({
        ...prev,
        type: e.target.id,
      }));
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.checked,
      }));
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };

  /* =========================
     CREATE LISTING
     ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1) {
        return setError("You must upload at least one image");
      }

      if (+formData.regularPrice < +formData.discountPrice) {
        return setError(
          "Discount price must be lower than regular price"
        );
      }

      setLoading(true);
      setError(false);

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();

      setLoading(false);

      if (data.success === false) {
        setError(data.message);
        return;
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4"
      >
        {/* ================= LEFT SIDE ================= */}

        <div className="flex flex-col gap-4 flex-1">

          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />

          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          {/* TYPE OPTIONS */}

          <div className="flex gap-6 flex-wrap">

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>

          </div>

          {/* BED / BATH / PRICE */}

          <div className="flex flex-wrap gap-6">

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>

            <div className="flex items-center gap-2">

              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />

              <div className="flex flex-col items-center">
                <p>Regular price</p>

                {formData.type === "rent" && (
                  <span className="text-xs">
                    ($ / month)
                  </span>
                )}
              </div>

            </div>

            {formData.offer && (
              <div className="flex items-center gap-2">

                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />

                <div className="flex flex-col items-center">
                  <p>Discounted price</p>

                  {formData.type === "rent" && (
                    <span className="text-xs">
                      ($ / month)
                    </span>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex flex-col flex-1 gap-4">

          <p className="font-semibold">
            Images:

            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className="flex gap-4">

            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />

            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>

          </div>

          {/* UPLOAD ERROR */}

          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>

          {/* IMAGE PREVIEW */}

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >

                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>

              </div>
            ))}

          {/* CREATE LISTING */}

          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create listing"}
          </button>

          {error && (
            <p className="text-red-700 text-sm">
              {error}
            </p>
          )}

        </div>
      </form>
    </main>
  );
}