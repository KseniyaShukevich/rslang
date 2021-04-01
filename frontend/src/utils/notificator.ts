import toastr from "toastr";
import "toastr/build/toastr.min.css";

export default (message: string, type = MessageType.Error) => {
  toastr.options = {
    positionClass: "toast-top-right",
    hideDuration: 2000,
    timeOut: 2000
  };
  toastr.clear();
  toastr[type](message)
  // setTimeout(() => toastr[type](message), 200);
};

export enum MessageType {
  Error = 'error',
  Success = 'success'
}
