import { useState } from "react";

const STORAGE_KEY = "surfcam_magician_favorites";

function getFavorites() {
  const favoritesString = window.localStorage.getItem(STORAGE_KEY) || "{}";

  return JSON.parse(favoritesString);
}

function addFavorite(spotId, title) {
  const map = getFavorites();
  map[spotId] = title || spotId;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));

  return map;
}

function removeFavorite(spotId) {
  const map = getFavorites();
  delete map[spotId];

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));

  return map;
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState(getFavorites());
  const add = (spotId, title) => setFavorites(addFavorite(spotId, title));
  const remove = (spotId) => setFavorites(removeFavorite(spotId));

  return { favorites, addFavorite: add, removeFavorite: remove };
}
