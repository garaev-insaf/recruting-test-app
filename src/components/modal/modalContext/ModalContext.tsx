import React from "react";
import { createContext } from "react";
import useModal from "../../customHooks/useModal";
import Modal from "../Modal";

// объявляем наш контекст
let ModalContext;
let { Provider } = (ModalContext = createContext(null));

let ModalProvider = ({ children }) => {
    let { modal, handleModal, modalContent } = useModal(); // используем деструктиразию
    return (
        // оборачиваем в provider, чтобы все вложенные компоненты имели доступ к к контектсу
        // можно и без контекста, работать с redux, храня значения в нём, но context вполне заменяет его в данном случае
        <Provider value={{ modal, handleModal, modalContent }}>
            <Modal />
            {children}
        </Provider>
    );
};

export { ModalContext, ModalProvider };