import { Heart, HeartPulse, Soup } from "lucide-react";
import { useState, useEffect } from "react";

const getTwoValuesFromArray = (arr) => {
    return arr.length > 1 ? [arr[0], arr[1]] : arr; // Ensure to handle cases with fewer than 2 items
};

const RecipeCard = ({ recipe, bg, badge }) => {
    const healthLabels = getTwoValuesFromArray(recipe.healthLabels);
    const [isFavorite, setIsFavorite] = useState(false);

    // Use useEffect to check if the recipe is a favorite on mount
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.some((fav) => fav.label === recipe.label));
    }, [recipe.label]);

    const addRecipeToFavorites = () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isRecipeAlreadyInFavorites = favorites.some((fav) => fav.label === recipe.label);

        if (isRecipeAlreadyInFavorites) {
            favorites = favorites.filter((fav) => fav.label !== recipe.label);
            setIsFavorite(false);
        } else {
            favorites.push(recipe);
            setIsFavorite(true);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    return (
        <div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}>
            <a
                href={recipe.url || `https://www.youtube.com/results?search_query=${recipe.label} recipe`}
                target='_blank'
                rel='noopener noreferrer'
                className='relative h-32'
            >
                <div className='skeleton absolute inset-0' />
                <img
                    src={recipe.image}
                    alt='recipe img'
                    className='rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500'
                    onLoad={(e) => {
                        e.currentTarget.style.opacity = 1;
                        e.currentTarget.previousElementSibling.style.display = "none";
                    }}
                />
                <div className='absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm'>
                    <Soup size={16} /> {recipe.yield} Servings
                </div>

                <div
                    className='absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer'
                    onClick={(e) => {
                        e.preventDefault();
                        addRecipeToFavorites();
                    }}
                >
                    {!isFavorite ? (
                        <Heart size={20} className='hover:fill-red-500 hover:text-red-500' />
                    ) : (
                        <Heart size={20} className='fill-red-500 text-red-500' />
                    )}
                </div>
            </a>

            <div className='flex mt-1'>
                <p className='font-bold tracking-wide'>{recipe.label}</p>
            </div>
            <p className='my-2'>
                {recipe.cuisineType[0].charAt(0).toUpperCase() + recipe.cuisineType[0].slice(1)} Kitchen
            </p>

            <div className='flex gap-2 mt-auto'>
                {healthLabels.map((label, idx) => (
                    <div key={idx} className={`flex gap-1 ${badge} items-center p-1 rounded-md`}>
                        <HeartPulse size={16} />
                        <span className='text-sm tracking-tighter font-semibold'>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeCard;
