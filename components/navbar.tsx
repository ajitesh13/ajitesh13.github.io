import { forwardRef } from 'react'
import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
  Icon
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import { IoLogoGithub } from 'react-icons/io5'

interface LinkItemProps {
  href: string
  path: string
  target?: string
  children: React.ReactNode
  [key: string]: any
}

const LinkItem = ({
  href,
  path,
  target,
  children,
  ...props
}: LinkItemProps) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  const hoverBg = useColorModeValue('teal.50', 'whiteAlpha.300')

  return (
    <Link
      as={NextLink}
      href={href}
      scroll={false}
      p={2}
      position="relative"
      borderRadius="md"
      transition="all 0.2s ease"
      _hover={{
        textDecoration: 'none',
        bg: hoverBg,
        color: active ? 'teal.500' : useColorModeValue('teal.600', 'teal.200')
      }}
      _active={{
        bg: useColorModeValue('teal.100', 'whiteAlpha.400')
      }}
      color={active ? 'teal.500' : inactiveColor}
      fontWeight={active ? '600' : '400'}
      {...props}
    >
      {children}
      {active && (
        <Box
          position="absolute"
          bottom="-2px"
          left="0"
          right="0"
          height="2px"
          bg="teal.500"
          borderRadius="full"
          transform="scaleX(0.8)"
          transition="transform 0.3s ease"
          _groupHover={{
            transform: 'scaleX(1)'
          }}
        />
      )}
    </Link>
  )
}

const MenuLink = forwardRef<HTMLAnchorElement, any>((props, ref) => (
  <Link ref={ref} as={NextLink} {...props} />
))
MenuLink.displayName = 'MenuLink'

interface NavbarProps {
  path: string
  [key: string]: any
}

const Navbar = (props: NavbarProps) => {
  const { path } = props

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('whiteAlpha.300', 'blackAlpha.400')}
      css={{ backdropFilter: 'blur(10px)' }}
      boxShadow={useColorModeValue(
        '0 2px 10px rgba(0, 0, 0, 0.05)',
        '0 2px 10px rgba(0, 0, 0, 0.05)'
      )}
      zIndex={2}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/projects" path={path} target="">
            Projects
          </LinkItem>
          <LinkItem href="/resume" path={path} target="_blank">
            Resume
          </LinkItem>
          <LinkItem href="/blogs" path={path} target="">
            Blogs
          </LinkItem>
          <LinkItem href="/posts" path={path} target="">
            Through my lens
          </LinkItem>
          <LinkItem
            target="_blank"
            href="https://github.com/Ajitesh13"
            path={path}
          >
            <Icon as={IoLogoGithub} boxSize={5} />
          </LinkItem>
        </Stack>

        <Box flex={1} textAlign="right">
          <ThemeToggleButton />

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <MenuItem as={MenuLink} href="/">
                  About
                </MenuItem>
                <MenuItem as={MenuLink} href="/projects">
                  Projects
                </MenuItem>
                <MenuItem as={MenuLink} href="/resume" target="_blank">
                  Resume
                </MenuItem>
                <MenuItem as={MenuLink} href="/blogs">
                  Blogs
                </MenuItem>
                <MenuItem as={MenuLink} href="/posts">
                  Through my lens
                </MenuItem>
                <MenuItem as={MenuLink} href="https://github.com/Ajitesh13">
                  <Box display="flex" gap="10px" alignItems="center">
                    <Icon as={IoLogoGithub} />
                    Github
                  </Box>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
