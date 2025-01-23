export const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1.5em"
        height="1.5em"
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}>
        <path
          fill="currentColor"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z"></path>
      </svg>
    ));
  };