import React, {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Text} from 'react-native';
import {graphql, useLazyLoadQuery} from 'react-relay';

import PostList from '../../components/PostList';

const Home = () => {
  const query = useLazyLoadQuery(
    graphql`
      query HomeQuery {
        ...PostList_query
      }
    `,
    {},
  );

  return (
    <ErrorBoundary fallbackRender={({error}) => <Text>{error.message}</Text>}>
      <Suspense fallback={<Text>Loading</Text>}>
        <PostList query={query} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Home;
