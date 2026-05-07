import { useAlert } from "../../../Context/AlertContext";
import { logoutService, updatePasswordUserService } from "../../../services/user.service";
import { FormUserPasswordChange } from "../../Forms/Usuarios/FormUserPasswordChange/FormUserPasswordChange";

export function UsuarioMain() {
   return(
      <FormUserPasswordChange/>
   )
}