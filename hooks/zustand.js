import create from "zustand";

export const useFolders = create((set) => ({
  folders: [],
  updateFolders: (newFolders) => set(() => ({ folders: newFolders })),
}));

export const useFiles = create((set) => ({
  files: [],
  updateFiles: (newFiles) => set(() => ({ files: newFiles })),
}));
