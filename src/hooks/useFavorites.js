import React from "react";

const STORAGE_KEY = 'surfcam_magician_favorites';

function getFavoritesMap() {
  const favoritesString = window.localStorage.getItem(STORAGE_KEY) || '{}';
  return JSON.parse(favoritesString);
}

function addFavorite(spotId, title) {
  const map = getFavoritesMap();
  map[spotId] = title || spotId;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  return map;
}

function removeFavorite(spotId) {
  const map = getFavoritesMap();
  delete map[spotId];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  return map;
}

export function useFavorites() {
  const [favoritesMap, setFavorites] = React.useState(getFavoritesMap());
  const add = (spotId, title) => setFavorites(addFavorite(spotId, title));
  const remove = (spotId) => setFavorites(removeFavorite(spotId));
  return { favoritesMap, addFavorite: add, removeFavorite: remove };
}
