import { useState, useEffect } from "react";
import FolderView from "../components/FolderView";
import FileView from "../components/FileView";
import Layout from "../components/Layout";
import { getRootData } from "../utils/api";
import { Spinner } from "@chakra-ui/react";
import ControlBar from "../components/ControlBar";
import { useFiles, useFolders } from "../hooks/zustand";
import Head from "next/head";

export default function index() {
  const updateFolders = useFolders((state) => state.updateFolders);
  const updateFiles = useFiles((state) => state.updateFiles);
  useEffect(() => {
    getRootData().then(({ data }) => {
      updateFiles(data.files);
      updateFolders(data.folders);
    });
  }, []);
  return (
    <Layout>
      <Head>
        <title>ImgDrive</title>
      </Head>
      <ControlBar parent={null} />
      <FolderView />
      <FileView />
    </Layout>
  );
}
