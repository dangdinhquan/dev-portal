import { Box, Container, Flex, HStack, Icon, Menu, MenuItem, NoSsr, Pressable } from '@stoplight/mosaic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { usePrefetchOnHover } from '../hooks';
import { ThemeSwitcher } from './ThemeSwitcher';

const SiteHeaderLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const router = useRouter();

  const currentPath = router.asPath;
  const isActive = currentPath === to || currentPath.startsWith(to);

  return (
    <Link href={to} prefetch={false} passHref>
      <Box as="a" {...usePrefetchOnHover(to)} noFocusRing textDecoration="no-underline">
        <Box
          fontSize="lg"
          color={isActive ? undefined : { default: 'muted', hover: 'primary' }}
          fontWeight={isActive ? 'semibold' : undefined}
          py={2}
        >
          {children}
        </Box>
      </Box>
    </Link>
  );
};

const SiteHeaderMenuLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const router = useRouter();

  const currentPath = router.asPath;
  const isActive = currentPath === to || currentPath.startsWith(to);

  return (
    <Link href={to} prefetch={false} passHref>
      <Box
        as="a"
        {...usePrefetchOnHover(to)}
        noFocusRing
        textDecoration="no-underline"
        fontWeight={isActive ? 'semibold' : undefined}
        color={{ default: isActive ? 'primary' : undefined, hover: 'on-primary' }}
      >
        {children}
      </Box>
    </Link>
  );
};

const SiteHeader = React.memo(() => {
  // mosaic doesn't yet support `fak` (custom kit icons)
  // @ts-expect-error
  const icon = <Icon icon={['fak', 'stoplight']} />;
  const router = useRouter();

  console.info('SiteHeader.render');

  return (
    <Flex as="header" alignItems="center" borderB style={{ height: 70 }}>
      <Container as={Flex} size="xl">
        <HStack flexGrow spacing={6}>
          <Link href="/" prefetch={false}>
            <a {...usePrefetchOnHover('/')} className="sl-no-focus-ring">
              <Box fontSize="4xl" mt={-0.5}>
                {icon}
              </Box>
            </a>
          </Link>

          <HStack spacing={4}>
            <SiteHeaderLink to="/docs/platform/b.overview.md">Docs</SiteHeaderLink>
            <SiteHeaderLink to="/guides">Guides</SiteHeaderLink>

            <Menu
              label="Reference"
              trigger={
                <Pressable>
                  <Box fontSize="lg" color={{ default: 'muted', hover: 'primary' }} py={2}>
                    Reference
                  </Box>
                </Pressable>
              }
            >
              <MenuItem
                text={<SiteHeaderMenuLink to="/docs/spectral/README.md">Styleguides with Spectral</SiteHeaderMenuLink>}
                onClick={() => {
                  // TODO: This is a hack because the text prop doesn't allow filling the entire row. This there's a space to the right that's unclickable by the link
                  router.push('/docs/spectral/README.md');
                }}
              />

              <MenuItem
                text={<SiteHeaderMenuLink to="/docs/prism/README.md">Mock with Prism</SiteHeaderMenuLink>}
                onClick={() => {
                  // TODO: This is a hack because the text prop doesn't allow filling the entire row. This there's a space to the right that's unclickable by the link
                  router.push('/docs/prism/README.md');
                }}
              />

              <MenuItem
                text={
                  <SiteHeaderMenuLink to="/docs/elements/docs/introduction.md">Docs with Elements</SiteHeaderMenuLink>
                }
                onClick={() => {
                  // TODO: This is a hack because the text prop doesn't allow filling the entire row. This there's a space to the right that's unclickable by the link
                  router.push('/docs/elements/docs/introduction.md');
                }}
              />

              <MenuItem
                text={<SiteHeaderMenuLink to="/docs/cli/README.md">Stoplight CLI</SiteHeaderMenuLink>}
                onClick={() => {
                  // TODO: This is a hack because the text prop doesn't allow filling the entire row. This there's a space to the right that's unclickable by the link
                  router.push('/docs/cli/README.md');
                }}
              />

              <MenuItem
                text={<SiteHeaderMenuLink to="/docs/platform-api/openapi.v1.yaml">Stoplight API</SiteHeaderMenuLink>}
                onClick={() => {
                  // TODO: This is a hack because the text prop doesn't allow filling the entire row. This there's a space to the right that's unclickable by the link
                  router.push('/docs/platform-api/openapi.v1.yaml');
                }}
              />
            </Menu>
          </HStack>
        </HStack>

        <HStack spacing={4}>
          <SiteHeaderLink to="https://stoplight.io/blog">Blog</SiteHeaderLink>
          <SiteHeaderLink to="/support">Support</SiteHeaderLink>
          <SiteHeaderLink to="https://stoplight.io/welcome">Sign In</SiteHeaderLink>
          <NoSsr>
            <ThemeSwitcher />
          </NoSsr>
        </HStack>
      </Container>
    </Flex>
  );
});

export default SiteHeader;
