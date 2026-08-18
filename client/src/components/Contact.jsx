import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch landlord");
        }

        setLandlord(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Error fetching landlord information");
        setLoading(false);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);

  const sendMessage = () => {
    if (!message.trim()) {
      alert("Please enter a message first.");
      return;
    }

    const recipient = landlord.email;
    const subject = encodeURIComponent(`Regarding ${listing.name}`);
    const body = encodeURIComponent(message);

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}` +
      `&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank");
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        landlord && (
          <div className="flex flex-col gap-2">
            <p>
              Contact{" "}
              <span className="font-semibold">
                {landlord.username}
              </span>{" "}
              for{" "}
              <span className="font-semibold">
                {listing.name.toLowerCase()}
              </span>
            </p>

            <textarea
              name="message"
              id="message"
              rows="4"
              value={message}
              onChange={onChange}
              placeholder="Enter your message here..."
              className="w-full border p-3 rounded-lg"
            ></textarea>

            <button
              type="button"
              onClick={sendMessage}
              className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            >
              Send Message
            </button>
          </div>
        )
      )}
    </>
  );
};

Contact.propTypes = {
  listing: PropTypes.shape({
    userRef: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contact;