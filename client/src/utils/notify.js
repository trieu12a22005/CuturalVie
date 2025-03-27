import {toast} from 'react-hot-toast'
export function notifyError(message) {
   return toast.error(message || "something went wrong");
}
export function notifySuccess(message) {
    return toast.success(message);
 }