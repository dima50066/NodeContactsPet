import React from 'react';
import { FilterParams } from '../../types';

interface FilterAndSortProps {
  filterParams: FilterParams;
  setFilterParams: React.Dispatch<React.SetStateAction<FilterParams>>;
  isFavoriteChecked: boolean;
  setIsFavoriteChecked: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const FilterAndSort: React.FC<FilterAndSortProps> = ({
  filterParams,
  setFilterParams,
  isFavoriteChecked,
  setIsFavoriteChecked,
  searchTerm,
  setSearchTerm,
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFavoriteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavoriteChecked(e.target.checked);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleFilterChange}
        className="p-2 border border-gray-300 rounded mb-4 w-full max-w-xs"
      />

      <div className="mb-4">
        <label className="mr-2">Sort Order:</label>
        <select
          name="sortOrder"
          value={filterParams.sortOrder}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="asc">Sort Ascending</option>
          <option value="desc">Sort Descending</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2">Sort By:</label>
        <select
          name="sortBy"
          value={filterParams.sortBy}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="phoneNumber">Sort by Phone Number</option>
          <option value="email">Sort by Email</option>
          <option value="isFavourite">Sort by Favorite</option>
          <option value="contactType">Sort by Contact Type</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2">Contact Type:</label>
        <select
          name="contactType"
          value={filterParams.contactType}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="home">Home</option>
        </select>
      </div>

      <label className="inline-flex items-center mb-4">
        <input
          type="checkbox"
          checked={isFavoriteChecked}
          onChange={handleFavoriteChange}
          className="mr-2"
        />
        Show Favorites Only
      </label>
    </div>
  );
};

export default FilterAndSort;
