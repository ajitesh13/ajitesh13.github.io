import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import VoxelDogLoader from '../voxel-dog-loader'

const LazyVoxelDog = dynamic(() => import('../voxel-dog'), {
  ssr: false,
  loading: () => <VoxelDogLoader />
})

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Explore the exciting journey of Ajitesh, a passionate techie and a builder by heart. With a strong passion of bringing ideas to life, he is always on the lookout for new challenges and opportunities. Connect with him to know more about his journey and projects."
        />
        <meta name="author" content="Ajitesh Panda" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
        <link rel="manifest" href="site.webmanifest" />
        <meta name="twitter:title" content="Ajitesh Panda" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@iamAjiteshp" />
        <meta property="og:site_name" content="Ajitesh Panda" />
        <meta name="og:title" content="Ajitesh Panda" />
        <meta property="og:type" content="website" />
        <title>Ajitesh Panda - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.md" pt={20}>
        {/* <LazyVoxelDog /> */}

        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main
