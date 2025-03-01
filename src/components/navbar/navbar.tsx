import { NavbarContainer } from "./subcomponents/NavbarContainer";
import { ButtonsPart } from "./subcomponents/navbar-parts/buttons-part/buttons-part";
import { LogoPart } from "./subcomponents/navbar-parts/logo-part/logo-part";
import { UserPart } from "./subcomponents/navbar-parts/user-part/user-part";

export const Navbar = () => {
  return (
    <NavbarContainer>
      <ButtonsPart />
      <LogoPart />
      <UserPart />
    </NavbarContainer>
  );
};
