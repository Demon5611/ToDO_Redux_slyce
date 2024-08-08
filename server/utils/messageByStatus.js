export default function messageByStatus(status) {
  switch (status) {
    case 'CONFIRMED':
      return 'Confirmed';
    case 'WRONG_CODE':
      return 'Wrong code';
    case 'EXPIRED':
      return 'Code expired';
    case 'NOT_FOUND':
      return 'Code not found';
    default:
      return status;
  }
}
// Функция messageByStatus упрощает процесс перевода кодов статуса в человекочитаемые сообщения:
// Отображение сообщений об ошибках пользователю.
// Преобразование внутренних кодов статуса в более понятные строки для логирования.
// Отображение состояния в пользовательском интерфейсе.
// позволяет централизованно управлять отображением сообщений, упрощая изменения и поддержание кода.
