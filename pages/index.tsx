import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  SimpleGrid,
  Button,
  List,
  ListItem,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronRightIcon, EmailIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'
import Image from 'next/image'

import { GridItem } from '../components/grid-item'
import thumbYouTube from '../public/images/links/youtube.png'
import thumbInkdrop from '../public/images/works/inkdrop_eyecatch.png'

const Home = () => (
  <Layout>
    <Container maxW="container.sm">
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        css={{ backdropFilter: 'blur(10px)' }}
      >
        Hello, I&apos;m a Indie Hacker from India!
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Ajitesh Panda
          </Heading>
          <p>Digital Craftsman ( Techie / Developer / Entrepreneur )</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <Image
              src="/images/takuya.jpg"
              alt="Profile image"
              width="100"
              height="100"
            />
          </Box>
        </Box>
      </Box>
      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
          Hi! Thanks a lot for visiting my site, My name is Ajitesh, and I am a
          software engineer currently working as an SDE2 at HackerRank. I
          completed my BTech in Computer Science and Engineering from IIIT
          Bhubaneswar, graduating in 2022. I am a web enthusiast with strong
          expertise in JavaScript and React, but I have also tinkered around
          with a variety of technologies such as LLMs, VLMs, Cloud Native,
          Blockchain,Flutter, Webextensions, and game development using Godot
          and Unity.
          <br />
          <br />I am a builder at heart and have a strong passion for
          entrepreneurship. I love to create exciting products in new
          technologies and would be thrilled to discuss any ideas that you are
          excited about.
        </Paragraph>
        <Box alignItems="center" my={4} display="flex" flexDirection="column">
          <Button
            as={NextLink}
            href="/works"
            scroll={false}
            rightIcon={<ChevronRightIcon />}
            colorScheme="teal"
          >
            My portfolio
          </Button>
        </Box>
      </Section>
      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <Box display="flex" flexDirection="column" paddingLeft="1.5em">
          <BioSection date="Nov, 2000">Born in Odisha, India.</BioSection>
          <BioSection date="Aug, 2018">
            Completed my High School and started my undergrad at IIIT in CSE
          </BioSection>
          <BioSection date="Oct, 2019">
            Started contributing to Mozilla in their WebExtensions and Devtools
            team
          </BioSection>
          <BioSection date="Feb, 2020">
            Got Level 2 Commit Access at Mozilla!
          </BioSection>
          <BioSection date="Aug, 2020">
            Elected as the Secretary of the{' '}
            <Link href="https://twitter.com/psociiit">
              Programming Society IIIT-Bh
            </Link>
          </BioSection>
          <BioSection date="Sept, 2020">
            Selected as a Fellow at{' '}
            <Link href="https://mlh.io">Major League Hacking</Link>
          </BioSection>
          <BioSection date="July, 2021">
            Started as an SDE Intern for{' '}
            <Link href="https://www.intervue.io">intervue.io</Link>
          </BioSection>
          <BioSection date="Jan, 2022">
            Started as an SDE Intern for{' '}
            <Link href="https://www.hackerrank.com/">HackerRank</Link>
          </BioSection>
          <BioSection date="July, 2022">
            Graduated from IIIT Bhubaneswar as BTech in CSE
          </BioSection>
          <BioSection date="Oct, 2023">
            Promoted to SDE2 at{' '}
            <Link href="https://www.hackerrank.com/">HackerRank</Link>
          </BioSection>
        </Box>
      </Section>
      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          I ♥
        </Heading>
        <Paragraph>
          Art, Music, Travelling, Photography and of course, building exciting
          Stuffs!
        </Paragraph>
      </Section>
      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          On the web
        </Heading>
        <List>
          <ListItem>
            <Link href="https://github.com/ajitesh13" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                @ajitesh13
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://twitter.com/iamAjiteshp" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoTwitter />}
              >
                @iamAjiteshp
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.instagram.com/_beingbest/" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoInstagram />}
              >
                @_beingbest
              </Button>
            </Link>
          </ListItem>
        </List>

        {/* <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <GridItem
            href="https://www.youtube.com/devaslife"
            title="Dev as Life"
            thumbnail={thumbYouTube}
          >
            My YouTube channel (&gt;150k subs)
          </GridItem>
          <GridItem
            href="https://www.inkdrop.app/"
            title="Inkdrop"
            thumbnail={thumbInkdrop}
          >
            A Markdown note-taking app
          </GridItem>
        </SimpleGrid>

        <Heading as="h3" variant="section-title">
          Newsletter
        </Heading>
        <p>
          Join me on a behind-the-scenes coding journey. Weekly updates on
          projects, tutorials, and videos
        </p> */}

        {/* <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="https://www.devas.life/"
            scroll={false}
            leftIcon={<EmailIcon />}
            colorScheme="teal"
          >
            Sign up my newsletter here
          </Button>
        </Box> */}
      </Section>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
