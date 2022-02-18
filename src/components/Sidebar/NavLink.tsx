import { ElementType } from 'react';
import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ActiveLink } from '../ActiveLink';

interface PropsNavLink extends ChakraLinkProps {
  text: string;
  href: string;
  icon: ElementType;
}

export function NavLink({ icon, text, href, ...rest }: PropsNavLink) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink
        display="flex"
        align="center"
        {...rest}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{text}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}