import React, { useContext, useEffect, useState } from "react";
import NewsComponents from "../components/NewsComponents";
import GridCard from "../components/GridCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Context } from "../context/Context";
import Loader from "../components/Loader";

const Category = () => {
  const [categories, setCategories] = useState(null); // Initialize with null to differentiate between loading and loaded states
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(false); // Track if there's an error during the API call
  const param = useParams();
  const query = param.category;
  console.log(query);
  
  const context = useContext(Context);
  const lang = context.language;
  useEffect(() => {
    if (query) {
      setLoading(true); // Set loading to true before fetching data
      setError(false); // Reset error state before fetching
      axios
        .get(`http://localhost:8000/api/news/search/${query}?lang=${lang}`)
        .then((response) => {
          const data = response.data.data;
          if (data && data.length > 0) {
            setCategories(data); // Set the categories if results are found
          } else {
            setCategories([]); // Set categories to an empty array if no results found
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError(true); // Set error state if the API call fails
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching data
        });
    } else {
      setCategories([]); // Set categories to an empty array if no query is provided
      setLoading(false); // Set loading to false if no query
    }
  }, [query]);

  const nextData = categories && categories.filter((category, i) => i > 4);

  const language = context.langValue.category;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="center">
        An error occurred while fetching the data. Please try again later.
      </p>
    );
  }

  return (
    <main className="flex-start">
      <div className="news">
        <h1 className="center">
          {language && language.pageName}
          <span className="inside-span">{query}</span>
        </h1>

        {categories && categories.length > 0 ? (
          <>
            <NewsComponents data={categories} title={false} />
            {nextData && <GridCard data={nextData} />}
          </>
        ) : (
          !query || <p className="center">No results found for "{query}".</p>
        )}
      </div>
    </main>
  );
};

export default Category;
