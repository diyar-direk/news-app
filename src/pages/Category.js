import React from "react";
import NewsComponents from "../components/NewsComponents";
import GridCard from "../components/GridCard";
const Category = () => {
  return (
    <main className="flex-start">
      <div className="news">
        <h1 className="center">category : link1</h1>
        <NewsComponents title={false} />
        <GridCard />
      </div>
    </main>
  );
};

export default Category;
