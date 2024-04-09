import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

export const BioSection = ({
  date,
  children
}: {
  date: string
  children: ReactNode
}): ReactNode => {
  return (
    <Box display="flex" flexDirection="row" gap="20px">
      <Box fontWeight="bold" minWidth="100px">
        {date}
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}
