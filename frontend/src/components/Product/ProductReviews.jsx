import { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";

function ProductReviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Anjali Sharma",
      rating: 5,
      comment:
        "Beautiful craftsmanship! The detailing is excellent and packaging was eco-friendly.",
    },
    {
      id: 2,
      name: "Rohit Meena",
      rating: 4,
      comment:
        "Looks even better in real life. Delivery was slightly delayed but worth it.",
    },
  ]);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const handleSubmit = () => {
    if (!rating || !comment.trim()) return;

    const newReview = {
      id: Date.now(),
      name: "You", // replace later with logged-in user
      rating,
      comment,
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold text-primary mb-6">
        Ratings & Reviews
      </h2>

      {/* SUMMARY */}
      <Card className="mb-8 flex items-center gap-6">
        <p className="text-3xl font-bold text-primary">
          {averageRating.toFixed(1)} ★
        </p>
        <p className="text-sm text-gray-600">
          Based on {reviews.length} reviews
        </p>
      </Card>

      {/* ADD REVIEW */}
      <Card className="mb-10">
        <h3 className="font-semibold text-primary mb-4">
          Write a Review
        </h3>

        {/* STAR RATING */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl ${star <= rating
                  ? "text-yellow-500"
                  : "text-gray-300"
                }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* COMMENT */}
        <textarea
          rows="4"
          placeholder="Share your experience with this product..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent mb-4"
        />

        <Button
          title="Submit Review"
          onClick={handleSubmit}
          className="max-w-xs"
        />
      </Card>

      {/* REVIEWS LIST */}
      <div className="space-y-4">
        {reviews.map(review => (
          <Card key={review.id}>
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-primary">
                {review.name}
              </p>
              <p className="text-sm text-yellow-600">
                {"★".repeat(review.rating)}
              </p>
            </div>

            <p className="text-sm text-gray-600">
              {review.comment}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProductReviews;
