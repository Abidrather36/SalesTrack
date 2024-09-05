import { toast } from "react-toastify";
class Toaster{

    showSuccessToast=(message)=>{
        toast.success(message)
    }
    showErrorToast=(message)=>{
        toast.error(message)
    }
}
const myToaster=new Toaster();
export default myToaster;