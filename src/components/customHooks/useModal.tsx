import React from "react";

// создаем кастомный хук, где

export default () => {
  let [modal, setModal] = React.useState(false); // состяеие модальноего окна (открыт - true, закрыт - false)
  let [modalContent, setModalContent] = React.useState({}); // состояние содержимого модального окна

  let handleModal = (content = false) => {
    // в данном случае мы задаём значение по умолчанию
    // То есть, чтобы закрыть модальное окно достаточно вызвать handleModal без аргументов, и тогда значение content примет false
    // И наше окно закроется
    // Но если мы желаем открыть модалку с определнным содержанием, в функцию должен передавать один аргумент, который и будет являться контентом
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
  };

  return { modal, handleModal, modalContent };
};