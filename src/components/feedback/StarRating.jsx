import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ value, onChange, label }) {
  return (
    <div>
      {label && (
        <label className="font-inter text-sm text-foreground/80 block mb-2">{label}</label>
      )}
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                star <= value
                  ? 'fill-primary text-primary'
                  : 'text-muted-foreground/30'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}