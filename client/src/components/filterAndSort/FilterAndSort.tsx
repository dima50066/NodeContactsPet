import React from 'react';
import { FilterParams } from '../../types';
import { toast } from 'react-toastify';

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

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterParams((prev) => ({ ...prev, sortOrder: e.target.value as 'asc' | 'desc' }));
    toast.info(`Contacts sorted in ${e.target.value === 'asc' ? 'ascending' : 'descending'} order.`);
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterParams((prev) => ({ ...prev, sortBy: e.target.value }));
    toast.info(`Contacts sorted by ${e.target.value}.`);
  };

  const handleContactTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterParams((prev) => ({ ...prev, contactType: e.target.value }));
  };

  const handleIsFavoriteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavoriteChecked(e.target.checked);
    toast.info(e.target.checked ? 'Showing favorite contacts only.' : 'Showing all contacts.');
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
          value={filterParams.sortOrder}
          onChange={handleSortOrderChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="asc">Sort Ascending</option>
          <option value="desc">Sort Descending</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2">Sort By:</label>
        <select
          value={filterParams.sortBy}
          onChange={handleSortByChange}
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
          value={filterParams.contactType}
          onChange={handleContactTypeChange}
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
          onChange={handleIsFavoriteChange}
          className="mr-2"
        />
        Show Favorites Only
      </label>
    </div>
  );
};

export default FilterAndSort;
