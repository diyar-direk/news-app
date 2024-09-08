import React, { useContext } from "react";
import NewsComponents from "../components/NewsComponents";
import GridCard from "../components/GridCard";
import { Context } from "../context/Context";
const Category = () => {
  const context = useContext(Context);
  const language = context.langValue.category;
  return (
    <main className="flex-start">
      <div className="news">
        <h1 className="center">
          {language && language.pageName}
          <span className="inside-span"> link1</span>
        </h1>
        <NewsComponents title={false} />
        <GridCard />
      </div>
    </main>
  );
};

export default Category;
