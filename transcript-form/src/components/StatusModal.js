import { Modal } from "antd";

function StatusModal(title, content, status) {
  let secondsToGo = 30;
  // Modal is either equal to success or error
  const modal =
    // If a status is passed and it equals success
    status === "success"
      ? Modal.success({
          title: title,
          content: content,
        })
      : Modal.error({
          title: title,
          content: content,
        });
  const timer = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content,
    });
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
}

export default StatusModal;
