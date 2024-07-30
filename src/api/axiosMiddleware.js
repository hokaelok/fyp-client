import { toast } from "sonner";

export const axiosMiddleware = () => (next) => async (action) => {
  if (action.type.endsWith('/rejected')) {
    const notify = action.payload?.notify;
    if (notify) {
      toast(notify.title, {
        description: notify.description,
        type: 'error'
      });
    }
  } else if (action.type.endsWith('/fulfilled')) {
    const notify = action.payload?.notify;
    if (notify) {
      toast(notify.title, {
        description: notify.description,
        type: 'success'
      });
    }
  }

  return next(action);
};