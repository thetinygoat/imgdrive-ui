import { useState, useEffect } from "react";
import FileView from "../../components/FileView";
import FolderView from "../../components/FolderView";
import Layout from "../../components/Layout";
import { getChildren } from "../../utils/api";
import { Spinner } from "@chakra-ui/react";
import ControlBar from "../../components/ControlBar";
import { useFiles, useFolders } from "../../hooks/zustand";
export default function FolderTemplate({ id }) {
  const updateFiles = useFiles((state) => state.updateFiles);
  const updateFolders = useFolders((state) => state.updateFolders);
  useEffect(() => {
    getChildren(id).then(({ data }) => {
      updateFiles(data.files);
      updateFolders(data.folders);
    });
  }, [id]);
  return (
    <Layout>
      <ControlBar parent={id} />
      <FolderView />
      <FileView />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { id: params.id } };
}
