import React, { useContext } from "react";
import NewsComponents from "../components/NewsComponents";
import GridCard from "../components/GridCard";
import { Context } from "../context/Context";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Category = () => {
  const location = useLocation();
  const state = location.state || {}; // Retrieve the state or default to an empty object
  const query = state.query || ""; // Access the query property from the state
  const [categories, setCategories] = useState();

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:8000/api/news/search/${query}`)
        .then((response) => {
          setCategories(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [query]);
  const nextData = categories && categories.filter((category, i) => i > 4);
  console.log(nextData);

  const context = useContext(Context);
  const language = context.langValue.category;

  return (
    <main className="flex-start">
      <div className="news">
        <h1 className="center">
          {language && language.pageName}
          <span className="inside-span">{query}</span>
        </h1>

        <NewsComponents data={categories} title={false} />
        <GridCard data={nextData} />
      </div>
    </main>
  );
};

export default Category;
