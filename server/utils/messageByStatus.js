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
