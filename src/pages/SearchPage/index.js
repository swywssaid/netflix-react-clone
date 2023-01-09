import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
  const [searchResult, setSearchResult] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");

  useEffect(() => {
    if (searchTerm) fetchSearchMovie(searchTerm);
  }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      setSearchResult(request.data.results);
    } catch (err) {
      console.log("error", err);
    }
  };

  return <div></div>;
}
