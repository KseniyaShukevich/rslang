import toastr from "toastr";
import "toastr/build/toastr.min.css";

export default (message: string, type = MessageType.Error) => {
  toastr.options = {
    positionClass: "toast-top-center",
    hideDuration: 1500,
    timeOut: 1500
  };
  toastr.clear();
  setTimeout(() => toastr[type](message), 200);
};

enum MessageType {
  Error = 'error',
  Success = 'success'
}
