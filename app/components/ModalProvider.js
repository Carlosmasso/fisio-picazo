"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import AuthModal from "./AuthModal";

const ModalContext = createContext(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return ctx;
}

export default function ModalProvider({ children }) {
  const [modalType, setModalType] = useState(null);

  const openModal = useCallback((type) => setModalType(type), []);
  const closeModal = useCallback(() => setModalType(null), []);

  const value = useMemo(
    () => ({ modalType, openModal, closeModal }),
    [modalType, openModal, closeModal]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <AuthModal />
    </ModalContext.Provider>
  );
}
