import React from "react";
import { Block, BlockContent, Box, Flex, FlexItem, Text } from "@qiwi/pijma-desktop";
import { activeSession } from '../api/api';

export const GainAccess: React.FC = () => {
  const [sessions, setSessions] = React.useState([]);

  React.useEffect(() => {
    activeSession().then((res) => {
      const sessions = res.access.map((session: any) => {
        return {
          ip: session.ip,
          host: session.host,
          password: session.password
        };
      });
      setSessions(sessions);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <Flex direction='row' align='start' justify='start'>
      {sessions.map((session : any, index) => (
        <FlexItem key={index} align='start' width={'600px'}>
          <Flex direction="column" p={5}>
            <Block>
              <BlockContent>
                <Box>
                  <Text size="l" display="block" bold>
                    IP: {session.ip}
                  </Text>
                  <Text size="l" display="block" bold>
                    Login: {session.host}
                  </Text>
                  <Text size="l" display="block" bold>
                    Password: {session.password}
                  </Text>
                </Box>
              </BlockContent>
            </Block>
          </Flex>
        </FlexItem>
      ))}
    </Flex>
  );
};
