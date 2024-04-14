import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/layouts/article'
import { Container, Heading, Spinner } from '@chakra-ui/react'
import Section from 'components/section'

const Resume = () => {
  const router = useRouter()

  useEffect(() => {
    window.location.href =
      'https://drive.google.com/file/d/15dV_HWITZYi72DY9X73BvIzFpSmTwhQH/view?usp=sharing'
  }, [])

  return (
    <Layout>
      <Container>
        <Section>
          <Spinner
            size="xl"
            left="50%"
            top="50%"
            ml="calc(0px - var(--spinner-size) / 2)"
            mt="calc(0px - var(--spinner-size))"
            marginTop="8em"
            display="flex"
            marginRight="auto"
            marginLeft="auto"
            marginBottom="2em"
          />
          <Heading
            as="h1"
            variant="section-title"
            display="flex"
            justifyContent="center"
            marginBottom="10em"
          >
            Redirecting to resume...
          </Heading>
        </Section>
      </Container>
    </Layout>
  )
}

export default Resume
