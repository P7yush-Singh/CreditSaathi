import Link from "next/link";

const CardItem = ({ id, name, image, features, link }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex flex-col items-center text-center">
      <img
        src={image}
        alt={name}
        className="w-32 h-20 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <ul className="text-sm text-gray-600 dark:text-gray-300 mb-4 list-disc list-inside">
        {features.slice(0, 3).map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      <Link
        href={`/cards/${id}`}
        className="mt-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"
      >
        View Details
      </Link>
    </div>
  );
};

export default CardItem;
