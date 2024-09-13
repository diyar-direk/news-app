import React, { useContext, useEffect, useState } from "react";
import NewsComponents from "../components/NewsComponents";
import GridCard from "../components/GridCard";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import Loader from "../components/Loader";

const Category = () => {
  // const location = useLocation();
  // const state = location.state || {}; // Retrieve the state or default to an empty object
  // const query = state.query || ""; // Access the query property from the state

  const [categories, setCategories] = useState(null); // Initialize with null to differentiate between loading and loaded states
  const [loading, setLoading] = useState(true); // Track loading state
  const param = useParams();
  const query = param.category;

  useEffect(() => {
    console.log(query);

    if (query) {
      setLoading(true); // Set loading to true before fetching data
      axios
        .get(`http://localhost:8000/api/news/search/${query}`)
        .then((response) => {
          setCategories(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching data
        });
    } else {
      setCategories(null); // Reset categories if query is empty
      setLoading(false); // Set loading to false if no query
    }
  }, [query]);

  const nextData = categories && categories.filter((category, i) => i > 4);

  const context = useContext(Context);
  const language = context.langValue.category;

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="flex-start">
      <div className="news">
        <h1 className="center">
          {language && language.pageName}
          <span className="inside-span">
            {categories && categories[0].category}
          </span>
        </h1>

        <NewsComponents data={categories && categories} title={false} />
        {nextData && <GridCard data={nextData} />}
      </div>
    </main>
  );
};

export default Category;
