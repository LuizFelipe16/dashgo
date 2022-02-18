import { Stack } from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine, RiOutletLine } from "react-icons/ri";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink text="Dashboard" href="/dashboard" icon={RiDashboardLine} />
        <NavLink text="Usuários" href="/users" icon={RiContactsLine} />
      </NavSection>
      {/* <NavSection title="AUTOMAÇÃO">
        <NavLink text="Formulários" href="/forms" icon={RiInputMethodLine} />
      </NavSection> */}
      <NavSection title="SISTEMA">
        <NavLink text="Sair" href="/" icon={RiOutletLine} />
      </NavSection>
    </Stack>
  );
}