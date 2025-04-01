import { NavbarContainer } from "./subcomponents/NavbarContainer";
import { ButtonsPart } from "./subcomponents/navbar-parts/buttons-part/buttons-part";
import { ButtonsPartMobile } from "./subcomponents/navbar-parts/buttons-part/buttons-part-mobile";
import { LogoPart } from "./subcomponents/navbar-parts/logo-part/logo-part";
import { UserPart } from "./subcomponents/navbar-parts/user-part/user-part";

export const Navbar = () => {
  return (
    <NavbarContainer>
      <ButtonsPart />
      <LogoPart />
      <div className="flex justify-self-end items-center gap-2">
        <ButtonsPartMobile />
        <UserPart />
      </div>
    </NavbarContainer>
  );
};
