import React from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/Search";
import Head from "next/head";

export default function search() {
  return (
    <Layout>
      <Head>
        <title>Search</title>
      </Head>
      <SearchBar />
    </Layout>
  );
}
