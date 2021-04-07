import { useDispatch } from "react-redux";
import { emptyReportList } from "../features/basic_report/actions";
import { logOut } from "../features/login/actions";
import { emptyUploadFile } from "../store/file/actions";
 
export function logout() {
  const dispatch = useDispatch();
  dispatch(emptyUploadFile());
  dispatch(emptyReportList());
  dispatch(logOut());
}