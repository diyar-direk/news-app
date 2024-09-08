import React, { useContext, useEffect, useState } from "react";
import NewsComponents from "../components/NewsComponents";
import GridCard from "../components/GridCard";
import { Context } from "../context/Context";
import axios from "axios";
const Category = () => {
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
          <span className="inside-span"> link1</span>
        </h1>
        <NewsComponents
          data={dataCatgoreys && dataCatgoreys.Sports}
          title={false}
        />
        <GridCard />
      </div>
    </main>
  );
};

export default Category;
