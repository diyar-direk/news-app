import React, { useContext, useEffect, useState } from "react";
import NewsComponents from "../components/NewsComponents";
import GridCard from "../components/GridCard";

import axios from "axios";
import { useLocation } from "react-router-dom";
import { Context } from "../context/Context";

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

  const context = useContext(Context);
  const language = context.langValue.category;
  const [dataCatgoreys, setDataCatgoreys] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/news/categoriesNews")
      .then((res) => setDataCatgoreys(res.data.categories));
  }, []);

  return (
    <main className="flex-start">
      <div className="news">
        <h1 className="center">
          {language && language.pageName}
          <span className="inside-span">
            {categories && categories[0].category}
          </span>
        </h1>

        <GridCard />

        <NewsComponents data={categories} title={false} />
        <GridCard data={nextData} />
      </div>
    </main>
  );
};

export default Category;
